import { createContext, href, redirect } from "react-router";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { getAuthData } from "~/services/auth/authSession.server";
import { logger } from "~/utils/logger.server";

export const authContext = createContext<AuthenticationResponse | null>();

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
  const authData = await getAuthData(request);

  if (!authData) {
    localLogger.info("No auth data found, redirecting to login");
    throw redirect(href("/login"));
  }

  context.set(authContext, authData);

  const response = await next();

  if (authData.sessionCookieHeader.length > 0) {
    localLogger.debug(
      "Session cookie found in auth data, appending to response headers",
    );
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
    for (const cookieHeader of authData.sessionCookieHeader) {
      newResponse.headers.append("Set-Cookie", cookieHeader);
    }
    return newResponse;
  }

  return response;
}
