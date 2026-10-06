import type { BetterAuthPlugin } from "better-auth";
import { AuthProvider } from "../auth.types";

/**
 * Fixes token refresh for non-KomPla-IDP OAuth logins, such as BRAK IdP (beA).
 *
 * When logging in with a OAuth provider other than KomPla IdP, the app
 * exchanges the access and refresh token from the original provider for
 * KomPla IdP tokens (see `exchangeForKomPlaIdpTokens` in `oAuth.server.ts`)
 * so that the KomPla API can be used. This breaks token refresh, however, as
 * Better Auth attempts to refresh the exchanged token with the original
 * login provider's token endpoint rather than the KomPla IdP one.
 *
 * As a fix, this plugin replaces the `refreshAccessToken` method of every
 * registered third-party OAuth provider with the KomPla IdP implementation,
 * thus redirecting token refreshes to the KomPla IdP token endpoint as desired.
 *
 * IMPORTANT: Must be registered after the `oAuthProvidersPlugin`, which
 * registers the providers looked up by this one.
 */
export function exchangedTokenRefreshPlugin() {
  return {
    id: "exchanged-token-refresh-plugin",
    init: (ctx) => {
      const komplaIdp = ctx.socialProviders.find(
        (provider) => provider.id === AuthProvider.KOMPLA_IDP,
      );

      if (!komplaIdp?.refreshAccessToken) {
        throw new Error(
          `exchangedTokenRefreshPlugin requires the "${AuthProvider.KOMPLA_IDP}" provider to be registered first`,
        );
      }

      return {
        context: {
          socialProviders: ctx.socialProviders.map((provider) =>
            provider.id !== AuthProvider.KOMPLA_IDP
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
