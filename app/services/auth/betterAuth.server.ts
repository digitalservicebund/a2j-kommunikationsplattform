import type { OAuth2Tokens, OAuth2UserInfo } from "better-auth";
import { betterAuth } from "better-auth";
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
 * BRAK IdP and KomPla IdP don't return a real email address — the only
 * stable identifier is the "safe-id"/"sub" claim in the ID token. Better
 * Auth requires a non-empty email per user, so we derive a synthetic,
 * provider-scoped one from that claim.
 */
export function getUserInfoFromIdToken(
  provider: AuthenticationProvider,
  fallbackId: string,
) {
  return async (tokens: OAuth2Tokens): Promise<OAuth2UserInfo> => {
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

export const auth = betterAuth({
  secret: serverConfig().BETTER_AUTH_SECRET,
  baseURL: serverConfig().BETTER_AUTH_URL,
  basePath: "/api/auth",
  // `signInCustom` (customAuthPlugin.server.ts) mints a session from
  // caller-supplied tokens with no way to verify they're genuine — it must
  // only ever be reached via the server-side `auth.api.signInCustom(...)`
  // call (from loginAsDeveloper / auth.magic-link-callback), never as a
  // public HTTP endpoint. `disabledPaths` blocks it at the router level
  // (404) without affecting `auth.api.*` calls, which bypass the router.
  disabledPaths: ["/sign-in/custom"],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwe",
      refreshCache: true,
    },
  },
  user: {
    additionalFields: {
      // input must stay true (the default) — mapProfileToUser/createUser
      // both feed this field through the create-record "input" pipeline;
      // input: false blocks it from being set there at all.
      authProvider: {
        type: "string",
        required: true,
      },
      // BRAK IdP's "safe-id" claim — the only stable identifier it returns.
      // Used as the `safe_id` field when creating a Verfahren via the KomPla API.
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
          // Keeps the redirect_uri registered with the real BRAK IdP client
          // unchanged — app/routes/auth.callback.tsx forwards the resulting
          // request to Better Auth's own callback handler.
          redirectURI: serverConfig().BRAK_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: getUserInfoFromIdToken(
            AuthenticationProvider.BEA,
            "bea-user",
          ),
          // additionalFields (authProvider, safeId) aren't reflected in
          // generic-oauth's mapProfileToUser return type, though Better Auth
          // persists them at runtime via the user's additionalFields schema.
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
          // Keeps the redirect_uri registered with the real KomPla IdP client
          // unchanged — app/routes/auth.kompla-idp-callback.tsx forwards the
          // resulting request to Better Auth's own callback handler.
          redirectURI: serverConfig().KOMPLA_IDP_OIDC_REDIRECT_URI,
          scopes: ["openid"],
          pkce: true,
          getUserInfo: getUserInfoFromIdToken(
            AuthenticationProvider.KOMPLA_IDP,
            "kompla-idp-user",
          ),
          // See the BEA config's mapProfileToUser comment above.
          mapProfileToUser: () =>
            ({
              authProvider: AuthenticationProvider.KOMPLA_IDP,
            }) as never,
        },
      ],
    }),
    customAuthPlugin(),
  ],
});
