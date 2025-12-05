import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "~/config/config";
import { serverConfig } from "~/config/config.server";
import { AuthenticationContext, refreshAccessToken } from "./oAuth.server";

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

interface CreateUserSessionProps extends AuthenticationContext {
  request: Request;
}

// Once a user has authenticated with the OAuth2 strategy, we create a session for the user.
export const createUserSession = async ({
  accessToken,
  expiresAt,
  refreshToken,
  request,
}: CreateUserSessionProps) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  console.log(
    "createUserSession \naccessToken is",
    accessToken,
    "\n---",
    "\nrefreshToken is",
    refreshToken,
  );

  return await commitSession(session);
};

interface UpdateUserSessionProps extends AuthenticationContext {
  request: Request;
}

// Update user session with new tokens.
export const updateUserSession = async ({
  accessToken,
  expiresAt,
  refreshToken,
  request,
}: UpdateUserSessionProps) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  console.log("updateUserSession: accessToken is", accessToken);

  await commitSession(session);
};

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<AuthenticationContext> => {
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
    if (refreshToken) {
      return await refreshAccessToken(request, refreshToken);
    }

    await destroySession(session);
  }

  return {
    accessToken,
    expiresAt,
    refreshToken,
  };
};

export const requireUserSession = async (request: Request) => {
  const userSession = await getUserSession(request);
  const userIsLoggedIn = Boolean(userSession.accessToken);

  console.log("requireUserSession userSession", userSession);

  if (!userIsLoggedIn) {
    console.log(
      `No active User session found on "${request.url}" request. Redirecting to login.`,
    );
    throw redirect("/login");
  }

  return userSession;
};
