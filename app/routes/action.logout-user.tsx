import { redirect, type ActionFunctionArgs } from "react-router";
import {
  destroySession,
  getSession,
} from "~/services/prototype.session.server";

export enum LogoutStatus {
  Auto = "logged-out",
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/?status=${LogoutStatus.Auto}`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
