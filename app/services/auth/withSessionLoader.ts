import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { AuthenticationContext } from "~/services/auth/oAuth.server";
import { requireUserSession } from "~/services/auth/session.server";

export function withSessionLoader(
  loaderFn: (
    args: LoaderFunctionArgs & { userSession: AuthenticationContext },
  ) => ReturnType<LoaderFunction>,
): LoaderFunction {
  return async (args) => {
    const { request } = args;
    const userSession = await requireUserSession(request);
    console.log("withSessionLoader userSession:", JSON.stringify(userSession));
    return loaderFn({ ...args, userSession });
  };
}
