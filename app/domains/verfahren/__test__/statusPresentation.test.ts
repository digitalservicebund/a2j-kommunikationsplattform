import { describe, expect, test } from "vitest";
import {
  getDokumentStatusPresentation,
  getEinreichungStatusPresentation,
  getVirenScanStatusPresentation,
  isEinreichungReady,
} from "../statusPresentation";

describe("statusPresentation", () => {
  test("maps einreichung status", () => {
    expect(getEinreichungStatusPresentation("GRUEN")).toEqual({
      badgeClassModifier: "success",
      label: "Grün",
    });
    expect(getEinreichungStatusPresentation("ROT")).toEqual({
      badgeClassModifier: "danger",
      label: "Rot",
    });
    expect(getEinreichungStatusPresentation("UNKNOWN")).toEqual({
      badgeClassModifier: "warning",
      label: "Gelb",
    });
  });

  test("maps dokument status", () => {
    expect(getDokumentStatusPresentation("ERSTELLT")).toEqual({
      badgeClassModifier: "info",
      label: "Erstellt",
    });
    expect(getDokumentStatusPresentation("EINGEREICHT")).toEqual({
      badgeClassModifier: "success",
      label: "Eingereicht",
    });
    expect(getDokumentStatusPresentation("OTHER")).toEqual({
      badgeClassModifier: "warning",
      label: "Wird validiert",
    });
  });

  test("maps virenscan status with short and long labels", () => {
    expect(getVirenScanStatusPresentation("SAUBER")).toEqual({
      badgeClassModifier: "success",
      label: "Geprüft und virenfrei",
    });

    expect(getVirenScanStatusPresentation("INFIZIERT", "short")).toEqual({
      badgeClassModifier: "danger",
      label: "Infiziert",
    });
    expect(getVirenScanStatusPresentation("INFIZIERT", "long")).toEqual({
      badgeClassModifier: "danger",
      label: "Dokument ist infiziert",
    });

    expect(getVirenScanStatusPresentation("FEHLGESCHLAGEN", "short")).toEqual({
      badgeClassModifier: "danger",
      label: "Fehlgeschlagen",
    });
    expect(getVirenScanStatusPresentation("FEHLGESCHLAGEN", "long")).toEqual({
      badgeClassModifier: "danger",
      label: "Scan ist fehlgeschlagen",
    });

    expect(getVirenScanStatusPresentation("IN_BEARBEITUNG", "short")).toEqual({
      badgeClassModifier: "warning",
      label: "In Bearbeitung",
    });
    expect(getVirenScanStatusPresentation("IN_BEARBEITUNG", "long")).toEqual({
      badgeClassModifier: "warning",
      label: "Scan ist in Bearbeitung",
    });

    expect(getVirenScanStatusPresentation("UNBEKANNT")).toEqual({
      badgeClassModifier: "warning",
      label: "In Bearbeitung",
    });
    expect(getVirenScanStatusPresentation("UNBEKANNT", "long")).toEqual({
      badgeClassModifier: "warning",
      label: "Scan ist ausstehend",
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
