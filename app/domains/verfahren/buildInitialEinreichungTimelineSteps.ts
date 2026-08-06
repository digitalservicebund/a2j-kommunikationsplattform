const NOT_AVAILABLE_LABEL = "Unbekannt";

const formatDate = (value: string | null | undefined): string => {
  if (!value) {
    return NOT_AVAILABLE_LABEL;
  }

  return new Date(value).toLocaleDateString();
};

export type InitialEinreichungTimelineSteps = {
  latestDokumentDate: string;
  firstDokumentDate: string;
  firstDokumentName: string;
  additionalDokumenteCount: number;
};

export function getInitialEinreichungTimelineSteps(
  dokumente: Array<{ anzeigename: string; erstellt_am: string }>,
): InitialEinreichungTimelineSteps {
  const additionalDokumenteCount = Math.max(dokumente.length - 1, 0);
  const firstDokumentName = dokumente[0]?.anzeigename ?? NOT_AVAILABLE_LABEL;
  const latestDokumentDate = dokumente.length
    ? formatDate(dokumente.at(-1)?.erstellt_am)
    : NOT_AVAILABLE_LABEL;
  const firstDokumentDate = dokumente[0]?.erstellt_am
    ? formatDate(dokumente[0].erstellt_am)
    : NOT_AVAILABLE_LABEL;

  return {
    latestDokumentDate,
    firstDokumentDate,
    firstDokumentName,
    additionalDokumenteCount,
  };
}

export type TimelineStepData = {
  timelineLabel: string;
  title: string;
  body: string;
  highlightBody?: boolean;
  showConnector?: boolean;
};

type TimelineStepTranslations = {
  assetsTitle: string;
  filesAddedLabel: string;
  addDetailsTitle: string;
  klageschriftUploadTitle: string;
};

export function buildInitialTimelineStepData(
  timelineSteps: InitialEinreichungTimelineSteps,
  verfahrenStatusChanged: string,
  translations: TimelineStepTranslations,
): TimelineStepData[] {
  return [
    {
      timelineLabel: timelineSteps.latestDokumentDate,
      title: translations.assetsTitle,
      body: `${timelineSteps.additionalDokumenteCount} ${translations.filesAddedLabel}`,
    },
    {
      timelineLabel: new Date(verfahrenStatusChanged).toLocaleDateString(),
      title: translations.addDetailsTitle,
      // @TODO: Remove static text and replace it with dynamic translation keys
      // for each completed part of the editing process
      body: "Kläger, Beklagter, Rubrum und Gericht",
      highlightBody: true,
    },
    {
      timelineLabel: timelineSteps.firstDokumentDate,
      title: translations.klageschriftUploadTitle,
      body: timelineSteps.firstDokumentName,
      showConnector: false,
    },
  ];
}
