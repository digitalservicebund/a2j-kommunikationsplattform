import { redirect, type ActionFunctionArgs } from "react-router";
import { auth } from "~/services/auth/betterAuth.server";

export enum LogoutType {
  Automatic = "auto-logged-out",
  ByUser = "logged-out",
}

/**
 * /action/logout-user
 *
 * Redirects to the login page with automatic or logged out
 * by user status URL param.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const logoutType = formData.get("logoutType") as LogoutType;

  const response = await auth.api.signOut({
    headers: request.headers,
    asResponse: true,
  });

  return redirect(`/login?status=${logoutType}`, {
    headers: response.headers,
  });
};
