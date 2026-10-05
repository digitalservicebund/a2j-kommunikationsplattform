import { makeAuthSession } from "tests/utils/factories/authSession";
import { describe, expect, test } from "vitest";
import {
  requireAuthAndVerfahrenId,
  requireAuthSession,
  requireVerfahrenId,
} from "../routeContext.server";

// Mock the `betterAuth()` function (called by the indirectly imported
// `betterAuth.server.ts`)  as otherwise it attempts to fetch from the OpenID
// Connect discovery URLs to resolve the authorization and token endpoints.
vi.mock("better-auth", () => ({
  betterAuth: () => {},
}));

describe("routeContext helpers", () => {
  test("requireAuthSession returns auth data", () => {
    const context = {
      get: () => makeAuthSession(),
    };

    const result = requireAuthSession(context, "loader");

    expect(result).toEqual(makeAuthSession());
  });

  test("requireAuthSession throws when auth data is missing", () => {
    const context = {
      get: () => undefined,
    };

    expect(() => requireAuthSession(context, "action")).toThrow(
      "No auth data available in action",
    );
  });

  test("requireVerfahrenId returns route param id", () => {
    expect(requireVerfahrenId({ id: "v-1" }, "loader")).toBe("v-1");
  });

  test("requireVerfahrenId throws when id is missing", () => {
    expect(() => requireVerfahrenId({}, "loader")).toThrow(
      "id is missing in loader",
    );
  });

  test("requireAuthAndVerfahrenId returns both values", () => {
    const context = {
      get: () => makeAuthSession(),
    };

    const result = requireAuthAndVerfahrenId(context, { id: "v-2" }, "action");

    expect(result).toEqual({
      authSession: makeAuthSession(),
      verfahrenId: "v-2",
    });
  });
});
