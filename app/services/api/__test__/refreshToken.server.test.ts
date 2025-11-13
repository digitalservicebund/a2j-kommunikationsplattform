import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { refreshAccessToken } from "../refreshToken.server";

// Mock serverConfig
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    KOMPLA_IDP_ISSUER: "https://mock-idp",
    KOMPLA_IDP_CLIENT_ID: "mock-client-id",
    KOMPLA_IDP_SUBJECT_ISSUER: "mock-subject-issuer",
  }),
}));

describe("refreshAccessToken", () => {
  const mockResponse = {
    access_token: "new-access-token",
    expires_in: 3600,
    refresh_expires_in: 86400,
    refresh_token: "new-refresh-token",
    token_type: "Bearer",
    "not-before-policy": 0,
    session_state: "mock-session",
    scope: "kompla-api",
  };

  beforeEach(() => {
    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should successfully refresh an access token", async () => {
    // Mock successful response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await refreshAccessToken("old-refresh-token");

    // Verify the fetch call
    expect(fetch).toHaveBeenCalledWith(
      "https://mock-idp/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: expect.any(String),
      },
    );

    // Verify the request parameters
    const fetchCall = vi.mocked(fetch).mock.calls[0];
    const requestBody = new URLSearchParams(fetchCall[1]?.body as string);
    expect(requestBody.get("grant_type")).toBe("refresh_token");
    expect(requestBody.get("requested_token_type")).toBe(
      "urn:ietf:params:oauth:token-type:refresh_token",
    );
    expect(requestBody.get("clientId")).toBe("mock-client-id");
    expect(requestBody.get("subject_issuer")).toBe("mock-subject-issuer");
    expect(requestBody.get("scope")).toBe("kompla-api");
    expect(requestBody.get("refresh_token")).toBe("old-refresh-token");

    // Verify the response
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the refresh token request fails", async () => {
    // Mock failed response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: () => Promise.resolve("Invalid refresh token"),
    });

    // Verify error handling
    await expect(refreshAccessToken("invalid-token")).rejects.toThrow(
      "Refresh token request failed: 400 Invalid refresh token",
    );
  });
});
