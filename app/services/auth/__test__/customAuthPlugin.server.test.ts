import { betterAuth } from "better-auth";
import { describe, expect, it } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import { customAuthPlugin } from "../customAuthPlugin.server";

function createTestAuth() {
  return betterAuth({
    secret: "test-secret-at-least-32-characters-long",
    baseURL: "http://localhost:3000",
    basePath: "/api/auth",
    disabledPaths: ["/sign-in/custom"],
    user: {
      additionalFields: {
        authProvider: { type: "string", required: true },
      },
    },
    plugins: [customAuthPlugin()],
  });
}

describe("customAuthPlugin", () => {
  it("mints a session for the Demo provider, resolvable via getSession", async () => {
    const auth = createTestAuth();

    const signInResponse = await auth.api.signInCustom({
      body: {
        provider: AuthenticationProvider.DEMO,
        accessToken: "demo-access-token",
        refreshToken: "demo-refresh-token",
        expiresAt: Date.now() + 60_000,
      },
      asResponse: true,
    });

    expect(signInResponse.headers.getSetCookie().length).toBeGreaterThan(0);

    const sessionResult = await auth.api.getSession({
      headers: new Headers({
        cookie: signInResponse.headers.getSetCookie()[0],
      }),
    });

    expect(sessionResult?.user.authProvider).toBe(AuthenticationProvider.DEMO);
  });

  it("mints a distinct session for the Developer provider", async () => {
    const auth = createTestAuth();

    const signInResponse = await auth.api.signInCustom({
      body: {
        provider: AuthenticationProvider.DEVELOPMENT,
        accessToken: "dev-access-token",
        refreshToken: "dev-refresh-token",
        expiresAt: Date.now() + 60_000,
        idToken: "dev-id-token",
      },
      asResponse: true,
    });

    const sessionResult = await auth.api.getSession({
      headers: new Headers({
        cookie: signInResponse.headers.getSetCookie()[0],
      }),
    });

    expect(sessionResult?.user.authProvider).toBe(
      AuthenticationProvider.DEVELOPMENT,
    );
  });

  it("blocks /sign-in/custom from the public HTTP router (no way to forge a session)", async () => {
    const auth = createTestAuth();

    const response = await auth.handler(
      new Request("http://localhost:3000/api/auth/sign-in/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: AuthenticationProvider.DEVELOPMENT,
          accessToken: "forged-token",
          refreshToken: "forged-refresh",
          expiresAt: Date.now() + 60_000,
        }),
      }),
    );

    expect(response.status).toBe(404);
  });
});
