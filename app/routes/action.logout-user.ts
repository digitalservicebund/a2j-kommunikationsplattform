import { redirect, type ActionFunctionArgs } from "react-router";
import { LoginStatus } from "~/routes/login";
import { LogoutType } from "~/services/auth/auth.types.ts";
import { auth } from "~/services/auth/betterAuth.server";

const logoutTypeToLoginStatus: Record<LogoutType, LoginStatus> = {
  [LogoutType.Automatic]: LoginStatus.LoggedOutAutomatically,
  [LogoutType.ByUser]: LoginStatus.LoggedOutManually,
};

/**
 * Redirects to the login page with automatic or logged out
 * by user status URL param.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  let logoutType = formData.get("logoutType") as LogoutType;
  if (!Object.values(LogoutType).includes(logoutType)) {
    logoutType = LogoutType.ByUser;
  }

  let returnToURL = formData.get("returnTo");
  if (typeof returnToURL !== "string") {
    returnToURL = null;
  }

  const response = await auth.api.signOut({
    headers: request.headers,
    asResponse: true,
  });

  const loginParams = new URLSearchParams();
  loginParams.append("status", logoutTypeToLoginStatus[logoutType]);
  if (returnToURL) {
    loginParams.append("next", returnToURL);
  }

  return redirect(`/login?${loginParams}`, {
    headers: response.headers,
  });
};
