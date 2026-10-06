import { createContext, redirect } from "react-router";
import { AuthSession } from "~/services/auth/auth.types";
import { getAuthSession } from "~/services/auth/authSession.server";
import { logger } from "~/utils/logger.server";

export const authContext = createContext<AuthSession | null>();

type MiddlewareArgs = {
  request: Request;
  context: {
    set: <T>(ctx: ReturnType<typeof createContext<T>>, value: T) => void;
  };
};

const localLogger = logger.child({ name: "authMiddleware" });

export async function authMiddleware(
  { request, context }: MiddlewareArgs,
  next: () => Promise<Response>,
) {
  const authSession = await getAuthSession(request);

  if (!authSession) {
    localLogger.debug("No auth session found, redirecting to login");
    const { pathname, search, hash } = new URL(request.url);
    const loginParams = new URLSearchParams({ next: pathname + search + hash });
    throw redirect("/login?" + loginParams.toString());
  }

  context.set(authContext, authSession);

  const response = await next();

  if (authSession.sessionCookieHeaders.length > 0) {
    localLogger.debug(
      "Session cookie found in auth session, appending to response headers",
    );
    const newResponse = response.clone();
    for (const cookieHeader of authSession.sessionCookieHeaders) {
      newResponse.headers.append("Set-Cookie", cookieHeader);
    }
    return newResponse;
  }

  return response;
}
