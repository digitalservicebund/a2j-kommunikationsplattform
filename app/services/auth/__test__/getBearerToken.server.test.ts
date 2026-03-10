import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getBearerToken } from "../getBearerToken.server";
import type { AuthenticationResponse } from "../oAuth.server";

vi.mock("../../api/authorizeToken.server", () => ({
  authorizeToken: vi.fn(),
}));

import { authorizeToken } from "../../api/authorizeToken.server";

const beaAuthData: AuthenticationResponse = {
  authenticationTokens: {
    accessToken: "user-access-token",
    expiresAt: Date.now() + 60_000,
    refreshToken: "refresh-token",
  },
  sessionCookieHeader: "",
  provider: "bea" as const,
};

const demoAuthData: AuthenticationResponse = {
  ...beaAuthData,
  provider: "demo" as const,
};

const devAuthData: AuthenticationResponse = {
  ...beaAuthData,
  provider: "development" as const,
};

describe("getBearerToken", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls authorizeToken and returns access_token for BEA provider", async () => {
    (vi.mocked(authorizeToken) as Mock).mockResolvedValue({
      access_token: "an-api-access-token",
    });

    const token = await getBearerToken(beaAuthData);

    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
    expect(token).toBe("an-api-access-token");
  });

  it("returns accessToken directly for DEMO provider without calling authorizeToken", async () => {
    const token = await getBearerToken(demoAuthData);

    expect(authorizeToken).not.toHaveBeenCalled();
    expect(token).toBe("user-access-token");
  });

  it("returns accessToken directly for DEVELOPMENT provider without calling authorizeToken", async () => {
    const token = await getBearerToken(devAuthData);

    expect(authorizeToken).not.toHaveBeenCalled();
    expect(token).toBe("user-access-token");
  });

  it("propagates errors from authorizeToken", async () => {
    const error = new Error("authorization failed");
    (authorizeToken as unknown as Mock).mockRejectedValue(error);

    await expect(getBearerToken(beaAuthData)).rejects.toThrow(error);
  });
});
