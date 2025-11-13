import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "~/config/config";
import { serverConfig } from "~/config/config.server";
import { AuthenticationContext } from "./oAuth.server";

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
  request: Request,
) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.set("accessToken", accessToken);
  session.set("expiresAt", expiresAt);

  try {
    console.log("Creating user session");
    return await commitSession(session);
  } catch (error) {
    console.error("Error creating user session:", error);
    throw new Error("Failed to create user session");
  }
};

interface UpdateUserSessionWithApiTokensResponse {
  apiAccessToken: string;
  apiAccessExpiresAt: number;
  apiRefreshToken: string;
  apiRefreshExpiresAt: number;
  request: Request;
}

// Update user session with API access tokens.
export const updateUserSessionWithApiTokens = async ({
  apiAccessToken,
  apiAccessExpiresAt,
  apiRefreshToken,
  apiRefreshExpiresAt,
  request,
}: UpdateUserSessionWithApiTokensResponse): Promise<string | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("apiAccessToken", apiAccessToken);
  session.set("apiAccessExpiresAt", apiAccessExpiresAt);
  session.set("apiRefreshToken", apiRefreshToken);
  session.set("apiRefreshExpiresAt", apiRefreshExpiresAt);

  try {
    console.log("Update user session with API tokens");
    return await commitSession(session);
  } catch (error) {
    console.error("Error updating user session with API tokens:", error);
    throw new Error("Failed to update the user session");
  }
};

type GetUserSessionResponse = AuthenticationContext &
  Omit<UpdateUserSessionWithApiTokensResponse, "request">;

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<GetUserSessionResponse | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");
  const apiAccessToken = session.get("apiAccessToken");
  const apiAccessExpiresAt = session.get("apiAccessExpiresAt");
  const apiRefreshToken = session.get("apiRefreshToken");
  const apiRefreshExpiresAt = session.get("apiRefreshExpiresAt");

  console.log("getUserSession apiAccessToken is", apiAccessToken);

  if (!accessToken || !expiresAt || expiresAt < Date.now()) {
    await destroySession(session);
    return null;
  }

  return {
    accessToken,
    expiresAt,
    apiAccessToken,
    apiAccessExpiresAt,
    apiRefreshToken,
    apiRefreshExpiresAt,
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
