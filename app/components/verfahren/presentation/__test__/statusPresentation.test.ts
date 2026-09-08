import { describe, expect, test } from "vitest";
import {
  getDokumentStatusPresentation,
  getVerfahrenStatusPresentation,
} from "../statusPresentation";

const dokumentStatusBadgeLabels = {
  erstellt: "erstellt",
  eingereicht: "eingereicht",
  wirdValidiert: "wirdValidiert",
};

const verfahrenStatusBadgeLabels = {
  erstellt: "erstellt",
  eingereicht: "eingereicht",
  gerichtsverfahrenAngelegt: "gerichtsverfahrenAngelegt",
  abgeschlossen: "abgeschlossen",
  geloescht: "geloescht",
};

describe("statusPresentation", () => {
  test("maps dokument status", () => {
    expect(
      getDokumentStatusPresentation("ERSTELLT", dokumentStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "info",
      label: "erstellt",
    });
    expect(
      getDokumentStatusPresentation("EINGEREICHT", dokumentStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "success",
      label: "eingereicht",
    });
    expect(
      getDokumentStatusPresentation("OTHER", dokumentStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "wirdValidiert",
    });
  });

  test("maps verfahren status", () => {
    expect(
      getVerfahrenStatusPresentation("ERSTELLT", verfahrenStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "info",
      label: "erstellt",
    });
    expect(
      getVerfahrenStatusPresentation("EINGEREICHT", verfahrenStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "success",
      label: "eingereicht",
    });
    expect(
      getVerfahrenStatusPresentation(
        "GERICHTSVERFAHRENANGELEGT",
        verfahrenStatusBadgeLabels,
      ),
    ).toEqual({
      badgeClassModifier: "success",
      label: "gerichtsverfahrenAngelegt",
    });
    expect(
      getVerfahrenStatusPresentation(
        "ABGESCHLOSSEN",
        verfahrenStatusBadgeLabels,
      ),
    ).toEqual({
      badgeClassModifier: "success",
      label: "abgeschlossen",
    });
    expect(
      getVerfahrenStatusPresentation("GELOESCHT", verfahrenStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "geloescht",
    });
  });
});
