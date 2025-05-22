import { parse } from "cookie";
import { createCookieSessionStorage, redirect } from "react-router";
import { serverConfig } from "~/config/config.server";
import type { AuthenticationContext } from "./oAuth.server";
import { ServicesContext } from "./servicesContext.server";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET],
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

  return commitSession(session);
};

// We retrieve the user session from the request headers and ensure that the session has not expired.
export const getUserSession = async (
  request: Request,
): Promise<AuthenticationContext | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");

  if (!accessToken || !expiresAt || expiresAt < Date.now()) {
    destroySession(session);
    return null;
  }

  return {
    accessToken,
    expiresAt,
    demoMode: false,
  };
};

export const requireUserSession = async (request: Request) => {
  const demoMode =
    parse(request.headers.get("cookie") || "").demoMode === "true";
  const isDemoModeAllowed = ServicesContext.isDemoModeAllowed();
  if (demoMode && isDemoModeAllowed) {
    const mockAuthenticationContext: AuthenticationContext = {
      accessToken: "mockAccessToken",
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
      demoMode: true,
    };
    return mockAuthenticationContext;
  }

  const userSession = await getUserSession(request);

  if (!userSession) {
    console.log(
      `User session not found on ${request.url}. Redirecting to login.`,
    );
    throw redirect("/login");
  }

  return userSession;
};
