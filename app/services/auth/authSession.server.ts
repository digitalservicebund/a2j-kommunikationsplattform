import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";
import { auth } from "./betterAuth.server";
import { magicLinkClient } from "./magicLinkClient.server";

const OAUTH2_PROVIDERS = new Set<AuthenticationProvider>([
  AuthenticationProvider.BEA,
  AuthenticationProvider.KOMPLA_IDP,
]);

async function getOAuth2Tokens(
  request: Request,
  userId: string,
  provider: AuthenticationProvider,
) {
  const accounts = await auth.api.listUserAccounts({
    headers: request.headers,
  });
  const account = accounts.find((a) => a.providerId === provider);

  if (!account) {
    return null;
  }

  const { response, headers } = await auth.api.getAccessToken({
    // `accountId` here is the account row's primary key (`account.id`), not
    // the provider-side `account.accountId` — better-auth's
    // resolveUserAccount matches on `candidate.id === selection.accountId`.
    body: { accountId: account.id, userId },
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
  const accounts = await ctx.internalAdapter.findAccountByUserId(userId);
  const account = accounts.find((a) => a.providerId === provider);

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
    const tokens = await getOAuth2Tokens(request, user.id, provider);

    if (!tokens) {
      return null;
    }

    return {
      authenticationTokens: {
        accessToken: tokens.accessToken,
        // Both BEA and KOMPLA_IDP return a "safe-id" claim, persisted on the
        // user record at account creation (see betterAuth.server.ts's
        // mapProfileToUser) — the KomPla API requires it as `safe_id` when
        // creating a Verfahren.
        idToken: (user as { safeId?: string }).safeId ?? tokens.idToken,
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
