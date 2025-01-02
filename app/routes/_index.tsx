import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { data, Link, redirect } from "@remix-run/react";
import { authenticator } from "~/services/oauth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Kommunikationsplattform" },
    { name: "description", content: "Hello Kommunikationsplattform!" },
  ];
};

// TODO:
// - auth flow: add error handling
// - on page load: if user is logged in already, redirect to /dashboard
//   - authorizeUser() via auth.callback.tsx, when redirect_url has been updated @ BRAK

export async function loader({ request }: LoaderFunctionArgs) {
  // We have requested this to be updated to the auth.callback endpoint, but it has not yet been done.
  // As a workaround, we will call the authUserRemixOAuth function here, instead of in the `auth.callback.tsx` route.
  await authUserRemixOAuth(request);

  return data(null);
}

async function authUserRemixOAuth(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    try {
      let user = await authenticator.authenticate("bea", request);
      console.log("user is", user);
    } catch (error) {
      console.error("Authentication error:", error);
    }
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
        <Link to={"/login"} className={"ds-button"}>
          beA-Portal
        </Link>
      </div>
    </main>
  );
}
