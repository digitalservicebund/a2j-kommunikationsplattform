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
    console.log("authMiddleware: No auth data found, redirecting to login");
    throw redirect(href("/login"));
  }

  context.set(authContext, authData);

  const response = await next();

  if (authData.sessionCookieHeader) {
    console.log(
      "authMiddleware: sessionCookieHeader found, appending to response headers",
    );
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
    newResponse.headers.append("Set-Cookie", authData.sessionCookieHeader);
    return newResponse;
  }

  return response;
}
