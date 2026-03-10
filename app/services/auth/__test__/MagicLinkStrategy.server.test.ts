import { beforeEach, describe, expect, it, vi } from "vitest";
import { MagicLinkStrategy } from "../MagicLinkStrategy.server";
import {
  AuthenticationProvider,
  AuthenticationResponse,
} from "../oAuth.server";

// NOTE: do NOT mock "remix-auth/strategy" — doing so prevents Istanbul
// from instrumenting MagicLinkStrategy (the subclass), resulting in 0% coverage.

const validConfig = {
  idpIssuer: "https://auth.example.com/realms/test",
  serviceClientId: "magic-link-service",
  serviceClientSecret: "service-secret",
  clientId: "magic-link",
  redirectUri: "http://localhost:3000",
  username: "demo",
  email: "demo@example.com",
};

const mockTokenResponse = {
  access_token: "at-123",
  refresh_token: "rt-456",
  expires_in: 300,
};

function makeStrategy(configOverrides: Partial<typeof validConfig> = {}) {
  const verify = vi
    .fn<() => Promise<AuthenticationResponse>>()
    .mockResolvedValue({
      authenticationTokens: {
        accessToken: "at",
        expiresAt: Date.now() + 60_000,
        refreshToken: "rt",
      },
      sessionCookieHeader: "",
      provider: AuthenticationProvider.DEMO,
    });
  const strategy = new MagicLinkStrategy(
    { ...validConfig, ...configOverrides },
    verify,
  );
  return { strategy, verify };
}

function stubFetch(
  ...responses: Array<{
    ok: boolean;
    status?: number;
    statusText?: string;
    headers?: Headers;
    json?: () => Promise<unknown>;
    text?: () => Promise<string>;
  }>
) {
  const mockFn = vi.fn();
  for (const res of responses) {
    mockFn.mockResolvedValueOnce(res);
  }
  vi.stubGlobal("fetch", mockFn);
  return mockFn;
}

