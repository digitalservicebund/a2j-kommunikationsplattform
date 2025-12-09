import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/session.server");
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    BRAK_IDP_OIDC_CLIENT_ID: "client-id",
    BRAK_IDP_OIDC_CLIENT_SECRET: "client-secret",
    BRAK_IDP_OIDC_ISSUER: "https://issuer",
    BRAK_IDP_OIDC_REDIRECT_URI: "https://redirect",
  }),
}));

import { loginAsDeveloper } from "~/mocks/auth/mockAuth.server";
import {
  AuthenticationProvider,
  authenticator,
  type AuthenticationResponse,
} from "~/services/auth/oAuth.server";
import { createUserSession } from "~/services/auth/session.server";

type VerifyArgs = {
  tokens: { accessToken: () => string; hasRefreshToken: () => boolean };
  request: Request;
};
type StrategyResponse = {
  verify: (a: VerifyArgs) => Promise<AuthenticationResponse>;
};
type AuthWithStrategies = {
  strategies: Map<string, StrategyResponse>;
};

const mockedCreateUserSession = vi.mocked(createUserSession);

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

describe.skip("oAuth.server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loginAsDeveloper", () => {
    const mockRequest = new Request(`${requestURL}/dev-login`);

    it("redirects to / with correct cookie", async () => {
      mockedCreateUserSession.mockResolvedValueOnce("session-cookie");
      const response = await loginAsDeveloper(mockRequest);

      expect(response).toBeInstanceOf(Response);
      expect(response?.status).toBe(302);
      expect(response?.headers.get("Location")).toBe("/");
      expect(response?.headers.get("Set-Cookie")).toContain("session-cookie");
    });

    it("returns undefined if sessionCookieHeader is falsy", async () => {
      mockedCreateUserSession.mockResolvedValueOnce("");
      const response = await loginAsDeveloper(mockRequest);
      expect(response).toBeUndefined();
    });

    it("returns 500 response on error", async () => {
      mockedCreateUserSession.mockRejectedValueOnce(new Error("error"));
      const response = await loginAsDeveloper(mockRequest);

      expect(response).toBeInstanceOf(Response);
      expect(response?.status).toBe(500);
      await expect(response?.text()).resolves.toBe("Dev login failed");
    });
  });

  describe("OAuth2Strategy callback", () => {
    const mockRequest = new Request(`${requestURL}/callback`);
    const mockTokens = {
      accessToken: () => accessToken,
      hasRefreshToken: () => hasRefreshToken,
      accessTokenExpiresInSeconds: () => accessTokenExpiresInSeconds,
    };

    it("returns AuthenticationResponse with session cookie", async () => {
      mockedCreateUserSession.mockResolvedValueOnce("mock-cookie");

      const strategy = getBEAStrategy();
      const result = await strategy.verify({
        tokens: mockTokens,
        request: mockRequest,
      });

      expect(result).toEqual({
        authenticationTokens: {
          accessToken: accessToken,
          expiresIn: expect.any(Number),
          refreshToken: refreshToken,
        },
        sessionCookieHeader: "mock-cookie",
      });
      expect(createUserSession).toHaveBeenCalledWith(
        accessToken,
        expect.any(Number),
        mockRequest,
      );
    });

    it("throws error if createUserSession fails", async () => {
      mockedCreateUserSession.mockRejectedValueOnce(new Error("fail"));
      const strategy = getBEAStrategy();

      await expect(
        strategy.verify({ tokens: mockTokens, request: mockRequest }),
      ).rejects.toThrow("fail");
    });
  });
});
