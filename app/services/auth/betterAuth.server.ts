import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { serverConfig } from "~/config/config.server";
import { logger } from "~/utils/logger.server";
import { brakTokenExchangePlugin } from "./brakTokenExchangePlugin.server";
import { customAuthPlugin } from "./customAuthPlugin.server";
import { brakIdpOAuthConfig, komplaIdpOAuthConfig } from "./oAuth.server";

const pinoLevelByBetterAuthLevel = {
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
} as const;

/**
 * Forwards a Better Auth internal log entry into the app's shared logger, so
 * it shares the same structured format/redaction as the rest of the app.
 */
export function logBetterAuthMessage(
  level: keyof typeof pinoLevelByBetterAuthLevel,
  message: string,
  ...args: unknown[]
) {
  logger[pinoLevelByBetterAuthLevel[level]]({ args }, message);
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

  // `level: "debug"` makes Better Auth forward every entry to `log` below;
  // the shared logger's own level (LOG_LEVEL) does the actual filtering, so
  // there's a single source of truth for what's shown.
  logger: {
    level: "debug",
    log: logBetterAuthMessage,
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
    brakTokenExchangePlugin(),
    customAuthPlugin(),
  ],
});
