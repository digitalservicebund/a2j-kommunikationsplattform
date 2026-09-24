import type { BetterAuthPlugin } from "better-auth";
import { AuthenticationProvider } from "./auth.types";

/**
 * Routes token refreshes of BRAK IdP (beA) accounts to the KomPla IdP.
 *
 * The tokens stored for a beA account are KomPla IdP tokens obtained via
 * token exchange at login (see `makeGetTokenFromBrakIdp`), so they must be
 * refreshed against the KomPla IdP with its client credentials. The
 * generic-oauth plugin offers no hook to customize refreshing, so the beA
 * provider's `refreshAccessToken` is replaced with the KomPla IdP one.
 *
 * Must be registered after `genericOAuth`, whose `init` registers the
 * providers this plugin looks up.
 */
export function brakTokenExchangePlugin() {
  return {
    id: "brak-token-exchange",
    init: (ctx) => {
      const komplaIdp = ctx.socialProviders.find(
        (provider) => provider.id === AuthenticationProvider.KOMPLA_IDP,
      );

      if (!komplaIdp?.refreshAccessToken) {
        throw new Error(
          `brakTokenExchangePlugin requires the "${AuthenticationProvider.KOMPLA_IDP}" provider to be registered first`,
        );
      }

      return {
        context: {
          socialProviders: ctx.socialProviders.map((provider) =>
            provider.id === AuthenticationProvider.BEA
              ? {
                  ...provider,
                  refreshAccessToken: komplaIdp.refreshAccessToken,
                }
              : provider,
          ),
        },
      };
    },
  } satisfies BetterAuthPlugin;
}
