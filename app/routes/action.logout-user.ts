import { redirect, type ActionFunctionArgs } from "react-router";
import { z } from "zod";
import { LoginStatus } from "~/routes/login";
import { LogoutType } from "~/services/auth/auth.types.ts";
import { auth } from "~/services/auth/betterAuth.server";
import { parseActionFormData } from "~/utils/actionInput";

const logoutTypeToLoginStatus: Record<LogoutType, LoginStatus> = {
  [LogoutType.Automatic]: LoginStatus.LoggedOutAutomatically,
  [LogoutType.ByUser]: LoginStatus.LoggedOutManually,
};

const ActionInputSchema = z.object({
  logoutType: z.enum(LogoutType),
  returnTo: z.string().optional(),
});
/**
 * Redirects to the login page with automatic or logged out
 * by user status URL param.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const { logoutType, returnTo: returnToURL } = parseActionFormData(
    formData,
    ActionInputSchema,
  );

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
