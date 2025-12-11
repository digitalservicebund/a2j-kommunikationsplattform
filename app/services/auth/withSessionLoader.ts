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
    console.log("withSessionLoader userSession:", userSession);
    return loaderFn({ ...args, userSession: userSession.authenticationTokens });
  };
}
