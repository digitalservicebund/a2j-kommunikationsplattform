import { describe, expect, it } from "vitest";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import findEinreichungDraft, {
  isEinreichungDraft,
} from "../findEinreichungDraft.ts";

function entry(id: string, status: Einreichung["status"], erstelltAm: string) {
  return { id, einreichung: { status, erstelltAm } };
}

describe("isEinreichungDraft", () => {
  it.each(["ERSTELLT", "FEHLGESCHLAGEN"] as const)(
    "treats %s as open",
    (status) => {
      expect(isEinreichungDraft({ status })).toBe(true);
    },
  );

  it.each([
    "EINGEREICHT",
    "BEANTRAGT",
    "VERSENDET",
    "VERAKTET",
    "GELOESCHT",
  ] as const)("treats %s as not open", (status) => {
    expect(isEinreichungDraft({ status })).toBe(false);
  });
});

describe("findEinreichungDraft", () => {
  it("returns undefined when no Einreichung is open", () => {
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-01T00:00:00.000Z",
    );

    expect(findEinreichungDraft([submitted])).toBeUndefined();
  });

  it("returns the open Einreichung", () => {
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-01T00:00:00.000Z",
    );
    const draft = entry("draft", "FEHLGESCHLAGEN", "2026-09-02T00:00:00.000Z");

    expect(findEinreichungDraft([submitted, draft])).toBe(draft);
  });

  it("picks the newest open Einreichung regardless of the list order", () => {
    const older = entry("older", "ERSTELLT", "2026-09-02T00:00:00.000Z");
    const newer = entry("newer", "ERSTELLT", "2026-09-03T00:00:00.000Z");
    const submitted = entry(
      "submitted",
      "EINGEREICHT",
      "2026-09-04T00:00:00.000Z",
    );

    expect(findEinreichungDraft([older, submitted, newer])).toBe(newer);
  });
});
