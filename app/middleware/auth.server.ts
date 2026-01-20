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

  const response = await next();

  if (authData.sessionCookieHeader) {
    // Cloning response so that it can be read multiple times
    const clonedResponse = response.clone();
    const newHeaders = new Headers(clonedResponse.headers);
    newHeaders.append("Set-Cookie", authData.sessionCookieHeader);
    return new Response(clonedResponse.body, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: newHeaders,
    });
  }

  return response;
}
