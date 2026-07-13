import { redirect, type LoaderFunction } from "react-router";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { destroySession, getSession } from "~/services/auth/authSession.server";
import { authenticator, revokeAccessToken } from "~/services/auth/oAuth.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticationProvider = AuthenticationProvider.TEST;

  const incomingUrl = new URL(request.url);
  console.log("test-callback: incoming request URL:", request.url);
  console.log(
    "test-callback: query params:",
    Object.fromEntries(incomingUrl.searchParams),
  );
  console.log(
    "test-callback: cookie names present:",
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
      "authenticator.authenticate test callback done, redirecting to /",
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

    return redirect(`/login?status=${LoginError.Test}`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};
