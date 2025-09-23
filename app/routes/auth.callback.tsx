import { redirect, type LoaderFunction } from "react-router";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/prototype.oAuth.server";
import {
  destroySession,
  getSession,
} from "~/services/prototype.session.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  // Fyi: When the authorization server redirects to this route (Redirect URI),
  // then there is currently a code in the URL that could be used
  // for further identification
  // const url = new URL(request.url);
  // const code = url.searchParams.get("code");
  // if (code) {
  //   // do something
  // }

  const authenticationProvider = AuthenticationProvider.BEA;
  return authenticator
    .authenticate(authenticationProvider, request)
    .then((authenticationResponse) => {
      return redirect("/prototype/verfahren", {
        headers: {
          "Set-Cookie": authenticationResponse.sessionCookieHeader,
        },
      });
    })
    .catch(async (error) => {
      console.log(
        `Failed to authenticate user via "${authenticationProvider}":`,
        error,
      );

      const session = await getSession(request.headers.get("Cookie"));

      return redirect(`login/?status=${LoginError.BeA}`, {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    });
};
