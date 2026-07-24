import { redirect, type LoaderFunction } from "react-router";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";
import { magicLinkClient } from "~/services/auth/magicLinkClient.server";
import { LoginError } from "./action.login-user";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      throw new Error("MagicLinkStrategy: no auth code in request URL");
    }

    const tokens = await magicLinkClient.exchangeCodeForTokens(code);

    const response = await auth.api.signInCustom({
      body: {
        provider: AuthenticationProvider.DEMO,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      },
      asResponse: true,
    });

    console.log("MagicLinkStrategy: phase 2 callback done, redirecting to /");

    return redirect("/", { headers: response.headers });
  } catch (error) {
    console.error(
      "Magic link callback failed:",
      error instanceof Error ? error.message : error,
    );

    return redirect(`/login?status=${LoginError.Demo}`);
  }
};
