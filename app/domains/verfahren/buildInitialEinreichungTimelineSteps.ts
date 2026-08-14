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
  showConnector?: boolean;
};

type TimelineStepTranslations = {
  assetsTitle: string;
  filesAddedLabel: string;
  addDetailsTitle: string;
  klageschriftUploadTitle: string;
  klaegerLabel: string;
  beklagterLabel: string;
  rubrumLabel: string;
  gerichtLabel: string;
};

export type CompletedEinreichungDetails = {
  klaeger: boolean;
  beklagter: boolean;
  rubrum: boolean;
  gericht: boolean;
};

function buildCompletedDetailsBody(
  completedDetails: CompletedEinreichungDetails,
  translations: TimelineStepTranslations,
): string {
  return [
    completedDetails.klaeger && translations.klaegerLabel,
    completedDetails.beklagter && translations.beklagterLabel,
    completedDetails.rubrum && translations.rubrumLabel,
    completedDetails.gericht && translations.gerichtLabel,
  ]
    .filter((label): label is string => Boolean(label))
    .join(", ");
}

export function buildInitialTimelineStepData(
  timelineSteps: InitialEinreichungTimelineSteps,
  verfahrenStatusChanged: string,
  completedDetails: CompletedEinreichungDetails,
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
      body: buildCompletedDetailsBody(completedDetails, translations),
    },
    {
      timelineLabel: timelineSteps.firstDokumentDate,
      title: translations.klageschriftUploadTitle,
      body: timelineSteps.firstDokumentName,
      showConnector: false,
    },
  ];
}
