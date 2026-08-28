import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import { getDokumentStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { useTranslations } from "~/services/translations/context";

type VerfahrenEinreichungHistoryListProps = {
  einreichungen: EinreichungSummary[];
};

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return NOT_AVAILABLE_LABEL;
  }

  return new Date(value).toLocaleDateString();
};

export default function VerfahrenEinreichungHistoryList({
  einreichungen,
}: Readonly<VerfahrenEinreichungHistoryListProps>) {
  const { routes, shared } = useTranslations();

  if (einreichungen.length === 0) {
    return (
      <p className="kern-body mt-kern-space-default m-0">
        Keine Einreichung vorhanden.
      </p>
    );
  }

  return (
    <div className="space-y-kern-space-default">
      {einreichungen.map(({ einreichung, dokumente }, index) => {
        const statusPresentation = getDokumentStatusPresentation(
          einreichung.status,
          shared.statusPresentation.dokument,
        );
        const timelineLabel = formatDate(
          einreichung.eingereichtAm ?? einreichung.erstelltAm,
        );
        const title =
          einreichung.name ??
          `${routes.verfahrenNeu.step3.proceduralSteps.einreichung.basisdaten.titleLabel} ${index + 1}`;
        const body = `${statusPresentation.label} · ${routes.verfahrenNeu.step3.proceduralSteps.einreichung.basisdaten.createdLabel} ${formatDate(einreichung.erstelltAm)} · ${dokumente.length} ${routes.verfahrenNeu.step3.proceduralSteps.assets.filesAddedLabel}`;

        return (
          <VerfahrenTimelineStepCard
            key={einreichung.id}
            timelineLabel={timelineLabel}
            title={title}
            body={body}
            showConnector={index < einreichungen.length - 1}
          />
        );
      })}
    </div>
  );
}
