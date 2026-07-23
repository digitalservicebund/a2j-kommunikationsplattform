import { describe, expect, test } from "vitest";
import {
  requireAuthAndVerfahrenId,
  requireAuthData,
  requireVerfahrenId,
} from "../routeContext.server";
import { mockAuthData } from "./helpers";

describe("routeContext helpers", () => {
  test("requireAuthData returns auth data", () => {
    const context = {
      get: () => mockAuthData,
    };

    const result = requireAuthData(context, "loader");

    expect(result).toEqual(mockAuthData);
  });

  test("requireAuthData throws when auth data is missing", () => {
    const context = {
      get: () => undefined,
    };

    expect(() => requireAuthData(context, "action")).toThrow(
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
      get: () => mockAuthData,
    };

    const result = requireAuthAndVerfahrenId(context, { id: "v-2" }, "action");

    expect(result).toEqual({
      authData: mockAuthData,
      verfahrenId: "v-2",
    });
  });
});
