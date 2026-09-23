import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { serverConfig } from "~/config/config.server";
import { customAuthPlugin } from "./customAuthPlugin.server";
import { brakIdpOAuthConfig, komplaIdpOAuthConfig } from "./oAuth.server";

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
    genericOAuth({ config: [brakIdpOAuthConfig(), komplaIdpOAuthConfig()] }),
    customAuthPlugin(),
  ],
});
