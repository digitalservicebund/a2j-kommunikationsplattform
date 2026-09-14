import { VerfahrenTimelineStepCardProps } from "~/components/verfahren/VerfahrenTimelineStepCard";
import { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { isDraftEinreichungStatus } from "~/domains/verfahren/services/einreichungStatus";
import type { Translations } from "~/services/translations";
import { formatDate } from "~/utils/dates";

export type EinreichungTimelineStepParams = {
  verfahrenId: string;
  verfahrenStatusGeaendertAm: string;
  einreichungId: string;
  einreichungStatus: Einreichung["status"];
  einreichungDokumente: Pick<Dokument, "anzeigename" | "erstelltAm">[];
  detailsCompleted: {
    klaeger: boolean;
    beklagter: boolean;
    rubrum: boolean;
    gericht: boolean;
  };
  translations: Translations;
};

export type InitialEinreichungTimelineStep = VerfahrenTimelineStepCardProps;

/**
 * Returns the additional steps to show in the Verfahren timeline while the
 * initial Einreichung is still a draft (meaning that the Einreichung data
 * can still be edited). The steps are returned in the order they should
 * be displayed, from latest to earliest.
 */
export function buildInitialEinreichungTimelineSteps({
  verfahrenId,
  verfahrenStatusGeaendertAm,
  einreichungId,
  einreichungStatus,
  einreichungDokumente: dokumente,
  detailsCompleted,
  translations,
}: EinreichungTimelineStepParams): InitialEinreichungTimelineStep[] {
  const timeline: InitialEinreichungTimelineStep[] = [];

  const {
    routes: {
      verfahrenNeu: {
        step3: { proceduralSteps: stepTranslations },
      },
    },
  } = translations;

  // NOTE: This code assumes that the first Dokument of the initial Einreichung
  // is always the Klageschrift. For Einreichungen created through this
  // frontend, this is always the case due to how the user flow is structured,
  // but it is not enforced by the API at present (as of 2026-09-14).
  const [klageschrift, ...additionalDokumente] = dokumente;

  // Step 1: Klageschrift
  if (klageschrift) {
    timeline.push({
      timelineLabel: formatDate(klageschrift.erstelltAm),
      title: stepTranslations.klageschriftUploaded.title,
      body: klageschrift.anzeigename,
      showConnector: false,
      ...(isDraftEinreichungStatus(einreichungStatus) && {
        editTo: `/verfahren/neu?verfahrenId=${verfahrenId}&einreichungId=${einreichungId}`,
      }),
    });
  }

  // Step 2: Completed Details
  timeline.push({
    timelineLabel: formatDate(verfahrenStatusGeaendertAm),
    title: stepTranslations.detailsAdded.title,
    body: [
      detailsCompleted.klaeger && stepTranslations.detailsAdded.klaeger,
      detailsCompleted.beklagter && stepTranslations.detailsAdded.beklagter,
      detailsCompleted.rubrum && stepTranslations.detailsAdded.rubrum,
      detailsCompleted.gericht && stepTranslations.detailsAdded.gericht,
    ]
      .filter((label): label is string => Boolean(label))
      .join(", "),
    ...(isDraftEinreichungStatus(einreichungStatus) && {
      editTo: `/verfahren/neu/${verfahrenId}/bearbeiten`,
    }),
  });

  // Step 3: Additional Dokumente
  timeline.push({
    timelineLabel: formatDate(
      additionalDokumente.at(-1)?.erstelltAm ?? verfahrenStatusGeaendertAm,
    ),
    title: stepTranslations.additionalDokumenteAdded.title,
    body: stepTranslations.additionalDokumenteAdded.filesAdded.replace(
      "{{count}}",
      String(additionalDokumente.length),
    ),
    ...(isDraftEinreichungStatus(einreichungStatus) && {
      editTo: `/verfahren/neu/${verfahrenId}/bearbeiten#dokumente`,
    }),
  });

  // Return timeline steps from most to least recent
  return timeline.reverse();
}
