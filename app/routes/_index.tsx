import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { data, Link, redirect } from "react-router";
import { AuthenticationProvider, authenticator } from "~/services/oAuth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Kommunikationsplattform" },
    { name: "description", content: "Hello Kommunikationsplattform!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Update this to be done within the auth.callback endpoint, when redirect_uri has been updated by beA support team.
  // As a workaround, we will call the authUserRemixOAuth function here, instead of in the `auth.callback.tsx` route.
  return await authUserRemixOAuth(request);
}

async function authUserRemixOAuth(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    try {
      const authenticationResponse = await authenticator.authenticate(
        AuthenticationProvider.BEA,
        request,
      );

      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": authenticationResponse.sessionCookieHeader,
        },
      });
    } catch (error) {
      console.error("Authentication error:", error);
      return data(null);
    }
  } else {
    return data(null);
  }
}

export default function Index() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        Kommunikationsplattform
      </h1>
      <h2 className={"ds-heading-03-reg break-word"}>
        Willkommen auf der Pilotplattform für den digitalen Austausch zwischen
        Gerichten und Verfahrensbeteiligten in Zivilprozessen vor Amtsgerichten
      </h2>

      <div className={"m-40 text-center"}>
        <p className={"pb-20"}>Bitte wählen Sie Ihre Loginmethode:</p>
        <div className="flex flex-col gap-16 items-center">
          <Link to={"/login"} className={"ds-button"}>
            beA-Portal
          </Link>

          <Link
            to={"/verfahren"}
            className={"ds-button"}
            onClick={() => {
              localStorage.setItem("demo_mode", "true");
            }}
          >
            Demo mode
          </Link>
        </div>
      </div>
    </main>
  );
}
