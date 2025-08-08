import { redirect, type ActionFunctionArgs } from "react-router";
import {
  destroySession,
  getSession,
} from "~/services/prototype.session.server";

export enum LogoutType {
  Automatic = "auto-logged-out",
  ByUser = "logged-out",
}

/**
 * /action/logout-user
 *
 * Redirects to the login page with a automatic or
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const logoutType = formData.get("logoutType") as LogoutType;

  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/?status=${logoutType}`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
