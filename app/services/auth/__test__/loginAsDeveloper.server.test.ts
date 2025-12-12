import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { loginAsDeveloper } from "../loginAsDeveloper.server";

// mock module dependencies
vi.mock("../session.server", () => ({
  setSession: vi.fn(),
}));

// import mocks after vi.mock calls so TS sees mocked shapes
import { setSession } from "../session.server";

const testRequest = new Request("https://a.login/request");
const happyPathResponse = new Response(null, {
  status: 302,
  headers: {
    Location: "/",
    "Set-Cookie": "a-cookie-value",
  },
});
const unhappyPathResponse = new Response(null, {
  status: 500,
});

describe("loginAsDeveloper", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets session cookie header for local development", async () => {
    (vi.mocked(setSession) as Mock).mockResolvedValue("a-cookie-value");

    const result = await loginAsDeveloper(testRequest);

    expect(setSession).toHaveBeenCalled();
    expect(result).toStrictEqual(happyPathResponse);
  });

  it("throws error when something went wrong", async () => {
    const error = new Error("could not set session data");
    (setSession as unknown as Mock).mockRejectedValue(error);

    const result = await loginAsDeveloper(testRequest);

    expect(result).toStrictEqual(unhappyPathResponse);
  });
});
