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
  const authSession = await getAuthData(request);

  if (!authSession) {
    throw redirect(href("/login"));
  }

  context.set(authContext, authSession);

  const response = await next();

  if (authSession.sessionCookieHeader) {
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
    newResponse.headers.append("Set-Cookie", authSession.sessionCookieHeader);
    return newResponse;
  }

  return response;
}
