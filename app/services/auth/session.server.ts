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

// Once a user has authenticated with the OAuth2 strategy, we create a session for the user.
export const createUserSession = async (
  accessToken: string,
  expiresAt: number,
  refreshToken: string,
  request: Request,
) => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log(
    "createUserSession accessToken is",
    accessToken,
    "expiresAt is",
    expiresAt,
    "refreshToken is",
    refreshToken,
  );

  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  try {
    console.log("Creating user session");
    return await commitSession(session);
  } catch (error) {
    console.error("Error creating user session:", error);
    throw new Error("Failed to create user session");
  }
};

interface UpdateUserSessionResponse {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  request: Request;
}

// Update user session with new tokens.
export const updateUserSession = async ({
  accessToken,
  expiresAt,
  refreshToken,
  request,
}: UpdateUserSessionResponse): Promise<string | null> => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log(
    "updateUserSession accessToken is",
    accessToken,
    "expiresAt is",
    expiresAt,
    "refreshToken is",
    refreshToken,
  );

  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);
  session.set("refreshToken", refreshToken);

  try {
    console.log("Updating user session");
    return await commitSession(session);
  } catch (error) {
    console.error("Error updating user session:", error);
    throw new Error("Failed to update the user session");
  }
};

type GetUserSessionResponse = AuthenticationContext &
  Omit<UpdateUserSessionResponse, "request">;

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<GetUserSessionResponse | null> => {
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
    console.log("access has expired");

    if (refreshToken) {
      console.log("try to refresh the access token");

      await refreshAccessToken(request, refreshToken);
      return null;
    }

    console.log("destroy session");
    await destroySession(session);
    return null;
  }

  return {
    accessToken,
    expiresAt,
    refreshToken,
  };
};

export const requireUserSession = async (request: Request) => {
  const userSession = await getUserSession(request);

  if (!userSession) {
    console.log(
      `User session not found on ${request.url}. Redirecting to login.`,
    );
    throw redirect("/login");
  }

  return userSession;
};