describe("MagicLinkStrategy", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe("assertConfig", () => {
    it("throws listing missing env var names in SCREAMING_SNAKE_CASE", async () => {
      const { strategy } = makeStrategy({ serviceClientSecret: "", email: "" });
      await expect(strategy.getMagicLinkUrl()).rejects.toThrow(
        "KOMPLA_DEMO_SERVICE_CLIENT_SECRET, KOMPLA_DEMO_EMAIL",
      );
    });

    it("throws when all config values are missing", async () => {
      const strategy = new MagicLinkStrategy(
        {
          idpIssuer: "",
          serviceClientId: "",
          serviceClientSecret: "",
          clientId: "",
          redirectUri: "",
          username: "",
          email: "",
        },
        vi.fn(),
      );
      await expect(strategy.getMagicLinkUrl()).rejects.toThrow(
        "MagicLinkStrategy: missing required env vars",
      );
    });
  });

  describe("getMagicLinkUrl", () => {
    it("returns magic link URL from JSON response", async () => {
      stubFetch(
        { ok: true, json: async () => ({ access_token: "svc-token" }) },
        {
          ok: true,
          headers: new Headers({ "content-type": "application/json" }),
          json: async () => ({ link: "https://magic.link/abc" }),
        },
      );
      const { strategy } = makeStrategy();
      await expect(strategy.getMagicLinkUrl()).resolves.toBe(
        "https://magic.link/abc",
      );
    });

    it("returns magic link URL from plain text response", async () => {
      stubFetch(
        { ok: true, json: async () => ({ access_token: "svc-token" }) },
        {
          ok: true,
          headers: new Headers({ "content-type": "text/plain" }),
          text: async () => "  https://magic.link/plain  ",
        },
      );
      const { strategy } = makeStrategy();
      await expect(strategy.getMagicLinkUrl()).resolves.toBe(
        "https://magic.link/plain",
      );
    });

    it("throws when service token request fails", async () => {
      stubFetch({ ok: false, status: 401, statusText: "Unauthorized" });
      const { strategy } = makeStrategy();
      await expect(strategy.getMagicLinkUrl()).rejects.toThrow(
        "Service token request failed: 401 Unauthorized",
      );
    });

    it("throws when magic link request fails", async () => {
      stubFetch(
        { ok: true, json: async () => ({ access_token: "svc-token" }) },
        { ok: false, status: 500, statusText: "Internal Server Error" },
      );
      const { strategy } = makeStrategy();
      await expect(strategy.getMagicLinkUrl()).rejects.toThrow(
        "Magic link request failed: 500 Internal Server Error",
      );
    });

    it("throws on unexpected JSON shape from magic link endpoint", async () => {
      stubFetch(
        { ok: true, json: async () => ({ access_token: "svc-token" }) },
        {
          ok: true,
          headers: new Headers({ "content-type": "application/json" }),
          json: async () => ({ unexpected: "field" }),
        },
      );
      const { strategy } = makeStrategy();
      await expect(strategy.getMagicLinkUrl()).rejects.toThrow(
        "Unexpected magic link JSON response",
      );
    });

    it("sends service token as Authorization Bearer to magic link endpoint", async () => {
      const fetchMock = stubFetch(
        { ok: true, json: async () => ({ access_token: "svc-token-xyz" }) },
        {
          ok: true,
          headers: new Headers({ "content-type": "text/plain" }),
          text: async () => "https://magic.link/url",
        },
      );
      const { strategy } = makeStrategy();
      await strategy.getMagicLinkUrl();
      expect(fetchMock.mock.calls[1][1].headers["Authorization"]).toBe(
        "Bearer svc-token-xyz",
      );
    });
  });

  describe("authenticate", () => {
    it("throws when request has no ?code= parameter", async () => {
      const { strategy } = makeStrategy();
      const request = new Request("https://example.com/callback");
      await expect(strategy.authenticate(request)).rejects.toThrow(
        "MagicLinkStrategy: no auth code in request URL",
      );
    });

    it("exchanges code for tokens and calls verify with parsed tokens", async () => {
      stubFetch({ ok: true, json: async () => mockTokenResponse });
      const { strategy, verify } = makeStrategy();
      const request = new Request(
        "https://example.com/callback?code=auth-code-123",
      );
      await strategy.authenticate(request);
      expect(verify).toHaveBeenCalledWith({
        tokens: expect.objectContaining({
          accessToken: "at-123",
          refreshToken: "rt-456",
        }),
        request,
      });
    });

    it("throws when token exchange returns non-ok response", async () => {
      stubFetch({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "invalid_code",
      });
      const { strategy } = makeStrategy();
      const request = new Request("https://example.com/callback?code=bad-code");
      await expect(strategy.authenticate(request)).rejects.toThrow(
        "Token exchange failed: 400",
      );
    });

    it("returns the result of verify", async () => {
      stubFetch({ ok: true, json: async () => mockTokenResponse });
      const { strategy, verify } = makeStrategy();
      const expectedResponse: AuthenticationResponse = {
        authenticationTokens: {
          accessToken: "verified-at",
          expiresAt: 9999,
          refreshToken: "verified-rt",
        },
        sessionCookieHeader: "cookie=value",
        provider: AuthenticationProvider.DEMO,
      };
      verify.mockResolvedValueOnce(expectedResponse);
      const request = new Request(
        "https://example.com/callback?code=valid-code",
      );
      const result = await strategy.authenticate(request);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("refreshAccessToken", () => {
    it("returns parsed tokens on success", async () => {
      stubFetch({
        ok: true,
        json: async () => ({
          access_token: "new-at",
          refresh_token: "new-rt",
          expires_in: 600,
        }),
      });
      const { strategy } = makeStrategy();
      const tokens = await strategy.refreshAccessToken("old-rt");
      expect(tokens.accessToken).toBe("new-at");
      expect(tokens.refreshToken).toBe("new-rt");
      expect(typeof tokens.expiresAt).toBe("number");
      expect(tokens.expiresAt).toBeGreaterThan(Date.now());
    });

    it("falls back to provided refreshToken when response omits it", async () => {
      stubFetch({
        ok: true,
        json: async () => ({ access_token: "new-at", expires_in: 300 }),
      });
      const { strategy } = makeStrategy();
      const tokens = await strategy.refreshAccessToken("fallback-rt");
      expect(tokens.refreshToken).toBe("fallback-rt");
    });

    it("throws on non-ok response", async () => {
      stubFetch({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: async () => "token expired",
      });
      const { strategy } = makeStrategy();
      await expect(strategy.refreshAccessToken("expired-rt")).rejects.toThrow(
        "Demo token refresh failed: 401",
      );
    });
  });
});
