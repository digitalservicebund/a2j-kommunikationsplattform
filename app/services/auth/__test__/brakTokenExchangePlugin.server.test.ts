import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import { brakTokenExchangePlugin } from "../brakTokenExchangePlugin.server";

type Provider = { id: string; refreshAccessToken?: unknown };
type InitContext = Parameters<
  ReturnType<typeof brakTokenExchangePlugin>["init"]
>[0];

function runInit(socialProviders: Provider[]) {
  return brakTokenExchangePlugin().init({
    socialProviders,
  } as unknown as InitContext);
}

describe("brakTokenExchangePlugin", () => {
  it("replaces the beA provider's refreshAccessToken with the KomPla IdP one", () => {
    const komplaRefresh = vi.fn();
    const bea = { id: AuthenticationProvider.BEA, refreshAccessToken: vi.fn() };
    const kompla = {
      id: AuthenticationProvider.KOMPLA_IDP,
      refreshAccessToken: komplaRefresh,
    };
    const other = { id: "other", refreshAccessToken: vi.fn() };

    const { context } = runInit([bea, kompla, other]);

    expect(context.socialProviders).toEqual([
      { ...bea, refreshAccessToken: komplaRefresh },
      kompla,
      other,
    ]);
  });

  it("throws if the KomPla IdP provider is not registered", () => {
    expect(() =>
      runInit([
        { id: AuthenticationProvider.BEA, refreshAccessToken: vi.fn() },
      ]),
    ).toThrow(/kompla-idp/);
  });

  it("makes getAccessToken refresh beA accounts against the KomPla IdP", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            access_token: "refreshed-kompla-access-token",
            refresh_token: "refreshed-kompla-refresh-token",
            expires_in: 300,
            token_type: "Bearer",
          }),
          { headers: { "Content-Type": "application/json" } },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const auth = betterAuth({
      secret: "test-secret-at-least-32-characters-long",
      baseURL: "http://localhost:3000",
      plugins: [
        genericOAuth({
          config: [
            {
              providerId: AuthenticationProvider.BEA,
              clientId: "brak-client",
              clientSecret: "brak-secret",
              authorizationUrl: "https://brak.example/auth",
              tokenUrl: "https://brak.example/token",
            },
            {
              providerId: AuthenticationProvider.KOMPLA_IDP,
              clientId: "kompla-client",
              clientSecret: "kompla-secret",
              authorizationUrl: "https://kompla.example/auth",
              tokenUrl: "https://kompla.example/token",
            },
          ],
        }),
        brakTokenExchangePlugin(),
      ],
    });

    const ctx = await auth.$context;
    const user = await ctx.internalAdapter.createUser(
      {
        email: "bea-user@example.com",
        name: "bea-user",
        emailVerified: false,
      },
      { method: "custom" },
    );
    const account = await ctx.internalAdapter.createAccount({
      userId: user.id,
      providerId: AuthenticationProvider.BEA,
      accountId: "bea-user",
      accessToken: "expired-kompla-access-token",
      refreshToken: "kompla-refresh-token",
      accessTokenExpiresAt: new Date(Date.now() - 1000),
    });

    try {
      const result = await auth.api.getAccessToken({
        body: { accountId: account.id, userId: user.id },
      });

      expect(result.accessToken).toBe("refreshed-kompla-access-token");
      const [url, init] = fetchMock.mock.calls[0] as unknown as [
        URL,
        { body: URLSearchParams },
      ];
      expect(String(url)).toBe("https://kompla.example/token");
      expect(init.body.get("grant_type")).toBe("refresh_token");
      expect(init.body.get("refresh_token")).toBe("kompla-refresh-token");
      expect(init.body.get("client_id")).toBe("kompla-client");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
