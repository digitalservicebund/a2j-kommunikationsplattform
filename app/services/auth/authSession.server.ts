import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";
import { auth } from "./betterAuth.server";
import { magicLinkClient } from "./magicLinkClient.server";

const OAUTH2_PROVIDERS = new Set<AuthenticationProvider>([
  AuthenticationProvider.BEA,
  AuthenticationProvider.KOMPLA_IDP,
]);

async function getOAuth2Tokens(
  request: Request,
  provider: AuthenticationProvider,
) {
  const { response, headers } = await auth.api.getAccessToken({
    body: { providerId: provider },
    headers: request.headers,
    returnHeaders: true,
  });

  return {
    accessToken: response.accessToken,
    idToken: response.idToken,
    expiresAt: response.accessTokenExpiresAt
      ? new Date(response.accessTokenExpiresAt).getTime()
      : Date.now(),
    // refreshToken isn't returned by /get-access-token — Better Auth
    // refreshes it internally and getBearerToken never needs the raw value.
    refreshToken: "",
    setCookieHeaders: headers.getSetCookie(),
  };
}

async function getCustomProviderTokens(
  userId: string,
  provider: AuthenticationProvider,
) {
  const ctx = await auth.$context;
  const account = await ctx.internalAdapter.findAccountByProviderId(
    userId,
    provider,
  );

  if (!account?.accessToken || !account.refreshToken) {
    return null;
  }

  const expiresAt = account.accessTokenExpiresAt?.getTime() ?? 0;
  const isExpired = expiresAt <= Date.now();

  if (!isExpired || provider === AuthenticationProvider.DEVELOPMENT) {
    return {
      accessToken: account.accessToken,
      idToken: account.idToken ?? undefined,
      expiresAt,
      refreshToken: account.refreshToken,
    };
  }

  console.log("getAuthData: Demo token expired, refreshing");
  const refreshed = await magicLinkClient.refreshAccessToken(
    account.refreshToken,
  );
  await ctx.internalAdapter.updateAccount(account.id, {
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken,
    accessTokenExpiresAt: new Date(refreshed.expiresAt),
  });

  return {
    accessToken: refreshed.accessToken,
    idToken: undefined,
    expiresAt: refreshed.expiresAt,
    refreshToken: refreshed.refreshToken,
  };
}

/**
 * Retrieves authentication data for the current request from the Better
 * Auth session, resolving/refreshing the underlying provider access token.
 * Returns null if no valid session exists, allowing middleware to redirect.
 */
export const getAuthData = async (
  request: Request,
): Promise<AuthenticationResponse | null> => {
  const { response: sessionData, headers: sessionHeaders } =
    await auth.api.getSession({
      headers: request.headers,
      returnHeaders: true,
    });

  if (!sessionData) {
    return null;
  }

  const { user } = sessionData;
  const provider = user.authProvider as AuthenticationProvider;
  const setCookieHeaders = sessionHeaders.getSetCookie();

  if (OAUTH2_PROVIDERS.has(provider)) {
    const tokens = await getOAuth2Tokens(request, provider);
    return {
      authenticationTokens: {
        accessToken: tokens.accessToken,
        idToken:
          provider === AuthenticationProvider.BEA
            ? ((user as { safeId?: string }).safeId ?? tokens.idToken)
            : tokens.idToken,
        expiresAt: tokens.expiresAt,
        refreshToken: tokens.refreshToken,
      },
      sessionCookieHeader: [...setCookieHeaders, ...tokens.setCookieHeaders],
      provider,
    };
  }

  const tokens = await getCustomProviderTokens(user.id, provider);

  if (!tokens) {
    return null;
  }

  return {
    authenticationTokens: tokens,
    sessionCookieHeader: setCookieHeaders,
    provider,
  };
};
