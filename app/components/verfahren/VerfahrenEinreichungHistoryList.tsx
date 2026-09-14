import { getDokumentStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { useTranslations } from "~/services/translations/context";
import { formatDate } from "~/utils/dates";

type VerfahrenEinreichungHistoryListProps = {
  einreichungen: EinreichungSummary[];
};

export default function VerfahrenEinreichungHistoryList({
  einreichungen,
}: Readonly<VerfahrenEinreichungHistoryListProps>) {
  const {
    shared: sharedTranslations,
    routes: {
      verfahrenNeu: {
        step3: { proceduralSteps: timelineStepTranslations },
      },
    },
  } = useTranslations();

  if (einreichungen.length === 0) {
    return (
      <p className="kern-body kern-mt-md m-0">Keine Einreichung vorhanden.</p>
    );
  }

  return (
    <div className="space-y-(--kern-metric-space-default)">
      {einreichungen.map(({ einreichung, dokumente }, index) => {
        const timelineDate =
          einreichung.eingereichtAm ?? einreichung.erstelltAm;
        const timelineLabel = formatDate(timelineDate);

        const stepTitle =
          einreichung.name ??
          timelineStepTranslations.einreichung.fallbackTitle.replace(
            "{{number}}",
            String(dokumente.length - index),
          );

        const stepBody = [
          // Status
          getDokumentStatusPresentation(
            einreichung.status,
            sharedTranslations.statusPresentation.dokument,
          ).label,

          // Erstellt am (creation date)
          timelineStepTranslations.einreichung.basisdaten.erstelltAmWithDate.replace(
            "{{date}}",
            formatDate(einreichung.erstelltAm),
          ),

          // Dokument count
          timelineStepTranslations.additionalDokumenteAdded.filesAdded.replace(
            "{{count}}",
            String(dokumente.length),
          ),
        ].join(" · ");

        return (
          <VerfahrenTimelineStepCard
            key={einreichung.id}
            timelineLabel={timelineLabel}
            title={stepTitle}
            body={stepBody}
            showConnector={index < einreichungen.length - 1}
          />
        );
      })}
    </div>
  );
}
