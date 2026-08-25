import { describe, expect, it } from "vitest";
import canDeleteDokument from "../canDeleteDokument";

describe("canDeleteDokument", () => {
  it("protects Schriftstück dokumente from deletion", () => {
    expect(canDeleteDokument({ typ: "SCHRIFTSTUECK" })).toBe(false);
  });

  it("protects the auto-managed XJustiz-Dokument from deletion", () => {
    expect(canDeleteDokument({ typ: "XJUSTIZ" })).toBe(false);
  });

  it.each(["ANHANG", "SIGNATURDATEI"] as const)(
    "allows deleting %s dokumente",
    (typ) => {
      expect(canDeleteDokument({ typ })).toBe(true);
    },
  );
});
