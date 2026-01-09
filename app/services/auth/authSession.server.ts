import { createCookieSessionStorage, useNavigate } from "react-router";
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
 * We retrieve the authentication data from the request headers and
 * ensure that the access token is not expired.
 */
export const getAuthData = async (
  request: Request,
): Promise<AuthenticationResponse> => {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");
  const refreshToken = session.get("refreshToken");

  console.log("getAuthData for request.url:", request.url);

  if (!accessToken || expiresAt < Date.now()) {
    const navigate = useNavigate();
    // If a token refresh is not successful, we log the person out of
    // the app. Example use case: a token expired after a user has been
    // locked his screen for longer then 2 hours. Session will be
    // destroyed within "action.logout-user.ts".
    if (refreshToken) {
      try {
        console.log("try to refresh the access token");
        const response = await refreshAccessToken(request, refreshToken);
        return response;
      } catch (error) {
        console.error("access token refresh did not work", error);
      }
    }

    console.log("user will be logged out");
    navigate(`/login?status=${LogoutType.Automatic}`);
  }

  return {
    authenticationTokens: {
      accessToken,
      expiresAt,
      refreshToken,
    },
    sessionCookieHeader: "",
  };
};
