import { describe, expect, test } from "vitest";
import {
  getEinreichungStatusPresentation,
  getVerfahrenStatusPresentation,
} from "../statusPresentation";

const einreichungStatusBadgeLabels = {
  erstellt: "erstellt",
  beantragt: "beantragt",
  versendet: "versendet",
  eingereicht: "eingereicht",
  veraktet: "veraktet",
  fehlgeschlagen: "fehlgeschlagen",
  geloescht: "geloescht",
};

const verfahrenStatusBadgeLabels = {
  erstellt: "erstellt",
  eingereicht: "eingereicht",
  gerichtsverfahrenAngelegt: "gerichtsverfahrenAngelegt",
  abgeschlossen: "abgeschlossen",
  geloescht: "geloescht",
};

describe("statusPresentation", () => {
  test.each([
    ["ERSTELLT", "info", "erstellt"],
    ["BEANTRAGT", "info", "beantragt"],
    ["VERSENDET", "info", "versendet"],
    ["EINGEREICHT", "success", "eingereicht"],
    ["VERAKTET", "success", "veraktet"],
    ["FEHLGESCHLAGEN", "danger", "fehlgeschlagen"],
    ["GELOESCHT", "danger", "geloescht"],
  ] as const)("maps einreichung status %s", (status, tone, label) => {
    expect(
      getEinreichungStatusPresentation(status, einreichungStatusBadgeLabels),
    ).toEqual({ badgeClassModifier: tone, label });
  });

  test.each([
    ["ERSTELLT", "info", "erstellt"],
    ["EINGEREICHT", "success", "eingereicht"],
    ["GERICHTSVERFAHRENANGELEGT", "success", "gerichtsverfahrenAngelegt"],
    ["ABGESCHLOSSEN", "success", "abgeschlossen"],
    ["GELOESCHT", "danger", "geloescht"],
  ] as const)("maps verfahren status %s", (status, tone, label) => {
    expect(
      getVerfahrenStatusPresentation(status, verfahrenStatusBadgeLabels),
    ).toEqual({ badgeClassModifier: tone, label });
  });
});
