import { authorizationCodeRequest } from "better-auth";
import type { OAuth2Tokens } from "better-auth/oauth2";
import type { GenericOAuthConfig } from "better-auth/plugins/generic-oauth";
import { memoize } from "es-toolkit/compat";
import { Agent, fetch } from "undici";
import { serverConfig } from "~/config/config.server";
import { logApiErrorAndThrow } from "~/utils/logApiError";
import { AuthenticationProvider } from "./auth.types";

type IdTokenClaims = {
  sub: string;
  "safe-id"?: string;
  name?: string;
  email?: string;
  email_verified?: boolean;
};

function decodeIdTokenClaims(idToken: string): IdTokenClaims {
  const base64Url = idToken.split(".")[1];
  const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");
  return JSON.parse(atob(base64)) as IdTokenClaims;
}

/**
 * Creates an OAuth `getUserInfo` implementation which retrieves all user
 * information from the ID token, synthesizing missing data required by
 * Better Auth if needed.
 */
export function makeGetUserInfo<P extends AuthenticationProvider>(
  provider: P,
): NonNullable<GenericOAuthConfig<P>["getUserInfo"]> {
  return async (tokens) => {
    if (!tokens.idToken) {
      return null;
    }

    let claims: IdTokenClaims;
    try {
      claims = decodeIdTokenClaims(tokens.idToken);
    } catch (error) {
      console.error("Failed to decode ID token", error);
      return null;
    }

    console.log(
      `Received ID token claims from "${provider}": ${JSON.stringify(claims)}`,
    );

    // BRAK/KomPla don't return a real email, so derive one from the "safe-id"
    // or "sub" claim — Better Auth requires a non-empty email per user.
    const safeIdOrSub = claims["safe-id"] ?? claims.sub ?? "UNKNOWN";
    const email =
      claims.email ??
      `${provider}-${safeIdOrSub}@no-email.kompla-justiz.internal`;

    return {
      ...claims,
      name: claims.name ?? safeIdOrSub,
      email,
      emailVerified: claims.email_verified ?? false,
    };
  };
}

/**
 * Creates an OAuth `mapProfileToUser` implementation which derives extra
 * user fields  from the user info (ID token claims) returned by `getUserInfo`.
 */
export function makeMapProfileToUser<P extends AuthenticationProvider>(
  provider: P,
): NonNullable<GenericOAuthConfig<P>["mapProfileToUser"]> {
  return (profile) => ({
    authProvider: provider,
    safeId: profile["safe-id"],
  });
}

/**
 * Exchanges a BRAK IdP access token for KomPla IdP tokens using OAuth 2.0
 * Token Exchange (RFC 8693).
 *
 * Returns the tokens in the shape Better Auth stores on the account. The
 * exchange response carries no ID token, so the one from the original login
 * is passed through (needed for user info and logout).
 *
 * @see: https://www.rfc-editor.org/rfc/rfc8693.html
 */
