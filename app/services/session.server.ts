import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { config } from "~/config/config.server";
import { User, UserSchema } from "./oauth.server";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [config().BRAK_IDP_OIDC_CLIENT_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

// Once a user has authenticated with the OAuth2 strategy, we create a session for the user.
export const createUserSession = async (user: User, request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.set("accessToken", user.accessToken);
  session.set("expiresAt", user.expiresAt);

  return commitSession(session);
};

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<User | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");

  if (!accessToken || !expiresAt || expiresAt < Date.now()) {
    destroySession(session);
    return null;
  }

  const user = {
    accessToken,
    expiresAt,
  };

  try {
    const parsedUser = UserSchema.parse(user);
    return parsedUser;
  } catch (error) {
    console.error("Error parsing user session", error);
    return null;
  }
};

export const requireUserSession = async (request: Request) => {
  const userSession = await getUserSession(request);

  if (!userSession) {
    throw redirect("/login");
  }

  return userSession;
};
