import { betterAuth } from "better-auth";
import type { GenericOAuthConfig } from "better-auth/plugins/generic-oauth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { serverConfig } from "~/config/config.server";
import { AuthenticationProvider } from "./auth.types";
import { customAuthPlugin } from "./customAuthPlugin.server";

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
 * Server-only by design: no `createAuthClient` is used anywhere in this app.
 * BRAK/KomPla's registered redirect_uris are pinned to the proxy callback
 * routes rather than Better Auth's own callback path, and SSR loaders/actions
 * already read sessions server-side via `getAuthData`/`authMiddleware`.
 */
export const auth = betterAuth({
  secret: serverConfig().BETTER_AUTH_SECRET,
  baseURL: serverConfig().BETTER_AUTH_URL,
  basePath: "/api/auth",

  // signInCustom (customAuthPlugin.server.ts) trusts caller-supplied tokens
  // with no verification, so it must stay unreachable as a public HTTP
  // endpoint; auth.api.signInCustom (server-side) bypasses disabledPaths.
  disabledPaths: ["/sign-in/custom"],

  account: {
    // Without this, Better Auth mirrors the full OAuth account record (real
    // access/refresh/ID tokens) into a ~14KB cookie this app never reads —
    // tokens are re-derived server-side on every request instead (see ADR 0008).
    storeAccountCookie: false,
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwe",
      // Keeps the session cache cookie self-renewing without a database;
      // remove if a real database is ever added (Better Auth disables this
      // automatically in that case).
      refreshCache: true,
    },
  },

  user: {
    additionalFields: {
      // Must stay `input: true` (the default) so mapProfileToUser/createUser
      // can set it.
      authProvider: {
        type: "string",
        required: true,
      },
      // BRAK/KomPla's only stable identifier; used as `safe_id` when
      // creating a Verfahren via the KomPla API.
      safeId: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [
    genericOAuth({
      config: [
        // beA Login (BRAK IdP)
        // (After login, the BRAK IdP token is exchanged for a KomPla IdP one.)
        {
          providerId: AuthenticationProvider.BEA,
          clientId: serverConfig().BRAK_IDP_OIDC_CLIENT_ID,
          clientSecret: serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET,
          discoveryUrl: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/.well-known/openid-configuration`,
          // Matches the redirect_uri registered with BRAK's IdP client;
          // auth.callback.tsx proxies to Better Auth's own callback handler.
          redirectURI: serverConfig().BRAK_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: makeGetUserInfo(AuthenticationProvider.BEA),
          mapProfileToUser: makeMapProfileToUser(AuthenticationProvider.BEA),
        },

        // Direct KomPla IdP Login
        {
          providerId: AuthenticationProvider.KOMPLA_IDP,
          clientId: serverConfig().KOMPLA_IDP_OIDC_CLIENT_ID,
          clientSecret: serverConfig().KOMPLA_IDP_OIDC_CLIENT_SECRET,
          discoveryUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/.well-known/openid-configuration`,
          // authorizationUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
          // tokenUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
          // Matches the redirect_uri registered with KomPla IdP's client;
          // auth.kompla-idp-callback.tsx proxies to Better Auth's own callback handler.
          redirectURI: serverConfig().KOMPLA_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: makeGetUserInfo(AuthenticationProvider.KOMPLA_IDP),
          mapProfileToUser: makeMapProfileToUser(
            AuthenticationProvider.KOMPLA_IDP,
          ),
        },
      ],
    }),

    // Developer login (hardcoded dummy credentials)
    customAuthPlugin(),
  ],
});
