import { describe, expect, test } from "vitest";
import {
  getDokumentStatusPresentation,
  getEinreichungStatusPresentation,
  getVerfahrenStatusPresentation,
  getVirenScanStatusPresentation,
  isEinreichungReady,
} from "../statusPresentation";

const einreichungStatusBadgeLabels = {
  gruen: "gruen",
  rot: "rot",
  gelb: "gelb",
};

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

const virenScanStatusBadgeLabels = {
  sauber: "sauber",
  infiziertShort: "infiziertShort",
  infiziertLong: "infiziertLong",
  fehlgeschlagenShort: "fehlgeschlagenShort",
  fehlgeschlagenLong: "fehlgeschlagenLong",
  inBearbeitungShort: "inBearbeitungShort",
  inBearbeitungLong: "inBearbeitungLong",
  ausstehendShort: "ausstehendShort",
  ausstehendLong: "ausstehendLong",
};

describe("statusPresentation", () => {
  test("maps einreichung status", () => {
    expect(
      getEinreichungStatusPresentation("GRUEN", einreichungStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "success",
      label: "gruen",
    });
    expect(
      getEinreichungStatusPresentation("ROT", einreichungStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "rot",
    });
    expect(
      getEinreichungStatusPresentation("UNKNOWN", einreichungStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "gelb",
    });
  });

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

  test("maps virenscan status with short and long labels", () => {
    expect(
      getVirenScanStatusPresentation("SAUBER", virenScanStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "success",
      label: "sauber",
    });

    expect(
      getVirenScanStatusPresentation(
        "INFIZIERT",
        virenScanStatusBadgeLabels,
        "short",
      ),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "infiziertShort",
    });
    expect(
      getVirenScanStatusPresentation(
        "INFIZIERT",
        virenScanStatusBadgeLabels,
        "long",
      ),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "infiziertLong",
    });

    expect(
      getVirenScanStatusPresentation(
        "FEHLGESCHLAGEN",
        virenScanStatusBadgeLabels,
        "short",
      ),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "fehlgeschlagenShort",
    });
    expect(
      getVirenScanStatusPresentation(
        "FEHLGESCHLAGEN",
        virenScanStatusBadgeLabels,
        "long",
      ),
    ).toEqual({
      badgeClassModifier: "danger",
      label: "fehlgeschlagenLong",
    });

    expect(
      getVirenScanStatusPresentation(
        "IN_BEARBEITUNG",
        virenScanStatusBadgeLabels,
        "short",
      ),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "inBearbeitungShort",
    });
    expect(
      getVirenScanStatusPresentation(
        "IN_BEARBEITUNG",
        virenScanStatusBadgeLabels,
        "long",
      ),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "inBearbeitungLong",
    });

    expect(
      getVirenScanStatusPresentation("UNBEKANNT", virenScanStatusBadgeLabels),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "ausstehendShort",
    });
    expect(
      getVirenScanStatusPresentation(
        "UNBEKANNT",
        virenScanStatusBadgeLabels,
        "long",
      ),
    ).toEqual({
      badgeClassModifier: "warning",
      label: "ausstehendLong",
    });
  });

  test("determines einreichung readiness", () => {
    expect(
      isEinreichungReady([
        { viren_scan_status: "SAUBER" },
        { viren_scan_status: "IN_BEARBEITUNG" },
      ]),
    ).toBe(true);

    expect(
      isEinreichungReady([
        { viren_scan_status: "SAUBER" },
        { viren_scan_status: "INFIZIERT" },
      ]),
    ).toBe(false);

    expect(
      isEinreichungReady([
        { viren_scan_status: "SAUBER" },
        { viren_scan_status: "FEHLGESCHLAGEN" },
      ]),
    ).toBe(false);

    expect(isEinreichungReady([])).toBe(false);
  });
});
