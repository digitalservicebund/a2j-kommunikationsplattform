import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "~/config/config";
import { serverConfig } from "~/config/config.server";
import {
  AuthenticationResponse,
  AuthenticationTokens,
  refreshAccessToken,
  revokeAccessToken,
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

interface SetSessionProps extends AuthenticationTokens {
  request: Request;
}

/**
 * As soon as a user is authenticated (via OAuth2 framework), we
 * create/update access related data in session cookie.
 */
export const setSession = async ({
  accessToken,
  expiresAt,
  refreshToken,
  request,
}: SetSessionProps) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  console.log(
    "setSession - accessToken is",
    accessToken,
    "refreshToken is",
    refreshToken,
  );

  try {
    console.log("Set/update session");
    return await commitSession(session);
  } catch (error) {
    console.error("Error while setting/updating session:", error);
    throw new Error("Failed to set/update session");
  }
};

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<AuthenticationResponse> => {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");
  const refreshToken = session.get("refreshToken");

  console.log(
    "getUserSession accessToken is",
    accessToken,
    "expiresAt is",
    expiresAt,
    "refreshToken is",
    refreshToken,
  );

  if (!accessToken || expiresAt < Date.now()) {
    // if we need to refresh the token, we return the needed session cookie header
    if (refreshToken) {
      const response = await refreshAccessToken(request, refreshToken);
      return response;
    }

    if (accessToken) {
      await revokeAccessToken(accessToken);
    }

    await destroySession(session);
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

export const requireUserSession = async (request: Request) => {
  const userSession = await getUserSession(request);
  const userIsLoggedIn = Boolean(userSession.authenticationTokens.accessToken);

  console.log("requireUserSession userSession", userSession);

  if (!userIsLoggedIn) {
    console.log(
      `No active User session found on "${request.url}" request. Redirecting to login.`,
    );
    throw redirect("/login");
  }

  return userSession;
};
