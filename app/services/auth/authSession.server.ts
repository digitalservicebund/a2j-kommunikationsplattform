import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "~/config/config";
import { serverConfig } from "~/config/config.server";
import { LogoutType } from "~/routes/action.logout-user";
import {
  AuthenticationResponse,
  AuthenticationTokens,
  refreshAccessToken,
} from "./oAuth.server";

const getSecret = () => {
  return config().ENVIRONMENT === "development"
    ? "default-secret"
    : serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [getSecret()],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { commitSession, destroySession, getSession };

interface SetAuthSessionProps extends AuthenticationTokens {
  request: Request;
}

/**
 * As soon as a user is authenticated (via OAuth2 framework), we
 * create/update access related data in session cookie.
 */
export const setAuthSession = async ({
  accessToken,
  expiresAt,
  refreshToken,
  request,
}: SetAuthSessionProps) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  console.log("setAuthSession for request.url:", request.url);

  try {
    console.log("Set/update session");
    return await commitSession(session);
  } catch (error) {
    console.error("Error while setting/updating session:", error);
    throw new Error("Failed to set/update session");
  }
};

/**
 * Retrieves authentication data from the session cookie.
 * Returns null if no valid session exists, allowing middleware to handle redirects.
 */
export const getAuthData = async (
  request: Request,
): Promise<AuthenticationResponse | null> => {
  // If a token refresh is not successful, we log the person out of
  // the app. Example use case: A token expires after a user has
  // locked their screen for more than two hours. Session will be
  // destroyed similar to "action.logout-user.ts".
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");
  const refreshToken = session.get("refreshToken");

  // No tokens at all - not authenticated
  if (!accessToken && !refreshToken) {
    await destroySession(session);
    return null;
  }

  // Token still valid
  if (accessToken && expiresAt > Date.now()) {
    return {
      authenticationTokens: { accessToken, expiresAt, refreshToken },
      sessionCookieHeader: "",
    };
  }

  // Token expired but no refresh token available
  if (!refreshToken) {
    console.log("No refresh token available, destroying session");
    await destroySession(session);
    return null;
  }

  // Try to refresh the token (production only)
  try {
    return await refreshAccessToken(request, refreshToken);
  } catch (error) {
    console.error("Token refresh failed, destroying session", error);
    throw redirect(`/login?status=${LogoutType.Automatic}`, {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }
};
