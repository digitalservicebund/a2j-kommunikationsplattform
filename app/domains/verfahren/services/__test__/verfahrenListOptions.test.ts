import { describe, expect, it } from "vitest";
import { toSortQueryValue } from "../verfahrenListOptions";

describe("toSortQueryValue", () => {
  it("maps the camelCase sort value to the snake_case wire value", () => {
    expect(toSortQueryValue("eingereichtAm")).toBe("eingereicht_am");
    expect(toSortQueryValue("aktenzeichenGericht")).toBe(
      "aktenzeichen_gericht",
    );
  });

  it("preserves the leading '-' for descending sort values", () => {
    expect(toSortQueryValue("-eingereichtAm")).toBe("-eingereicht_am");
    expect(toSortQueryValue("-aktenzeichenGericht")).toBe(
      "-aktenzeichen_gericht",
    );
  });
});
