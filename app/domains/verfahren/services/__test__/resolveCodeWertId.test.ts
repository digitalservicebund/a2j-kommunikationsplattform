import { describe, expect, it } from "vitest";
import resolveCodeWertId from "../resolveCodeWertId";

const elemente = [
  { id: "id-1", wert: "Deutschland", code: "000" },
  { id: "id-2", wert: "Österreich", code: "151" },
];

describe("resolveCodeWertId", () => {
  it("returns the id of the entry matching the given code", () => {
    expect(resolveCodeWertId(elemente, "151")).toBe("id-2");
  });

  it("throws when no entry matches the given code", () => {
    expect(() => resolveCodeWertId(elemente, "999")).toThrow(
      'No code list entry found for code "999".',
    );
  });
});
