import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getBearerToken } from "../getBearerToken.server";
import type { AuthenticationResponse } from "../oAuth.server";

// mock module dependencies
vi.mock("../../api/authorizeToken.server", () => ({
  authorizeToken: vi.fn(),
}));

// import mocks after vi.mock calls so TS sees mocked shapes
import { authorizeToken } from "../../api/authorizeToken.server";

const mockAuthData: AuthenticationResponse = {
  authenticationTokens: {
    accessToken: "user-access-token",
    expiresAt: Date.now() + 60000,
    refreshToken: "refresh-token",
  },
  sessionCookieHeader: "",
};

describe("getBearerToken", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a bearer token", async () => {
    (vi.mocked(authorizeToken) as Mock).mockResolvedValue({
      access_token: "an-api-access-token",
    });

    const bearerToken = await getBearerToken(mockAuthData);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
    expect(bearerToken).toBe("an-api-access-token");
  });

  it("propagates errors from authorizeToken", async () => {
    const error = new Error("authorization failed");
    (authorizeToken as unknown as Mock).mockRejectedValue(error);

    await expect(getBearerToken(mockAuthData)).rejects.toThrow(error);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
  });
});
