import { authorizationCodeRequest } from "better-auth";
import type { GenericOAuthConfig } from "better-auth/plugins/generic-oauth";
import { memoize } from "es-toolkit/compat";
import { Agent, fetch } from "undici";
import { serverConfig } from "~/config/config.server";
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
 * OAuth configuration for the BRAK Identiy Provier (beA Login).
 */
export function brakIdpOAuthConfig(): GenericOAuthConfig<AuthenticationProvider.BEA> {
  const config = serverConfig();
  const clientId = config.BRAK_IDP_OIDC_CLIENT_ID;
  const clientSecret = config.BRAK_IDP_OIDC_CLIENT_SECRET;
  const discoveryUrl = `${config.BRAK_IDP_OIDC_ISSUER}/.well-known/openid-configuration`;
  const scopes = ["openid"];

  // The BRAK IdP requires us to present a client certificate when calling
  // the token endpoint (mTLS). To do so, we need to create an Undici `Agent`
  // with the certificate and private key that we can pass to `fetch`.
  const getAgentWithClientCertificate = memoize(
    () =>
      new Agent({
        connect: {
          cert: config.BRAK_IDP_OIDC_CLIENT_CERTIFICATE,
          key: config.BRAK_IDP_OIDC_CLIENT_CERTIFICATE_KEY,
        },
      }),
  );

  // For our custom `getToken` implementation (see above), we
  // NOTE: This is usually done automatically by Better Auth, but we need to
  // do it ourselves separately because our custom `getToken` implementation
  // needs the discovered token endpoint URL and Better Auth does not expose
  // it: https://github.com/better-auth/better-auth/issues/11362
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

    getToken: async ({ code, redirectURI, codeVerifier, deviceId }) => {
      const params = await authorizationCodeRequest({
        code,
        redirectURI,
        codeVerifier,
        deviceId,
        options: {
          clientId,
          clientSecret,
          scope: scopes,
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
        refresh_token: string;
        id_token: string;
        scope?: string;
      };

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        scopes: data.scope?.split(" ") ?? [],
        raw: data,
      };
    },
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
