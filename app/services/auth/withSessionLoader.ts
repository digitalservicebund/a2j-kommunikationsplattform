import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { AuthenticationTokens } from "~/services/auth/oAuth.server";
import { requireUserSession } from "~/services/auth/session.server";

export function withSessionLoader(
  loaderFn: (
    args: LoaderFunctionArgs & { userSession: AuthenticationTokens },
  ) => ReturnType<LoaderFunction>,
): LoaderFunction {
  return async (args) => {
    const { request } = args;
    const userSession = await requireUserSession(request);
    const result = await loaderFn({
      ...args,
      userSession: userSession.authenticationTokens,
    });

    if (userSession.sessionCookieHeader) {
      const headers = new Headers(
        result instanceof Response ? result.headers : {},
      );
      headers.set("Set-Cookie", userSession.sessionCookieHeader);

      if (result instanceof Response) {
        console.log("response with body, instanceof Response");
        return new Response(result.body, {
          status: result.status,
          statusText: result.statusText,
          headers,
        });
      }

      console.log("response with status 200");
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
    }

    return result;
  };
}
