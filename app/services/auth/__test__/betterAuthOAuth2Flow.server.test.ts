import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { describe, expect, it } from "vitest";
import { AuthenticationProvider } from "../auth.types";

/**
 * Regression test for a real production bug: `user.additionalFields` with
 * `input: false` blocks that field from being set anywhere in the
 * create-user pipeline — including via `mapProfileToUser` — not just from
 * public signup forms as the name suggests. That caused a real
 * "authProvider is required" APIError on a genuine KomPla IdP login, since
 * the Developer/Demo paths (which call `internalAdapter.createUser`
 * directly) never exercised this pipeline in earlier local testing.
 *
 * This drives the exact same generic-oauth sign-in -> callback pipeline
 * production uses, with a stubbed token exchange so no real IdP is needed.
 */
function createTestAuth() {
  return betterAuth({
    secret: "test-secret-at-least-32-characters-long",
    baseURL: "http://localhost:3000",
    basePath: "/api/auth",
    user: {
      additionalFields: {
        authProvider: { type: "string", required: true },
      },
    },
    plugins: [
      genericOAuth({
        config: [
          {
            providerId: AuthenticationProvider.KOMPLA_IDP,
            clientId: "test-client",
            clientSecret: "test-secret",
            authorizationUrl: "https://idp.example/auth",
            tokenUrl: "https://idp.example/token",
            pkce: true,
            getToken: async () => ({
              accessToken: "fake-access-token",
              refreshToken: "fake-refresh-token",
              idToken: "fake-id-token",
            }),
            getUserInfo: async () => ({
              id: "kompla-user-1",
              email: "kompla-user-1@no-email.kompla-justiz.internal",
              emailVerified: false,
              name: "kompla-user-1",
            }),
            mapProfileToUser: () =>
              ({
                authProvider: AuthenticationProvider.KOMPLA_IDP,
              }) as never,
          },
        ],
      }),
    ],
  });
}

describe("generic-oauth sign-in -> callback pipeline", () => {
  it("creates a user with authProvider set via mapProfileToUser", async () => {
    const auth = createTestAuth();

    const { response: signInResponse, headers: signInHeaders } =
      await auth.api.signInWithOAuth2({
        body: { providerId: AuthenticationProvider.KOMPLA_IDP },
        returnHeaders: true,
      });

    const state = new URL(signInResponse.url).searchParams.get("state");
    expect(state).toBeTruthy();

    const cookieHeader = signInHeaders
      .getSetCookie()
      .map((cookie) => cookie.split(";")[0])
      .join("; ");

    const callbackResponse = await auth.api.oAuth2Callback({
      params: { providerId: AuthenticationProvider.KOMPLA_IDP },
      query: { code: "fake-code", state: state! },
      headers: new Headers({ cookie: cookieHeader }),
      asResponse: true,
    });

    expect(callbackResponse.status).toBeLessThan(400);

    const sessionResult = await auth.api.getSession({
      headers: new Headers({
        cookie: callbackResponse.headers
          .getSetCookie()
          .map((cookie) => cookie.split(";")[0])
          .join("; "),
      }),
    });

    expect(sessionResult?.user.authProvider).toBe(
      AuthenticationProvider.KOMPLA_IDP,
    );
  });
});
