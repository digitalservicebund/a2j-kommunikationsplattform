import { betterAuth } from "better-auth";
import { describe, expect, it } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import { customAuthPlugin } from "../customAuthPlugin.server";

function createTestAuth() {
  return betterAuth({
    secret: "test-secret-at-least-32-characters-long",
    baseURL: "http://localhost:3000",
    basePath: "/api/auth",
    user: {
      additionalFields: {
        authProvider: { type: "string", required: true, input: false },
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
});
