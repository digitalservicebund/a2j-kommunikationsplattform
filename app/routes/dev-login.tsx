import { createUserSession } from "~/services/prototype.session.server";

export const loader = async ({ request }: { request: Request }) => {
  try {
    const devAccessToken = "dev-access-token";
    const expiresAt = Date.now() + 60 * 60 * 1000 * 24 * 14; // 14 days
    const sessionCookieHeader = await createUserSession(
      devAccessToken,
      expiresAt,
      request,
    );

    if (!sessionCookieHeader) throw new Error("Session cookie not set");

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/prototype/verfahren",
        "Set-Cookie": sessionCookieHeader,
      },
    });
  } catch (error) {
    console.error("Dev login error:", error);
    return new Response("Dev login failed", { status: 500 });
  }
};
