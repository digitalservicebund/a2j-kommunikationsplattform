import { describe, expect, it } from "vitest";
import isKlageeinreichung from "../isKlageeinreichung";

describe("isKlageeinreichung", () => {
  it("identifies the Einreichung that initiates the claim by its name", () => {
    expect(isKlageeinreichung({ name: "Klageeinreichung" })).toBe(true);
  });

  it("treats every other Einreichung as a weitere Einreichung", () => {
    expect(isKlageeinreichung({ name: "Schriftsatz" })).toBe(false);
  });
});
