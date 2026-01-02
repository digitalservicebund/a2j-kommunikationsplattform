import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/authSession.server");
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    BRAK_IDP_OIDC_CLIENT_ID: "client-id",
    BRAK_IDP_OIDC_CLIENT_SECRET: "client-secret",
    BRAK_IDP_OIDC_ISSUER: "https://issuer",
    BRAK_IDP_OIDC_REDIRECT_URI: "https://redirect",
  }),
}));

import { setAuthSession } from "../authSession.server";
import {
  AuthenticationProvider,
  type AuthenticationResponse,
  authenticator,
} from "../oAuth.server";

type VerifyArgs = {
  tokens: {
    accessToken: () => string;
    hasRefreshToken: () => boolean;
    refreshToken: () => string;
  };
  request: Request;
};

type StrategyResponse = {
  verify: (a: VerifyArgs) => Promise<AuthenticationResponse>;
};

type AuthWithStrategies = {
  strategies: Map<string, StrategyResponse>;
};

const mockedSetAuthSession = vi.mocked(setAuthSession);

const accessToken = "access-123";
const refreshToken = "refresh-456";

function getBEAStrategy(): StrategyResponse {
  const strategyMap = (authenticator as unknown as AuthWithStrategies)
    .strategies;
  const strategy = strategyMap.get(AuthenticationProvider.BEA);
  if (!strategy) throw new Error("beA strategy not registered");
  return strategy;
}

describe("oAuth.server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTokens = {
    accessToken: () => accessToken,
    refreshToken: () => refreshToken,
    accessTokenExpiresInSeconds: () => 300,
    hasRefreshToken: () => true,
  };
  const mockRequest = new Request("https://example.com/callback");

  it("verify OAuth2Strategy callback: calls setAuthSession and returns AuthenticationResponse ", async () => {
    mockedSetAuthSession.mockResolvedValueOnce("cookie-header-value");

    const strategy = getBEAStrategy();
    const result = await strategy.verify({
      tokens: mockTokens,
      request: mockRequest,
    });

    expect(setAuthSession).toHaveBeenCalledWith({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
      refreshToken: refreshToken,
      request: mockRequest,
    });

    expect(result).toEqual({
      authenticationTokens: {
        accessToken: accessToken,
        expiresAt: expect.any(Number),
        refreshToken: refreshToken,
      },
      sessionCookieHeader: "cookie-header-value",
    });
  });
});
