import { redirect } from "react-router";
import { AuthenticationProvider } from "./auth.types";
import { auth } from "./betterAuth.server";

export const loginAsDeveloper = async () => {
  try {
    console.log("loginAsDeveloper");

    const devAccessToken = "dev-access-token";
    const devIdToken = "DE.BRAK_SPT.cbceac6e-5fe8-11f1-b4b1-325096b39f47.28e6";
    const expiresAt = Date.now() + 60 * 60 * 1000 * 24 * 14; // 14 days
    const devRefreshToken = "dev-refresh-token";

    const response = await auth.api.signInCustom({
      body: {
        provider: AuthenticationProvider.DEVELOPMENT,
        accessToken: devAccessToken,
        idToken: devIdToken,
        expiresAt,
        refreshToken: devRefreshToken,
      },
      asResponse: true,
    });

    return redirect("/", { headers: response.headers });
  } catch (error) {
    console.error("Dev login error:", error);
    return new Response("Dev login failed", { status: 500 });
  }
};
