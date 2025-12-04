import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authorizeToken } from "../../api/authorizeToken.server";
import { getBearerToken } from "../getBearerToken.server";
import { getUserSession, updateUserSession } from "../session.server";

// Mock dependencies
vi.mock("../../api/authorizeToken.server");
vi.mock("../../api/refreshToken.server");
vi.mock("../session.server");

describe.skip("getBearerToken", () => {
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
      expiresIn: 300, // 5 mins
      refreshToken: "refresh-token",
    });

    const token = await getBearerToken(mockRequest);

    expect(token).toBe("existing-token");
    expect(authorizeToken).not.toHaveBeenCalled();
  });

  it("exchanges access token when no API token exists", async () => {
    // Mock session without API token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "user-access-token",
      expiresIn: 300, // 5 mins
      refreshToken: "refresh-token",
    });

    vi.mocked(authorizeToken).mockResolvedValue(mockToken);

    const token = await getBearerToken(mockRequest);

    expect(token).toBe(mockToken.access_token);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
    expect(updateUserSession).toHaveBeenCalledWith({
      accessToken: mockToken.access_token,
      expiresIn: Number(mockToken.expires_in),
      refreshToken: mockToken.refresh_token,
      request: mockRequest,
    });
  });

  it("refreshes token when API access token is expired", async () => {
    // Mock session with expired token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "user-access-token",
      expiresIn: 300, // 5 mins
      refreshToken: "refresh-token",
    });

    const token = await getBearerToken(mockRequest);

    expect(token).toBe(mockToken.access_token);
    expect(updateUserSession).toHaveBeenCalledWith({
      accessToken: mockToken.access_token,
      expiresIn: Number(mockToken.expires_in),
      refreshToken: mockToken.refresh_token,
      request: mockRequest,
    });
  });

  it("throws error when refresh token exchange fails", async () => {
    // Mock session with expired token
    vi.mocked(getUserSession).mockResolvedValue({
      accessToken: "XXX",
      expiresIn: 300,
      refreshToken: "expired-token",
    });

    const mockError = new Error("Refresh token invalid");

    await expect(getBearerToken(mockRequest)).rejects.toThrow(mockError);
  });

  it("throws error when no session exists", async () => {
    vi.mocked(getUserSession).mockResolvedValue(null);

    await expect(getBearerToken(mockRequest)).rejects.toThrow();
  });
});
