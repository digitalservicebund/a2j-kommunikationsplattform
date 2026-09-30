import { describe, expect, it } from "vitest";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import findOpenEinreichung, { isEinreichungOpen } from "../findOpenEinreichung";

function entry(id: string, status: Einreichung["status"], erstelltAm: string) {
  return { id, einreichung: { status, erstelltAm } };
}

describe("isEinreichungOpen", () => {
  it.each(["ERSTELLT", "FEHLGESCHLAGEN"] as const)(
    "treats %s as open",
    (status) => {
      expect(isEinreichungOpen({ status })).toBe(true);
    },
  );

  it.each([
    "EINGEREICHT",
    "BEANTRAGT",
    "VERSENDET",
    "VERAKTET",
    "GELOESCHT",
  ] as const)("treats %s as not open", (status) => {
    expect(isEinreichungOpen({ status })).toBe(false);
  });
});

describe("findOpenEinreichung", () => {
  it("returns undefined when no Einreichung is open", () => {
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-01T00:00:00.000Z",
    );

    expect(findOpenEinreichung([submitted])).toBeUndefined();
  });

  it("returns the open Einreichung", () => {
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-01T00:00:00.000Z",
    );
    const draft = entry("draft", "FEHLGESCHLAGEN", "2026-09-02T00:00:00.000Z");

    expect(findOpenEinreichung([submitted, draft])).toBe(draft);
  });

  it("picks the newest open Einreichung regardless of the list order", () => {
    const older = entry("older", "ERSTELLT", "2026-09-02T00:00:00.000Z");
    const newer = entry("newer", "ERSTELLT", "2026-09-03T00:00:00.000Z");
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-04T00:00:00.000Z",
    );

    expect(findOpenEinreichung([older, submitted, newer])).toBe(newer);
  });
});
