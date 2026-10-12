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
    ["ERSTELLT", "draft", "erstellt"],
    ["BEANTRAGT", "pending", "beantragt"],
    ["VERSENDET", "pending", "versendet"],
    ["EINGEREICHT", "pending", "eingereicht"],
    ["VERAKTET", "done", "veraktet"],
    ["FEHLGESCHLAGEN", "failed", "fehlgeschlagen"],
  ] as const)("maps einreichung status %s", (status, state, label) => {
    expect(
      getEinreichungStatusPresentation(status, einreichungStatusBadgeLabels),
    ).toEqual({ state, label });
  });

  test.each([
    ["ERSTELLT", "draft", "erstellt"],
    ["EINGEREICHT", "pending", "eingereicht"],
    ["GERICHTSVERFAHRENANGELEGT", "done", "gerichtsverfahrenAngelegt"],
    ["ABGESCHLOSSEN", "closed", "abgeschlossen"],
  ] as const)("maps verfahren status %s", (status, state, label) => {
    expect(
      getVerfahrenStatusPresentation(status, verfahrenStatusBadgeLabels),
    ).toEqual({ state, label });
  });

  test("shows GELOESCHT as closed with the delete icon", () => {
    expect(
      getEinreichungStatusPresentation(
        "GELOESCHT",
        einreichungStatusBadgeLabels,
      ),
    ).toEqual({ state: "closed", label: "geloescht", icon: "delete" });
    expect(
      getVerfahrenStatusPresentation("GELOESCHT", verfahrenStatusBadgeLabels),
    ).toEqual({ state: "closed", label: "geloescht", icon: "delete" });
  });
});
