import { KernHeading } from "@kern-ux-annex/kern-react-kit";
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
    <main className={"m-40 flex flex-col items-center"}>
      <KernHeading level={1}>Authentication callback error</KernHeading>
    </main>
  );
}
