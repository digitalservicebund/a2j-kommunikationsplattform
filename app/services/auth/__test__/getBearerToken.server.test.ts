import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authorizeToken } from "../../api/authorizeToken.server";
import { refreshAccessToken } from "../../api/refreshToken.server";
import { getBearerToken } from "../getBearerToken.server";
import {
  getUserSession,
  updateUserSessionWithApiTokens,
} from "../session.server";

// Mock dependencies
vi.mock("../../api/authorizeToken.server");
vi.mock("../../api/refreshToken.server");
vi.mock("../session.server");

describe("getBearerToken", () => {
  const mockRequest = new Request("https://example.com");
  const mockToken = {
    access_token: "mock-access-token",
    expires_in: 3600,
    refresh_token: "mock-refresh-token",
    refresh_expires_in: 86400,
    token_type: "Bearer",
    "not-before-policy": 0,
    session_state: "a5d3fb",
    scope: "write",
    issued_token_type: "urn:ietf",
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns existing valid API access token", async () => {
    // Mock session with valid token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "user-access-token",
      expiresAt: Number(Date.now() + 300), // 5 mins
      apiAccessToken: "existing-token",
      apiAccessExpiresAt: Number(Date.now() + 300), // 5 mins
      apiRefreshToken: "refresh-token",
      apiRefreshExpiresAt: Number(Date.now() + 1800), // 30 mins
    });

    const token = await getBearerToken(mockRequest);

    expect(token).toBe("existing-token");
    expect(authorizeToken).not.toHaveBeenCalled();
    expect(refreshAccessToken).not.toHaveBeenCalled();
  });

  it("exchanges access token when no API token exists", async () => {
    // Mock session without API token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "user-access-token",
      expiresAt: Number(Date.now() + 300), // 5 mins
      apiAccessToken: "",
      apiAccessExpiresAt: 0, // 5 mins
      apiRefreshToken: "",
      apiRefreshExpiresAt: 0, // 30 mins
    });

    vi.mocked(authorizeToken).mockResolvedValue(mockToken);

    const token = await getBearerToken(mockRequest);

    expect(token).toBe(mockToken.access_token);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
    expect(updateUserSessionWithApiTokens).toHaveBeenCalledWith({
      apiAccessToken: mockToken.access_token,
      apiAccessExpiresAt: Number(mockToken.expires_in),
      apiRefreshToken: mockToken.refresh_token,
      apiRefreshExpiresAt: Number(mockToken.refresh_expires_in),
      request: mockRequest,
    });
  });

  it("refreshes token when API access token is expired", async () => {
    // Mock session with expired token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "user-access-token",
      expiresAt: Number(Date.now() + 300), // 5 mins
      apiAccessToken: "expired-token",
      apiAccessExpiresAt: Number(Date.now() - 100), // 5 mins
      apiRefreshToken: "refresh-token",
      apiRefreshExpiresAt: Number(Date.now() + 1800 - 100), // 30 mins
    });

    vi.mocked(refreshAccessToken).mockResolvedValue(mockToken);

    const token = await getBearerToken(mockRequest);

    expect(token).toBe(mockToken.access_token);
    expect(refreshAccessToken).toHaveBeenCalledWith("refresh-token");
    expect(updateUserSessionWithApiTokens).toHaveBeenCalledWith({
      apiAccessToken: mockToken.access_token,
      apiAccessExpiresAt: Number(mockToken.expires_in),
      apiRefreshToken: mockToken.refresh_token,
      apiRefreshExpiresAt: Number(mockToken.refresh_expires_in),
      request: mockRequest,
    });
  });

  it("throws error when refresh token exchange fails", async () => {
    // Mock session with expired token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "XXX",
      expiresAt: 300,
      apiAccessToken: "expired-token",
      apiAccessExpiresAt: Number(Date.now() - 300), // 5 mins
      apiRefreshToken: "invalid-refresh-token",
      apiRefreshExpiresAt: 1800,
    });

    const mockError = new Error("Refresh token invalid");
    vi.mocked(refreshAccessToken).mockRejectedValue(mockError);

    await expect(getBearerToken(mockRequest)).rejects.toThrow(mockError);
  });

  it("throws error when no session exists", async () => {
    vi.mocked(getUserSession).mockResolvedValue(null);

    await expect(getBearerToken(mockRequest)).rejects.toThrow();
  });
});
