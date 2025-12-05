import { redirect, type LoaderFunction } from "react-router";
import {
  AuthenticationProvider,
  authenticator,
  revokeAccessToken,
} from "~/services/auth/oAuth.server";
import { destroySession, getSession } from "~/services/auth/session.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticationProvider = AuthenticationProvider.BEA;

  try {
    const authenticationResponse = await authenticator.authenticate(
      authenticationProvider,
      request,
    );

    console.log(
      "authenticator.authenticate auth callback done, redirecting to /",
    );

    return redirect("/", {
      headers: {
        "Set-Cookie": authenticationResponse.sessionCookieHeader,
      },
    });
  } catch (error) {
    console.error(
      `Failed to authenticate user via "${authenticationProvider}":`,
      error,
    );

    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");

    if (accessToken) {
      await revokeAccessToken(accessToken);
    }

    return redirect(`/login?status=${LoginError.BeA}`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};
