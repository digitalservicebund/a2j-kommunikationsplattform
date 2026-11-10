import { describe, expect, it } from "vitest";
import isVerfahrenDraft from "../isVerfahrenDraft";

describe("isVerfahrenDraft", () => {
  it("is true for an ERSTELLT Verfahren whose Einreichungen are all drafts", () => {
    expect(
      isVerfahrenDraft({ status: "ERSTELLT" }, [
        { status: "ERSTELLT" },
        { status: "FEHLGESCHLAGEN" },
      ]),
    ).toBe(true);
  });

  it("is true for an ERSTELLT Verfahren without Einreichungen", () => {
    expect(isVerfahrenDraft({ status: "ERSTELLT" }, [])).toBe(true);
  });

  it.each([
    "EINGEREICHT",
    "GERICHTSVERFAHRENANGELEGT",
    "GELOESCHT",
    "ABGESCHLOSSEN",
  ] as const)("is false for a %s Verfahren", (status) => {
    expect(isVerfahrenDraft({ status }, [{ status: "ERSTELLT" }])).toBe(false);
  });

  it.each([
    "EINGEREICHT",
    "BEANTRAGT",
    "VERSENDET",
    "VERAKTET",
    "GELOESCHT",
  ] as const)(
    "is false for an ERSTELLT Verfahren with a %s Einreichung",
    (status) => {
      expect(
        isVerfahrenDraft({ status: "ERSTELLT" }, [
          { status: "ERSTELLT" },
          { status },
        ]),
      ).toBe(false);
    },
  );
});
