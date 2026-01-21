import { createContext, href, redirect } from "react-router";
import { getAuthData } from "~/services/auth/authSession.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

export const authContext = createContext<AuthenticationResponse | null>();

type MiddlewareArgs = {
  request: Request;
  context: {
    set: <T>(ctx: ReturnType<typeof createContext<T>>, value: T) => void;
  };
};

export async function authMiddleware(
  { request, context }: MiddlewareArgs,
  next: () => Promise<Response>,
) {
  const authData = await getAuthData(request);

  if (!authData) {
    throw redirect(href("/login"));
  }

  context.set(authContext, authData);

  console.log(
    "Middleware: sessionCookieHeader BEFORE next() =",
    authData.sessionCookieHeader
      ? `"${authData.sessionCookieHeader.substring(0, 50)}..."`
      : "empty",
  );

  const response = await next();

  console.log("Middleware: reached AFTER next()");

  if (authData.sessionCookieHeader) {
    // Try to modify headers directly first (works if headers are mutable)
    try {
      response.headers.append("Set-Cookie", authData.sessionCookieHeader);
      return response;
    } catch {
      // Headers are immutable, create a new Response
      const newHeaders = new Headers(response.headers);
      newHeaders.append("Set-Cookie", authData.sessionCookieHeader);
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }
  }

  return response;
}
