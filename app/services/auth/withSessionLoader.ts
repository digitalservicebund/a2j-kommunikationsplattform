import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { AuthenticationContext } from "~/services/prototype.oAuth.server";
import { requireUserSession } from "~/services/prototype.session.server";

export function withSessionLoader(
  loaderFn: (
    args: LoaderFunctionArgs & { userSession: AuthenticationContext },
  ) => ReturnType<LoaderFunction>,
): LoaderFunction {
  return async (args) => {
    const { request } = args;
    const userSession = await requireUserSession(request);
    return loaderFn({ ...args, userSession });
  };
}
