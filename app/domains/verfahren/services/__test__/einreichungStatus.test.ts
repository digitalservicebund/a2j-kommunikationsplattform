import { describe, expect, it } from "vitest";
import {
  isDraftEinreichungStatus,
  isEinreichungInProgress,
} from "../einreichungStatus";

describe("isDraftEinreichungStatus", () => {
  it.each(["ERSTELLT", "FEHLGESCHLAGEN"] as const)(
    "treats %s as a draft",
    (status) => {
      expect(isDraftEinreichungStatus(status)).toBe(true);
    },
  );

  it.each([
    "BEANTRAGT",
    "VERSENDET",
    "EINGEREICHT",
    "VERAKTET",
    "GELOESCHT",
  ] as const)("doesn't treat %s as a draft", (status) => {
    expect(isDraftEinreichungStatus(status)).toBe(false);
  });
});

describe("isEinreichungInProgress", () => {
  it.each(["BEANTRAGT", "VERSENDET"] as const)(
    "treats %s as in progress",
    (status) => {
      expect(isEinreichungInProgress(status)).toBe(true);
    },
  );

  it.each([
    "ERSTELLT",
    "FEHLGESCHLAGEN",
    "EINGEREICHT",
    "VERAKTET",
    "GELOESCHT",
  ] as const)("doesn't treat %s as in progress", (status) => {
    expect(isEinreichungInProgress(status)).toBe(false);
  });
});
