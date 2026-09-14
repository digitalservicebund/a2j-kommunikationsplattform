import { getTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, test } from "vitest";
import { buildInitialEinreichungTimelineSteps } from "../buildInitialEinreichungTimelineSteps";

describe("buildInitialEinreichungTimelineSteps", () => {
  const translations = getTestTranslations();
  const {
    routes: {
      verfahrenNeu: {
        step3: { proceduralSteps: stepTranslations },
      },
    },
  } = translations;

  const dokumente = [
    {
      anzeigename: "Klageschrift.pdf",
      erstelltAm: "2026-07-01T08:00:00.000Z",
    },
    {
      anzeigename: "Anlage-1.pdf",
      erstelltAm: "2026-07-04T12:15:00.000Z",
    },
    {
      anzeigename: "Anlage-2.pdf",
      erstelltAm: "2026-07-09T14:30:00.000Z",
    },
  ];

  test("returns timeline steps up to initial Einreichung, latest first", () => {
    const timelineSteps = buildInitialEinreichungTimelineSteps({
      verfahrenId: "123",
      verfahrenStatusGeaendertAm: "2026-07-04T12:00:00.000Z",
      einreichungId: "456",
      einreichungStatus: "ERSTELLT",
      einreichungDokumente: dokumente,
      detailsCompleted: {
        klaeger: true,
        beklagter: true,
        rubrum: true,
        gericht: true,
      },
      translations,
    });

    expect(timelineSteps).toEqual([
      // Additional Dokumente
      {
        timelineLabel: "09.07.2026",
        title: stepTranslations.additionalDokumenteAdded.title,
        body: stepTranslations.additionalDokumenteAdded.filesAdded.replace(
          "{{count}}",
          "2",
        ),
        editTo: "/verfahren/neu/123/bearbeiten#dokumente",
      },
      // Completed Details
      {
        timelineLabel: "04.07.2026",
        title: stepTranslations.detailsAdded.title,
        body: [
          stepTranslations.detailsAdded.klaeger,
          stepTranslations.detailsAdded.beklagter,
          stepTranslations.detailsAdded.rubrum,
          stepTranslations.detailsAdded.gericht,
        ].join(", "),
        editTo: "/verfahren/neu/123/bearbeiten",
      },
      // Klageschrift
      {
        timelineLabel: "01.07.2026",
        title: stepTranslations.klageschriftUploaded.title,
        body: "Klageschrift.pdf",
        showConnector: false,
        editTo: "/verfahren/neu?verfahrenId=123&einreichungId=456",
      },
    ]);
  });

  it("omits 'editTo' when the initial Einreichung has a non-draft status", () => {
    const timelineSteps = buildInitialEinreichungTimelineSteps({
      verfahrenId: "123",
      verfahrenStatusGeaendertAm: "2026-07-04T12:00:00.000Z",
      einreichungId: "456",
      einreichungStatus: "BEANTRAGT",
      einreichungDokumente: dokumente,
      detailsCompleted: {
        klaeger: true,
        beklagter: true,
        rubrum: true,
        gericht: true,
      },
      translations,
    });

    expect(timelineSteps).toEqual([
      // Additional Dokumente
      {
        timelineLabel: "09.07.2026",
        title: stepTranslations.additionalDokumenteAdded.title,
        body: stepTranslations.additionalDokumenteAdded.filesAdded.replace(
          "{{count}}",
          "2",
        ),
      },
      // Completed Details
      {
        timelineLabel: "04.07.2026",
        title: stepTranslations.detailsAdded.title,
        body: [
          stepTranslations.detailsAdded.klaeger,
          stepTranslations.detailsAdded.beklagter,
          stepTranslations.detailsAdded.rubrum,
          stepTranslations.detailsAdded.gericht,
        ].join(", "),
      },
      // Klageschrift
      {
        timelineLabel: "01.07.2026",
        title: stepTranslations.klageschriftUploaded.title,
        body: "Klageschrift.pdf",
        showConnector: false,
      },
    ]);
  });

  it("displays only completed details", () => {
    const timelineSteps = buildInitialEinreichungTimelineSteps({
      verfahrenId: "123",
      verfahrenStatusGeaendertAm: "2026-07-04T12:00:00.000Z",
      einreichungId: "456",
      einreichungStatus: "ERSTELLT",
      einreichungDokumente: dokumente,
      detailsCompleted: {
        klaeger: true,
        beklagter: false,
        rubrum: true,
        gericht: false,
      },
      translations,
    });

    expect(timelineSteps).toEqual([
      // Additional Dokumente
      {
        timelineLabel: "09.07.2026",
        title: stepTranslations.additionalDokumenteAdded.title,
        body: stepTranslations.additionalDokumenteAdded.filesAdded.replace(
          "{{count}}",
          "2",
        ),
        editTo: "/verfahren/neu/123/bearbeiten#dokumente",
      },
      // Completed Details
      {
        timelineLabel: "04.07.2026",
        title: stepTranslations.detailsAdded.title,
        body: [
          stepTranslations.detailsAdded.klaeger,
          stepTranslations.detailsAdded.rubrum,
        ].join(", "),
        editTo: "/verfahren/neu/123/bearbeiten",
      },
      // Klageschrift
      {
        timelineLabel: "01.07.2026",
        title: stepTranslations.klageschriftUploaded.title,
        body: "Klageschrift.pdf",
        showConnector: false,
        editTo: "/verfahren/neu?verfahrenId=123&einreichungId=456",
      },
    ]);
  });

  it("keeps 'additionalDokumenteAdded' step even if there are no additional Dokumente", () => {
    const timelineSteps = buildInitialEinreichungTimelineSteps({
      verfahrenId: "123",
      verfahrenStatusGeaendertAm: "2026-07-04T12:00:00.000Z",
      einreichungId: "456",
      einreichungStatus: "ERSTELLT",
      einreichungDokumente: [dokumente[0]],
      detailsCompleted: {
        klaeger: true,
        beklagter: true,
        rubrum: true,
        gericht: true,
      },
      translations,
    });

    expect(timelineSteps).toEqual([
      // Additional Dokumente
      {
        timelineLabel: "04.07.2026",
        title: stepTranslations.additionalDokumenteAdded.title,
        body: stepTranslations.additionalDokumenteAdded.filesAdded.replace(
          "{{count}}",
          "0",
        ),
        editTo: "/verfahren/neu/123/bearbeiten#dokumente",
      },
      // Completed Details
      {
        timelineLabel: "04.07.2026",
        title: stepTranslations.detailsAdded.title,
        body: [
          stepTranslations.detailsAdded.klaeger,
          stepTranslations.detailsAdded.beklagter,
          stepTranslations.detailsAdded.rubrum,
          stepTranslations.detailsAdded.gericht,
        ].join(", "),
        editTo: "/verfahren/neu/123/bearbeiten",
      },
      // Klageschrift
      {
        timelineLabel: "01.07.2026",
        title: stepTranslations.klageschriftUploaded.title,
        body: "Klageschrift.pdf",
        showConnector: false,
        editTo: "/verfahren/neu?verfahrenId=123&einreichungId=456",
      },
    ]);
  });
});
