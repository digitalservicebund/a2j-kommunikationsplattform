import { describe, expect, it } from "vitest";
import preselectSafeId from "../preselectSafeId";

const SAFE_ID = "DE.BRAK.own";
const OTHER_SAFE_ID = "DE.BRAK.other";

describe("preselectSafeId", () => {
  it("preselects the user's own SAFE-ID if authorized", () => {
    expect(preselectSafeId(SAFE_ID, [OTHER_SAFE_ID, SAFE_ID])).toBe(SAFE_ID);
  });

  it.each([
    ["has none", null],
    ["isn't authorized", "DE.BRAK.unauthorized"],
  ])(
    "preselects the first authorized SAFE-ID if the user's own %s",
    (_, safeId) => {
      expect(preselectSafeId(safeId, [OTHER_SAFE_ID, SAFE_ID])).toBe(
        OTHER_SAFE_ID,
      );
    },
  );

  it("preselects nothing without authorized SAFE-IDs", () => {
    expect(preselectSafeId(SAFE_ID, [])).toBe("");
  });
});