export async function exchangeForKomPlaIdpTokens(
  brakAccessToken: string,
  brakIdToken: string | undefined,
): Promise<OAuth2Tokens> {
  const config = serverConfig();

  const params = new URLSearchParams();
  params.append(
    "grant_type",
    "urn:ietf:params:oauth:grant-type:token-exchange",
  );
  params.append(
    "requested_token_type",
    "urn:ietf:params:oauth:token-type:refresh_token",
  );
  params.append("client_id", config.KOMPLA_IDP_OIDC_CLIENT_ID);
  params.append("subject_issuer", config.KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER);
  params.append("scope", "kompla-api");
  params.append("subject_token", brakAccessToken);

  // The global fetch, not Undici's: no mTLS is needed here, and
  // `logApiErrorAndThrow` expects a standard `Response`.
  const response = await globalThis.fetch(
    config.KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  if (!response.ok) {
    await logApiErrorAndThrow(response, "Token exchange failed");
  }

  const result = (await response.json()) as {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
    issued_token_type: string;
  };

  const now = Date.now();
  return {
    tokenType: result.token_type,
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    accessTokenExpiresAt: new Date(now + result.expires_in * 1000),
    refreshTokenExpiresAt: new Date(now + result.refresh_expires_in * 1000),
    scopes: result.scope.split(" "),
    idToken: brakIdToken,
    raw: { ...result },
  };
}

/**
 * Creates an OAuth `getToken` implementation specialized for the BRAK
 * Identity Provider (beA), whose token endpoint requires a mutual TLS (mTLS)
 * connection with an approved client certificate.
 *
 * The BRAK access token is immediately exchanged for KomPla IdP tokens
 * (RFC 8693), which are what Better Auth stores on the account: the KomPla
 * API only accepts KomPla IdP tokens, and refreshing is routed to the KomPla
 * IdP as well (see brakTokenExchangePlugin.server.ts). The BRAK ID token is
 * kept for user info and logout.
 */
export function makeGetTokenFromBrakIdp(options: {
  clientId: string;
  clientSecret: string;
  scopes: string[];
  redirectURI: string;
}): NonNullable<GenericOAuthConfig<AuthenticationProvider.BEA>["getToken"]> {
  const config = serverConfig();
  const discoveryUrl = `${config.BRAK_IDP_OIDC_ISSUER}/.well-known/openid-configuration`;

  /**
   * Returns an Undici `Agent` configured with the client certificate so that
   * we can pass it to `fetch`.
   */
  const getAgentWithClientCertificate = memoize(
    () =>
      new Agent({
        connect: {
          cert: config.BRAK_IDP_OIDC_CLIENT_CERTIFICATE,
          key: config.BRAK_IDP_OIDC_CLIENT_CERTIFICATE_KEY,
        },
      }),
  );

  /**
   * Resolves the token endpoint URL using the provider's discovery endpoint.
   *
   * NOTE: Better Auth does this as well, but does not expose the discovered
   * token URL to the `getToken` function, so we need to do it ourselves
   * separately. See: https://github.com/better-auth/better-auth/issues/11362
   */
  const discoverTokenUrl = memoize(async () => {
    try {
      const response = await fetch(discoveryUrl);
      if (!response.ok) {
        throw new Error(
          `Discovery request failed with status ${response.status}`,
        );
      }

      const doc = (await response.json()) as { token_endpoint?: string };
      if (!doc.token_endpoint) {
        throw new Error("Discovery document has no 'token_endpoint'");
      }

      return doc.token_endpoint;
    } catch (error) {
      throw new Error("Failed to resolve BRAK IdP token endpoint", {
        cause: error,
      });
    }
  });

  return async function getToken({ code, codeVerifier, deviceId }) {
    const params = await authorizationCodeRequest({
      code,
      codeVerifier,
      deviceId,
      redirectURI: options.redirectURI,
      options: {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        scope: options.scopes,
      },
    });

    let tokenUrl: string;
    try {
      tokenUrl = await discoverTokenUrl();
    } catch (error) {
      // Remove the rejected Promise from the memoization cache so that
      // the token URL discovery is re-run the next time.
      discoverTokenUrl.cache.clear?.();
      throw error;
    }

    const response = await fetch(tokenUrl, {
      ...params,
      method: "POST",
      dispatcher: getAgentWithClientCertificate(),
    });

    if (!response.ok) {
      let responseBody: string;
      try {
        responseBody = await response.text();
      } catch {
        responseBody = "[Unable to read response body]";
      }
      throw new Error(
        `Token request failed with status ${response.status}: ${responseBody}`,
      );
    }

    const data = (await response.json()) as {
      access_token: string;
      id_token: string;
    };

    console.log("Received beA access token:", data.access_token);

    return exchangeForKomPlaIdpTokens(data.access_token, data.id_token);
  };
}

/**
 * OAuth configuration for the BRAK Identiy Provier (beA Login).
 */
export function brakIdpOAuthConfig(): GenericOAuthConfig<AuthenticationProvider.BEA> {
  const config = serverConfig();
  const clientId = config.BRAK_IDP_OIDC_CLIENT_ID;
  const clientSecret = config.BRAK_IDP_OIDC_CLIENT_SECRET;
  const discoveryUrl = `${config.BRAK_IDP_OIDC_ISSUER}/.well-known/openid-configuration`;
  const redirectURI = config.BRAK_IDP_OIDC_REDIRECT_URI;
  const scopes = ["openid"];

  return {
    providerId: AuthenticationProvider.BEA,
    clientId,
    clientSecret,
    discoveryUrl,
    // Matches the redirect_uri registered with BRAK's IdP client;
    // auth.callback.tsx proxies to Better Auth's own callback handler.
    redirectURI: config.BRAK_IDP_OIDC_REDIRECT_URI,
    scopes,
    pkce: true,
    getUserInfo: makeGetUserInfo(AuthenticationProvider.BEA),
    mapProfileToUser: makeMapProfileToUser(AuthenticationProvider.BEA),
    getToken: makeGetTokenFromBrakIdp({
      clientId,
      clientSecret,
      scopes,
      redirectURI,
    }),
  };
}

export function komplaIdpOAuthConfig(): GenericOAuthConfig<AuthenticationProvider.KOMPLA_IDP> {
  return {
    providerId: AuthenticationProvider.KOMPLA_IDP,
    clientId: serverConfig().KOMPLA_IDP_OIDC_CLIENT_ID,
    clientSecret: serverConfig().KOMPLA_IDP_OIDC_CLIENT_SECRET,
    discoveryUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/.well-known/openid-configuration`,
    // Matches the redirect_uri registered with KomPla IdP's client;
    // auth.kompla-idp-callback.tsx proxies to Better Auth's own callback handler.
    redirectURI: serverConfig().KOMPLA_IDP_OIDC_REDIRECT_URI,
    scopes: ["openid"],
    pkce: true,
    getUserInfo: makeGetUserInfo(AuthenticationProvider.KOMPLA_IDP),
    mapProfileToUser: makeMapProfileToUser(AuthenticationProvider.KOMPLA_IDP),
  };
}
