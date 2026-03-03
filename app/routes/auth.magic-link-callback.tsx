import { redirect, type LoaderFunction } from "react-router";
import { destroySession, getSession } from "~/services/auth/authSession.server";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/auth/oAuth.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const authenticationResponse = await authenticator.authenticate(
      AuthenticationProvider.DEMO,
      request,
    );

    console.log("MagicLinkStrategy: phase 2 callback done, redirecting to /");

    return redirect("/", {
      headers: {
        "Set-Cookie": authenticationResponse.sessionCookieHeader,
      },
    });
  } catch (error) {
    console.error(
      "Magic link callback failed:",
      error instanceof Error ? error.message : error,
    );

    const session = await getSession(request.headers.get("Cookie"));

    return redirect(`/login?status=${LoginError.Demo}`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};
