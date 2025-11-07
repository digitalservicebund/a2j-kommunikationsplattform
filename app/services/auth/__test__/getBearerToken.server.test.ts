import { createSession, Session } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { getBearerToken } from "../getBearerToken.server";

describe("getAccessToken", () => {
  let session: Session;
  const mockRequest = new Request("https://example.com");
  const mockToken = "test-access-token";

  beforeEach(() => {
    session = createSession();
  });

  it("returns access token if session is valid and not expired", async () => {
    // Set up session with valid token and future expiration
    session.set("apiAccessToken", mockToken);
    session.set(
      "apiAcessExpiresAt",
      new Date(Date.now() + 3600000).toISOString(), // 1 hour in future
    );

    const token = await getBearerToken(mockRequest);
    expect(token).toBe(mockToken);
  });

  it("throws error when access token is expired", async () => {
    // Set up session with expired token
    session.set("apiAccessToken", mockToken);
    session.set(
      "apiAcessExpiresAt",
      new Date(Date.now() - 3600000).toISOString(), // 1 hour in past
    );

    console.log("session", session.data);

    // await expect(getBearerToken(mockRequest, session, mockHeaders)).toBe("XXX");

    await expect(getBearerToken(mockRequest)).resolves.toBe("XXX");
  });

  it("returns XXX when token refresh is needed", async () => {
    // Set up session with expired token to trigger refresh flow
    session.set("apiAccessToken", mockToken);
    session.set(
      "apiAcessExpiresAt",
      new Date(Date.now() - 3600000).toISOString(), // 1 hour in past
    );

    const token = await getBearerToken(mockRequest);
    expect(token).toBe("XXX");
  });
});
