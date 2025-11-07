import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { exchangeToken } from "../tokenExchange.server";

// Mock the serverConfig
vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    KOMPLA_IDP_ISSUER: "https://mock-idp",
    KOMPLA_IDP_CLIENT_ID: "mock-client-id",
    KOMPLA_IDP_SUBJECT_ISSUER: "mock-subject-issuer",
  }),
}));

describe("exchangeToken", () => {
  const mockResponse: Response = {
    ok: true,
    json: vi.fn().mockResolvedValue({
      access_token: "mock-access-token",
      expires_in: 300,
      refresh_expires_in: 1800,
      refresh_token: "mock-refresh-token",
      token_type: "Bearer",
      "not-before-policy": "0",
      session_state: "mock-session",
      scope: "kompla-api",
      issued_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
    }),
    text: vi.fn().mockResolvedValue(""),
  } as unknown as Response;

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should exchange token successfully", async () => {
    const idpAccessToken = "test-token";
    const result = await exchangeToken(idpAccessToken);

    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      "https://mock-idp/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: expect.any(String),
      },
    );

    // Verify the request body contains all required parameters
    const fetchCall = vi.mocked(global.fetch).mock.calls[0];
    const requestBody = new URLSearchParams(fetchCall[1]?.body as string);
    expect(requestBody.get("grant_type")).toBe(
      "urn:ietf:params:oauth:grant-type:token-exchange",
    );
    expect(requestBody.get("requested_token_type")).toBe(
      "urn:ietf:params:oauth:token-type:refresh_token",
    );
    expect(requestBody.get("clientId")).toBe("mock-client-id");
    expect(requestBody.get("subject_issuer")).toBe("mock-subject-issuer");
    expect(requestBody.get("scope")).toBe("kompla-api");
    expect(requestBody.get("subject_token")).toBe(idpAccessToken);

    // Verify that the expected tokens are present in the result
    expect(result.access_token).toBe("mock-access-token");
    expect(result.refresh_token).toBe("mock-refresh-token");
  });

  it("should throw error when request fails", async () => {
    const errorResponse = {
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue("Bad Request"),
    } as unknown as Response;

    global.fetch = vi.fn().mockResolvedValue(errorResponse);

    await expect(exchangeToken("test-token")).rejects.toThrow(
      "Token exchange failed: 400 Bad Request",
    );
  });
});
