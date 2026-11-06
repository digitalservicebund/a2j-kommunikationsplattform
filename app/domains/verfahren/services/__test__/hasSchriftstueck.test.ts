import { describe, expect, it } from "vitest";
import hasSchriftstueck from "../hasSchriftstueck";

describe("hasSchriftstueck", () => {
  it("finds a Schriftstück among other Dokumente", () => {
    expect(
      hasSchriftstueck([
        { typ: "XJUSTIZ" },
        { typ: "ANHANG" },
        { typ: "SCHRIFTSTUECK" },
      ]),
    ).toBe(true);
  });

  it.each([
    ["no Dokumente", []],
    ["only Anlagen and the XJustiz", [{ typ: "XJUSTIZ" }, { typ: "ANHANG" }]],
  ] as const)("is false for %s", (_, dokumente) => {
    expect(hasSchriftstueck(dokumente)).toBe(false);
  });
});
