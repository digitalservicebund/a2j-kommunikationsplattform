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
 * Redirects to the login page with automatic or logged out
 * by user status URL param.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  // To test is CSRF validation is working, uncomment the lines below and:

  // const validatedSession = await validateCsrfSessionFormless(request);
  // if (validatedSession.isErr) {
  //   return redirect(`/?status=${LogoutType.Automatic}`);
  //   throw new Response(null, { status: 403 });
  // }

  const formData = await request.formData();
  const logoutType = formData.get("logoutType") as LogoutType;

  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/?status=${logoutType}`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
