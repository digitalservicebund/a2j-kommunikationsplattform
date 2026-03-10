/* eslint-disable  @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock server config before importing the module under test
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    BRAK_IDP_OIDC_CLIENT_ID: "client-id",
    BRAK_IDP_OIDC_CLIENT_SECRET: "client-secret",
    BRAK_IDP_OIDC_ISSUER: "https://issuer.example",
    BRAK_IDP_OIDC_REDIRECT_URI: "https://redirect.example",
    KOMPLA_DEMO_IDP_ISSUER: "https://demo-issuer.example",
    KOMPLA_DEMO_SERVICE_CLIENT_ID: "demo-service-client",
    KOMPLA_DEMO_SERVICE_CLIENT_SECRET: "demo-service-secret",
    KOMPLA_DEMO_CLIENT_ID: "demo-client",
    KOMPLA_DEMO_REDIRECT_URI: "https://demo-redirect.example",
    KOMPLA_DEMO_USERNAME: "demo",
    KOMPLA_DEMO_EMAIL: "demo@example.com",
  }),
}));

// Mock MagicLinkStrategy to expose controllable mocks
vi.mock("../MagicLinkStrategy.server", () => {
  const getMagicLinkUrlMock = vi.fn();
  const refreshAccessTokenMock = vi.fn();

  class MagicLinkStrategy {
    verify: any;
    constructor(_opts: any, _verify: any) {
      this.verify = _verify;
    }
    getMagicLinkUrl() {
      return getMagicLinkUrlMock();
    }
    refreshAccessToken(refreshToken: string) {
      return refreshAccessTokenMock(refreshToken);
    }
  }

  return {
    MagicLinkStrategy,
    __mocks__: { getMagicLinkUrlMock, refreshAccessTokenMock },
  };
});

// Mock remix-auth-oauth2 and create controllable mocks inside the factory
vi.mock("remix-auth-oauth2", () => {
  const refreshTokenMock = vi.fn();
  const revokeTokenMock = vi.fn();

  class OAuth2Strategy {
    verify: any;
    constructor(_opts: any, _verify: any) {
      this.verify = _verify;
    }
    refreshToken(refreshToken: string) {
      return refreshTokenMock(refreshToken);
    }
    revokeToken(token: string) {
      return revokeTokenMock(token);
    }
  }

  return {
    OAuth2Strategy,
    CodeChallengeMethod: { S256: "S256" },
    // export the mocks so tests can configure them
    __mocks__: { refreshTokenMock, revokeTokenMock },
  };
});

// Mock the auth session setter to avoid real session storage usage
vi.mock("../authSession.server", () => ({
  setAuthSession: vi.fn().mockResolvedValue("set-cookie-header"),
}));

import {
  AuthenticationProvider,
  type AuthenticationResponse,
  type AuthenticationTokens,
  authenticator,
} from "../oAuth.server";

type VerifyArgs = {
  tokens: {
    accessToken: () => string;
    hasRefreshToken: () => boolean;
    refreshToken: () => string | undefined;
    accessTokenExpiresInSeconds?: () => number;
  };
  request: Request;
};

type StrategyResponse = {
  verify: (a: VerifyArgs) => Promise<AuthenticationResponse>;
};

type DemoVerifyArgs = {
  tokens: AuthenticationTokens;
  request: Request;
};

type DemoStrategyResponse = {
  verify: (a: DemoVerifyArgs) => Promise<AuthenticationResponse>;
};

type AuthWithStrategies = {
  strategies: Map<string, StrategyResponse>;
};

const mockedSetAuthSession = vi.mocked(setAuthSession as any);

function getBeaStrategy(): StrategyResponse {
  const strategyMap = (authenticator as unknown as AuthWithStrategies)
    .strategies;
  const strategy = strategyMap.get(AuthenticationProvider.BEA);
  if (!strategy) throw new Error("beA strategy not registered");
  return strategy;
}

function getDemoStrategy(): DemoStrategyResponse {
  const strategyMap = (authenticator as unknown as AuthWithStrategies)
    .strategies;
  const strategy = strategyMap.get(AuthenticationProvider.DEMO);
  if (!strategy) throw new Error("demo strategy not registered");
  return strategy as unknown as DemoStrategyResponse;
}

import { setAuthSession } from "../authSession.server";
import {
  getDemoMagicLinkUrl,
  refreshAccessToken,
  refreshDemoToken,
  revokeAccessToken,
} from "../oAuth.server";

// `remix-auth-oauth2` does not export `__mocks__` in its types —
// import it dynamically to access the mock created above at runtime.
let oAuthMocks: any;
let demoMocks: any;
beforeAll(async () => {
  const [oAuthMod, demoMod] = await Promise.all([
    import("remix-auth-oauth2"),
    import("../MagicLinkStrategy.server"),
  ]);
  oAuthMocks = (oAuthMod as any).__mocks__;
  demoMocks = (demoMod as any).__mocks__;
});

describe("oAuth.server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const accessToken = "access-123";
  const refreshToken = "refresh-456";
  const mockRequest = new Request("https://example.com/callback");

  it("verify OAuth2Strategy callback: calls setAuthSession and returns AuthenticationResponse", async () => {
    mockedSetAuthSession.mockResolvedValueOnce("cookie-header-value");

    const strategy = getBeaStrategy();

    const mockTokens = {
      accessToken: () => accessToken,
      refreshToken: () => refreshToken,
      accessTokenExpiresInSeconds: () => 300,
      hasRefreshToken: () => true,
    } as any;

    const result = await strategy.verify({
      tokens: mockTokens,
      request: mockRequest,
    });

    expect(setAuthSession).toHaveBeenCalledWith({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
      refreshToken: refreshToken,
      request: mockRequest,
      provider: "bea",
    });

    expect(result).toEqual({
      authenticationTokens: {
        accessToken: accessToken,
        expiresAt: expect.any(Number),
        refreshToken: refreshToken,
      },
      sessionCookieHeader: "cookie-header-value",
      provider: "bea",
    });
  });

  it("refreshAccessToken uses OAuth2Strategy.refreshToken and setAuthSession", async () => {
    const tokenObj = {
      accessToken: () => "new-access-token",
      refreshToken: () => "new-refresh-token",
      hasRefreshToken: () => true,
      accessTokenExpiresInSeconds: () => 600,
    };

    oAuthMocks.refreshTokenMock.mockResolvedValue(tokenObj);

    const fakeRequest = new Request("https://example.test/refresh");

    const result = await refreshAccessToken(fakeRequest, "old-refresh-token");

    expect(oAuthMocks.refreshTokenMock).toHaveBeenCalledWith(
      "old-refresh-token",
    );
    expect(setAuthSession).toHaveBeenCalled();
    expect(result.authenticationTokens.accessToken).toBe("new-access-token");
    expect(result.authenticationTokens.refreshToken).toBe("new-refresh-token");
    expect(typeof result.authenticationTokens.expiresAt).toBe("number");
    expect(result.sessionCookieHeader).toBe("set-cookie-header");
  });

  it("refreshAccessToken keeps original refresh token when strategy has no refresh token", async () => {
    const tokenObjNoRefresh = {
      accessToken: () => "new-access-token-2",
      refreshToken: () => undefined,
      hasRefreshToken: () => false,
      accessTokenExpiresInSeconds: () => 120,
    } as any;

    oAuthMocks.refreshTokenMock.mockResolvedValue(tokenObjNoRefresh);
    (setAuthSession as any).mockResolvedValueOnce("sc-header-2");

    const fakeRequest = new Request("https://example.test/refresh2");

    const result = await refreshAccessToken(fakeRequest, "orig-refresh-token");

    expect(oAuthMocks.refreshTokenMock).toHaveBeenCalledWith(
      "orig-refresh-token",
    );
    expect(setAuthSession).toHaveBeenCalled();
    expect(result.authenticationTokens.refreshToken).toBe("orig-refresh-token");
    expect(result.sessionCookieHeader).toBe("sc-header-2");
  });

  it("refreshAccessToken throws when OAuth2Strategy.refreshToken fails", async () => {
    oAuthMocks.refreshTokenMock.mockRejectedValue(new Error("refresh failed"));

    const fakeRequest = new Request("https://example.test/refresh-fail");

    await expect(
      refreshAccessToken(fakeRequest, "bad-refresh-token"),
    ).rejects.toThrow("Failed to refresh the access token");

    expect(oAuthMocks.refreshTokenMock).toHaveBeenCalledWith(
      "bad-refresh-token",
    );
    expect(setAuthSession).not.toHaveBeenCalled();
  });

  it("revokeAccessToken succeeds when strategy resolves", async () => {
    oAuthMocks.revokeTokenMock.mockResolvedValue(undefined);

    await revokeAccessToken("token-to-revoke");

    expect(oAuthMocks.revokeTokenMock).toHaveBeenCalledWith("token-to-revoke");
  });

  it("revokeAccessToken returns 500 Response on error", async () => {
    oAuthMocks.revokeTokenMock.mockRejectedValue(new Error("boom"));

    const res = await revokeAccessToken("token-bad");

    expect(oAuthMocks.revokeTokenMock).toHaveBeenCalledWith("token-bad");
    expect(res).toBeInstanceOf(Response);
    // @ts-expect-error Response may be undefined in success case, but here we expect it
    expect(res.status).toBe(500);
  });

  it("verify MagicLinkStrategy callback: calls setAuthSession with provider DEMO and returns AuthenticationResponse", async () => {
    mockedSetAuthSession.mockResolvedValueOnce("demo-cookie-header");

    const strategy = getDemoStrategy();
    const tokens = {
      accessToken: "demo-at",
      expiresAt: Date.now() + 60_000,
      refreshToken: "demo-rt",
    };

    const result = await strategy.verify({ tokens, request: mockRequest });

    expect(setAuthSession).toHaveBeenCalledWith({
      ...tokens,
      request: mockRequest,
      provider: "demo",
    });
    expect(result).toEqual({
      authenticationTokens: tokens,
      sessionCookieHeader: "demo-cookie-header",
      provider: "demo",
    });
  });

  it("getDemoMagicLinkUrl delegates to magicLinkStrategy.getMagicLinkUrl", async () => {
    demoMocks.getMagicLinkUrlMock.mockResolvedValue("https://magic-link-url");

    const url = await getDemoMagicLinkUrl();

    expect(demoMocks.getMagicLinkUrlMock).toHaveBeenCalled();
    expect(url).toBe("https://magic-link-url");
  });

  it("refreshDemoToken calls magicLinkStrategy.refreshAccessToken and returns AuthenticationResponse with provider DEMO", async () => {
    const tokens = {
      accessToken: "new-demo-at",
      expiresAt: Date.now() + 60_000,
      refreshToken: "new-demo-rt",
    };
    demoMocks.refreshAccessTokenMock.mockResolvedValue(tokens);
    mockedSetAuthSession.mockResolvedValueOnce("demo-refresh-cookie");

    const result = await refreshDemoToken(mockRequest, "old-rt");

    expect(demoMocks.refreshAccessTokenMock).toHaveBeenCalledWith("old-rt");
    expect(setAuthSession).toHaveBeenCalledWith({
      ...tokens,
      request: mockRequest,
      provider: "demo",
    });
    expect(result).toEqual({
      authenticationTokens: tokens,
      sessionCookieHeader: "demo-refresh-cookie",
      provider: "demo",
    });
  });
});
