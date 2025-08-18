import { redirect, type LoaderFunction } from "react-router";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/prototype.oAuth.server";

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
    .catch((error) => {
      console.log(
        `Failed to authenticate user at : ${authenticationProvider}`,
        error,
      );
      throw redirect("/error");
    });
};

export default function AuthCallback() {
  return (
    <main>
      <h1 className="kern-heading-display">Authentication callback error</h1>
    </main>
  );
}
