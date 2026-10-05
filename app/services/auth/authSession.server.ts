import { logger } from "~/utils/logger.server";
import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";
import { auth } from "./betterAuth.server";

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

  try {
    const { response, headers } = await auth.api.getAccessToken({
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
      setCookieHeaders: headers.getSetCookie(),
    };
  } catch (error) {
    logger.error({ error }, "Failed to refresh access token");
    return null;
  }
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

  const tokens = await getOAuth2Tokens(request, user.id, provider);
  if (!tokens) {
    return null;
  }

  return {
    authenticationTokens: {
      accessToken: tokens.accessToken,
      idToken: user?.safeId ?? tokens.idToken,
    },
    sessionCookieHeader: [...setCookieHeaders, ...tokens.setCookieHeaders],
    provider,
  };
};
