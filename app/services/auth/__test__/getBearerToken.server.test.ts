import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getBearerToken } from "../getBearerToken.server";

// mock module dependencies
vi.mock("../../api/authorizeToken.server", () => ({
  authorizeToken: vi.fn(),
}));
vi.mock("../session.server", () => ({
  getUserSession: vi.fn(),
}));

// import mocks after vi.mock calls so TS sees mocked shapes
import { authorizeToken } from "../../api/authorizeToken.server";
import { getUserSession } from "../session.server";

describe("getBearerToken", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a bearer token", async () => {
    const req = new Request("https://cool.auth/request");
    (vi.mocked(getUserSession) as Mock).mockResolvedValue({
      accessToken: "user-access-token",
    });
    (vi.mocked(authorizeToken) as Mock).mockResolvedValue({
      access_token: "an-api-access-token",
    });

    const bearerToken = await getBearerToken(req);
    expect(getUserSession).toHaveBeenCalledWith(req);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
    expect(bearerToken).toBe("an-api-access-token");
  });

  it("propagates errors from getUserSession", async () => {
    const req = new Request("https://another.cool/failing/request/");
    const error = new Error("could not get user session data");
    (getUserSession as unknown as Mock).mockRejectedValue(error);

    await expect(getBearerToken(req)).rejects.toThrow(error);
    expect(authorizeToken).not.toHaveBeenCalled();
  });

  it("propagates errors from authorizeToken", async () => {
    const req = new Request("https://and.a.cool/request/that/fails");
    (getUserSession as unknown as Mock).mockResolvedValue({
      accessToken: "user-access-token",
    });
    const error = new Error("authorization failed");
    (authorizeToken as unknown as Mock).mockRejectedValue(error);

    await expect(getBearerToken(req)).rejects.toThrow(error);
    expect(authorizeToken).toHaveBeenCalledWith("user-access-token");
  });
});
