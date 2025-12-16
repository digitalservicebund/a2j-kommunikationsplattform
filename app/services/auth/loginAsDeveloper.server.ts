import { setAuthSession } from "./authSession.server";

export const loginAsDeveloper = async (request: Request) => {
  try {
    console.log("loginAsDeveloper");

    const devAccessToken = "dev-access-token";
    const expiresAt = Date.now() + 60 * 60 * 1000 * 24 * 14; // 14 days
    const devRefreshToken = "dev-refresh-token";
    const sessionCookieHeader = await setAuthSession({
      accessToken: devAccessToken,
      expiresAt,
      refreshToken: devRefreshToken,
      request,
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
