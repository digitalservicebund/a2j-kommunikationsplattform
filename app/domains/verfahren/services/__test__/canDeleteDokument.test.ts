import { describe, expect, it } from "vitest";
import canDeleteDokument from "../canDeleteDokument";

const klageeinreichung = { name: "Klageeinreichung" };
const weitereEinreichung = { name: "Schriftsatz" };

describe("canDeleteDokument", () => {
  describe("in the Klageeinreichung", () => {
    it.each(["XJUSTIZ", "SCHRIFTSTUECK"] as const)(
      "protects %s dokumente from deletion",
      (typ) => {
        expect(canDeleteDokument({ typ }, klageeinreichung)).toBe(false);
      },
    );

    it.each(["ANHANG", "SIGNATURDATEI"] as const)(
      "allows deleting %s dokumente",
      (typ) => {
        expect(canDeleteDokument({ typ }, klageeinreichung)).toBe(true);
      },
    );
  });

  describe("in a Weitere Einreichung", () => {
    it("protects the auto-managed XJustiz-Dokument from deletion", () => {
      expect(canDeleteDokument({ typ: "XJUSTIZ" }, weitereEinreichung)).toBe(
        false,
      );
    });

    it.each(["SCHRIFTSTUECK", "ANHANG", "SIGNATURDATEI"] as const)(
      "allows deleting %s dokumente",
      (typ) => {
        expect(canDeleteDokument({ typ }, weitereEinreichung)).toBe(true);
      },
    );
  });
});
