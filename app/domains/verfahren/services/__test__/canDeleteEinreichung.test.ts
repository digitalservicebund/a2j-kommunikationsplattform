import { describe, expect, it } from "vitest";
import canDeleteEinreichung from "../canDeleteEinreichung";

describe("canDeleteEinreichung", () => {
  it.each(["ERSTELLT", "FEHLGESCHLAGEN"] as const)(
    "allows deleting a %s Weitere Einreichung",
    (status) => {
      expect(canDeleteEinreichung({ name: "Schriftsatz", status })).toBe(true);
    },
  );

  it.each(["EINGEREICHT", "BEANTRAGT", "VERSENDET", "VERAKTET"] as const)(
    "protects a %s Weitere Einreichung",
    (status) => {
      expect(canDeleteEinreichung({ name: "Schriftsatz", status })).toBe(false);
    },
  );

  it("protects the Klageeinreichung, even as a draft", () => {
    expect(
      canDeleteEinreichung({ name: "Klageeinreichung", status: "ERSTELLT" }),
    ).toBe(false);
  });
});
