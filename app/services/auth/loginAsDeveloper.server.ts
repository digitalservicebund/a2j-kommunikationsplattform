import { AuthenticationProvider } from "./auth.types";
import { setAuthSession } from "./authSession.server";

export const loginAsDeveloper = async (request: Request) => {
  try {
    console.log("loginAsDeveloper");

    const devAccessToken = "dev-access-token";
    const devIdToken = "DE.BRAK_SPT.cbceac6e-5fe8-11f1-b4b1-325096b39f47.28e6";
    const expiresAt = Date.now() + 60 * 60 * 1000 * 24 * 14; // 14 days
    const devRefreshToken = "dev-refresh-token";
    const sessionCookieHeader = await setAuthSession({
      accessToken: devAccessToken,
      idToken: devIdToken,
      expiresAt,
      refreshToken: devRefreshToken,
      request,
      provider: AuthenticationProvider.DEVELOPMENT,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookieHeader,
      },
    });
  } catch (error) {
    console.error("Dev login error:", error);
    return new Response("Dev login failed", { status: 500 });
  }
};
