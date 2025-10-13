import { describe, it, vi } from "vitest";
import { loginAsDeveloper } from "~/mocks/auth/mockAuth.server";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/auth/oAuth.server";
import { createUserSession } from "~/services/auth/session.server";

vi.mock("~/services/auth/session.server");
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    BRAK_IDP_OIDC_CLIENT_ID: "client-id",
    BRAK_IDP_OIDC_CLIENT_SECRET: "client-secret",
    BRAK_IDP_OIDC_ISSUER: "https://issuer",
    BRAK_IDP_OIDC_REDIRECT_URI: "https://redirect",
  }),
}));

describe("aAuth.server", () => {
  describe("loginAsDeveloper", () => {
    const mockRequest = {} as Request;
    const mockedCreateUserSession = vi.mocked(createUserSession);

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("redirects to /prototype/verfahren with correct cookie", async () => {
      mockedCreateUserSession.mockResolvedValue("session-cookie");
      const response = await loginAsDeveloper(mockRequest);

      expect(response).toBeInstanceOf(Response);
      expect(response?.status).toBe(302);
      expect(response?.headers.get("Location")).toBe("/");
      expect(response?.headers.get("Set-Cookie")).toContain("session-cookie");
    });

    it("returns undefined if sessionCookieHeader is falsy", async () => {
      mockedCreateUserSession.mockResolvedValue("");
      const response = await loginAsDeveloper(mockRequest);

      expect(response).toBeUndefined();
    });

    it("returns 500 response on error", async () => {
      mockedCreateUserSession.mockRejectedValue(new Error("error"));
      const response = await loginAsDeveloper(mockRequest);

      expect(response).toBeInstanceOf(Response);
      expect(response?.status).toBe(500);
      const text = await response?.text();
      expect(text).toBe("Dev login failed");
    });
  });
  describe("OAuth2Strategy callback", () => {
    const mockRequest = {} as Request;
    const mockTokens = {
      accessToken: () => "mock-access-token",
    };

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("returns AuthenticationResponse with session cookie", async () => {
      vi.mocked(createUserSession).mockResolvedValue("mock-cookie");
      const strategy = authenticator.strategies.get(AuthenticationProvider.BEA);
      expect(strategy).toBeDefined();

      const callback = strategy.verify;
      const result = await callback({
        tokens: mockTokens,
        request: mockRequest,
      });

      expect(result).toEqual({
        authenticationContext: {
          accessToken: "mock-access-token",
          expiresAt: expect.any(Number),
        },
        sessionCookieHeader: "mock-cookie",
      });
      expect(createUserSession).toHaveBeenCalledWith(
        "mock-access-token",
        expect.any(Number),
        mockRequest,
      );
    });

    it("throws error if createUserSession fails", async () => {
      vi.mocked(createUserSession).mockRejectedValue(new Error("fail"));
      const strategy = authenticator.strategies.get(AuthenticationProvider.BEA);
      const callback = strategy.verify;

      await expect(
        callback({ tokens: mockTokens, request: mockRequest }),
      ).rejects.toThrow("fail");
    });
  });
});
