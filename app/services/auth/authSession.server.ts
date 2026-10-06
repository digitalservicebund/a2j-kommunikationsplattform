import { logger } from "~/utils/logger.server";
import { AuthProvider, AuthSession } from "./auth.types";
import { auth } from "./betterAuth.server";

async function getOAuth2Tokens(
  request: Request,
  userId: string,
  provider: AuthProvider,
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
      setCookieHeaders: headers.getSetCookie(),
    };
  } catch (error) {
    logger.error({ error }, "Failed to refresh access token");
    return null;
  }
}

/**
 * Retrieves the authentication session details for the user who made the
 * given request. Returns null if the user has no valid authentication session,
 * for instance because they are not logged in or the session expired.
 */
export const getAuthSession = async (
  request: Request,
): Promise<AuthSession | null> => {
  const { response: sessionResponse, headers: sessionHeaders } =
    await auth.api.getSession({
      headers: request.headers,
      returnHeaders: true,
    });

  if (!sessionResponse) {
    return null;
  }

  const { user } = sessionResponse;
  const provider = user.authProvider as AuthProvider;
  const setCookieHeaders = sessionHeaders.getSetCookie();

  const tokens = await getOAuth2Tokens(request, user.id, provider);
  if (!tokens) {
    return null;
  }

  return {
    provider,
    accessToken: tokens.accessToken,
    safeId: user?.safeId ?? null,
    // TODO: Derive `authorizedForSafeIds` from the `granted_privileges` of
    // the access token once it becomes available.
    authorizedForSafeIds: user?.safeId ? [user.safeId] : [],
    sessionCookieHeaders: [...setCookieHeaders, ...tokens.setCookieHeaders],
  };
};
