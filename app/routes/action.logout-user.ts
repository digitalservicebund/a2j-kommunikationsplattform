import { redirect, type ActionFunctionArgs } from "react-router";
import { destroySession, getSession } from "~/services/auth/session.server";

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

  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/login?status=${logoutType}`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
