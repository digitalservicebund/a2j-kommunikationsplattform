import { redirect, type LoaderFunction } from "react-router";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { destroySession, getSession } from "~/services/auth/authSession.server";
import { authenticator, revokeAccessToken } from "~/services/auth/oAuth.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticationProvider = AuthenticationProvider.KOMPLA_IDP;

  const incomingUrl = new URL(request.url);
  console.log("kompla-idp-callback: incoming request URL:", request.url);
  console.log(
    "kompla-idp-callback: query params:",
    Object.fromEntries(incomingUrl.searchParams),
  );
  console.log(
    "kompla-idp-callback: cookie names present:",
    (request.headers.get("Cookie") ?? "")
      .split(";")
      .map((c) => c.trim().split("=")[0])
      .filter(Boolean),
  );

  try {
    const authenticationResponse = await authenticator.authenticate(
      authenticationProvider,
      request,
    );

    console.log(
      "authenticator.authenticate kompla-idp callback done, redirecting to /",
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

    return redirect(`/login?status=${LoginError.KomplaIdp}`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};
