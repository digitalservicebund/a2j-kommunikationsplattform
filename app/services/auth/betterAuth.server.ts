import type { OAuth2Tokens } from "better-auth";
import { betterAuth } from "better-auth";
import type { GenericOAuthUserInfo } from "better-auth/plugins/generic-oauth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { serverConfig } from "~/config/config.server";
import { AuthenticationProvider } from "./auth.types";
import { customAuthPlugin } from "./customAuthPlugin.server";

function decodeIdTokenClaims(idToken: string): Record<string, unknown> {
  const base64Url = idToken.split(".")[1];
  const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");
  return JSON.parse(atob(base64)) as Record<string, unknown>;
}

/**
 * BRAK/KomPla don't return a real email, so derive one from the "safe-id"/
 * "sub" claim — Better Auth requires a non-empty email per user.
 */
export function getUserInfoFromIdToken(
  provider: AuthenticationProvider,
  fallbackId: string,
) {
  return async (tokens: OAuth2Tokens): Promise<GenericOAuthUserInfo> => {
    const claims = tokens.idToken ? decodeIdTokenClaims(tokens.idToken) : {};
    const id =
      (claims["safe-id"] as string | undefined) ??
      (claims["sub"] as string | undefined) ??
      fallbackId;

    return {
      id,
      email: `${provider}-${id}@no-email.kompla-justiz.internal`,
      emailVerified: false,
      name: id,
    };
  };
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
        {
          providerId: AuthenticationProvider.BEA,
          clientId: serverConfig().BRAK_IDP_OIDC_CLIENT_ID,
          clientSecret: serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET,
          authorizationUrl: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
          tokenUrl: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
          // Matches the redirect_uri registered with BRAK's IdP client;
          // auth.callback.tsx proxies to Better Auth's own callback handler.
          redirectURI: serverConfig().BRAK_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: getUserInfoFromIdToken(
            AuthenticationProvider.BEA,
            "bea-user",
          ),
          // additionalFields aren't in generic-oauth's mapProfileToUser
          // return type but are persisted via the user's additionalFields schema.
          mapProfileToUser: (profile) =>
            ({
              authProvider: AuthenticationProvider.BEA,
              safeId: profile.id,
            }) as never,
        },
        {
          providerId: AuthenticationProvider.KOMPLA_IDP,
          clientId: serverConfig().KOMPLA_IDP_OIDC_CLIENT_ID,
          clientSecret: serverConfig().KOMPLA_IDP_OIDC_CLIENT_SECRET,
          authorizationUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
          tokenUrl: `${serverConfig().KOMPLA_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
          // Matches the redirect_uri registered with KomPla IdP's client;
          // auth.kompla-idp-callback.tsx proxies to Better Auth's own callback handler.
          redirectURI: serverConfig().KOMPLA_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: getUserInfoFromIdToken(
            AuthenticationProvider.KOMPLA_IDP,
            "kompla-idp-user",
          ),
          // Same as the BEA config above — KomPla IdP also returns "safe-id".
          mapProfileToUser: (profile) =>
            ({
              authProvider: AuthenticationProvider.KOMPLA_IDP,
              safeId: profile.id,
            }) as never,
        },
      ],
    }),
    customAuthPlugin(),
  ],
});
