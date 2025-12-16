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

import {
  AuthenticationProvider,
  authenticator,
  type AuthenticationResponse,
} from "~/services/auth/oAuth.server";
import { setAuthSession } from "../authSession.server";

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

const mockedSetUpdateSession = vi.mocked(setAuthSession);

const requestURL = "http://localhost/oauth-test";
const accessToken = "test-access-token-oauth";
const refreshToken = "test-refresh-token-oauth";
const hasRefreshToken = true;
const accessTokenExpiresInSeconds = 300;

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

  const mockRequest = new Request(`${requestURL}/callback`);
  const mockTokens = {
    accessToken: () => accessToken,
    refreshToken: () => refreshToken,
    hasRefreshToken: () => hasRefreshToken,
    accessTokenExpiresInSeconds: () => accessTokenExpiresInSeconds,
  };

  it("returns AuthenticationResponse with session cookie", async () => {
    console.log("test 1");
    mockedSetUpdateSession.mockResolvedValueOnce("mock-cookie");

    const strategy = getBEAStrategy();
    const result = await strategy.verify({
      tokens: mockTokens,
      request: mockRequest,
    });

    expect(result).toEqual({
      authenticationTokens: {
        accessToken: accessToken,
        expiresAt: expect.any(Number),
        refreshToken: refreshToken,
      },
      sessionCookieHeader: "mock-cookie",
    });
    expect(setAuthSession).toHaveBeenCalledWith({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
      refreshToken: refreshToken,
      request: mockRequest,
    });
  });

  it("throws error if setAuthSession fails", async () => {
    console.log("test 2");
    mockedSetUpdateSession.mockRejectedValueOnce(new Error("fail"));
    const strategy = getBEAStrategy();

    await expect(
      strategy.verify({ tokens: mockTokens, request: mockRequest }),
    ).rejects.toThrow("fail");
  });
});
