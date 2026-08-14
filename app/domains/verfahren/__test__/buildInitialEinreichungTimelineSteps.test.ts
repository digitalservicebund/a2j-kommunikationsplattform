import { describe, expect, test } from "vitest";
import {
  buildInitialTimelineStepData,
  getInitialEinreichungTimelineSteps,
} from "../buildInitialEinreichungTimelineSteps";

describe("buildInitialEinreichungTimelineSteps", () => {
  test("returns fallback values when no dokumente are present", () => {
    const timelineSteps = getInitialEinreichungTimelineSteps([]);

    expect(timelineSteps).toEqual({
      latestDokumentDate: "Unbekannt",
      firstDokumentDate: "Unbekannt",
      firstDokumentName: "Unbekannt",
      additionalDokumenteCount: 0,
    });
  });

  test("derives first and latest dokument details for multiple dokumente", () => {
    const dokumente = [
      {
        anzeigename: "Klageschrift.pdf",
        erstellt_am: "2026-07-01T08:00:00.000Z",
      },
      {
        anzeigename: "Anlage-1.pdf",
        erstellt_am: "2026-07-04T12:15:00.000Z",
      },
      {
        anzeigename: "Anlage-2.pdf",
        erstellt_am: "2026-07-09T14:30:00.000Z",
      },
    ];

    const timelineSteps = getInitialEinreichungTimelineSteps(dokumente);

    expect(timelineSteps).toEqual({
      latestDokumentDate: new Date(
        "2026-07-09T14:30:00.000Z",
      ).toLocaleDateString(),
      firstDokumentDate: new Date(
        "2026-07-01T08:00:00.000Z",
      ).toLocaleDateString(),
      firstDokumentName: "Klageschrift.pdf",
      additionalDokumenteCount: 2,
    });
  });

  test("uses fallback name when first dokument name is missing", () => {
    const timelineSteps = getInitialEinreichungTimelineSteps([
      {
        anzeigename: undefined as unknown as string,
        erstellt_am: "2026-07-01T08:00:00.000Z",
      },
    ]);

    expect(timelineSteps.firstDokumentName).toBe("Unbekannt");
  });

  test("uses fallback dates when first dokument timestamp is empty", () => {
    const timelineSteps = getInitialEinreichungTimelineSteps([
      {
        anzeigename: "Klageschrift.pdf",
        erstellt_am: "" as unknown as string,
      },
    ]);

    expect(timelineSteps.firstDokumentDate).toBe("Unbekannt");
    expect(timelineSteps.latestDokumentDate).toBe("Unbekannt");
  });

  test("builds timeline step data with expected order and flags", () => {
    const timelineSteps = {
      latestDokumentDate: "09.07.2026",
      firstDokumentDate: "01.07.2026",
      firstDokumentName: "Klageschrift.pdf",
      additionalDokumenteCount: 3,
    };

    const translations = {
      assetsTitle: "Dateien hinzugefügt",
      filesAddedLabel: "Dateien hinzugefügt",
      addDetailsTitle: "Angaben ergänzt",
      klageschriftUploadTitle: "Klageschrift hochgeladen",
      klaegerLabel: "Kläger",
      beklagterLabel: "Beklagter",
      rubrumLabel: "Rubrum",
      gerichtLabel: "Gericht",
    };

    const result = buildInitialTimelineStepData(
      timelineSteps,
      "2026-07-10T10:00:00.000Z",
      { klaeger: true, beklagter: true, rubrum: true, gericht: true },
      translations,
    );

    expect(result).toEqual([
      {
        timelineLabel: "09.07.2026",
        title: "Dateien hinzugefügt",
        body: "3 Dateien hinzugefügt",
      },
      {
        timelineLabel: new Date(
          "2026-07-10T10:00:00.000Z",
        ).toLocaleDateString(),
        title: "Angaben ergänzt",
        body: "Kläger, Beklagter, Rubrum, Gericht",
      },
      {
        timelineLabel: "01.07.2026",
        title: "Klageschrift hochgeladen",
        body: "Klageschrift.pdf",
        showConnector: false,
      },
    ]);
  });

  test("builds a partial completed-details body reflecting only finished parts, comma-separated", () => {
    const timelineSteps = {
      latestDokumentDate: "09.07.2026",
      firstDokumentDate: "01.07.2026",
      firstDokumentName: "Klageschrift.pdf",
      additionalDokumenteCount: 0,
    };

    const translations = {
      assetsTitle: "Dateien hinzugefügt",
      filesAddedLabel: "Dateien hinzugefügt",
      addDetailsTitle: "Angaben ergänzt",
      klageschriftUploadTitle: "Klageschrift hochgeladen",
      klaegerLabel: "Kläger",
      beklagterLabel: "Beklagter",
      rubrumLabel: "Rubrum",
      gerichtLabel: "Gericht",
    };

    const result = buildInitialTimelineStepData(
      timelineSteps,
      "2026-07-10T10:00:00.000Z",
      { klaeger: true, beklagter: false, rubrum: false, gericht: true },
      translations,
    );

    expect(result[1].body).toBe("Kläger, Gericht");
  });

  test("builds a single-part completed-details body without a separator", () => {
    const timelineSteps = {
      latestDokumentDate: "09.07.2026",
      firstDokumentDate: "01.07.2026",
      firstDokumentName: "Klageschrift.pdf",
      additionalDokumenteCount: 0,
    };

    const translations = {
      assetsTitle: "Dateien hinzugefügt",
      filesAddedLabel: "Dateien hinzugefügt",
      addDetailsTitle: "Angaben ergänzt",
      klageschriftUploadTitle: "Klageschrift hochgeladen",
      klaegerLabel: "Kläger",
      beklagterLabel: "Beklagter",
      rubrumLabel: "Rubrum",
      gerichtLabel: "Gericht",
    };

    const result = buildInitialTimelineStepData(
      timelineSteps,
      "2026-07-10T10:00:00.000Z",
      { klaeger: false, beklagter: false, rubrum: true, gericht: false },
      translations,
    );

    expect(result[1].body).toBe("Rubrum");
  });

  test("builds an empty completed-details body when nothing is done yet", () => {
    const timelineSteps = {
      latestDokumentDate: "09.07.2026",
      firstDokumentDate: "01.07.2026",
      firstDokumentName: "Klageschrift.pdf",
      additionalDokumenteCount: 0,
    };

    const translations = {
      assetsTitle: "Dateien hinzugefügt",
      filesAddedLabel: "Dateien hinzugefügt",
      addDetailsTitle: "Angaben ergänzt",
      klageschriftUploadTitle: "Klageschrift hochgeladen",
      klaegerLabel: "Kläger",
      beklagterLabel: "Beklagter",
      rubrumLabel: "Rubrum",
      gerichtLabel: "Gericht",
    };

    const result = buildInitialTimelineStepData(
      timelineSteps,
      "2026-07-10T10:00:00.000Z",
      { klaeger: false, beklagter: false, rubrum: false, gericht: false },
      translations,
    );

    expect(result[1].body).toBe("");
  });
});
