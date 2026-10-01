import { getEinreichungStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import VerfahrenDokumentItem from "~/components/verfahren/VerfahrenDokumentItem";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import VerfahrenTimelineStep from "~/components/verfahren/VerfahrenTimelineStep";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { isEinreichungOpen } from "~/domains/verfahren/services/findOpenEinreichung";
import { useTranslations } from "~/services/translations/context";
import { formatDate } from "~/utils/dates";

type VerfahrenEinreichungTimelineProps = {
  einreichungen: EinreichungSummary[];
};

/**
 * The Verfahren's Einreichungen as timeline steps (newest first), each an
 * accordion listing its uploaded Dokumente.
 */
export default function VerfahrenEinreichungTimeline({
  einreichungen,
}: Readonly<VerfahrenEinreichungTimelineProps>) {
  const { shared, routes } = useTranslations();
  const labels = routes.verfahrenId.einreichungHistory;

  if (einreichungen.length === 0) {
    return (
      <p className="kern-body kern-mt-md m-0">Keine Einreichung vorhanden.</p>
    );
  }

  const newestFirst = [...einreichungen].sort((a, b) =>
    b.einreichung.erstelltAm.localeCompare(a.einreichung.erstelltAm),
  );

  return (
    <div>
      {newestFirst.map(({ einreichung, dokumente }, index) => {
        // The XJustiz Dokument is system-generated metadata, not a file the
        // user submitted — same as in VerfahrenDokumenteList.
        const visibleDokumente = dokumente.filter(
          (dokument) => dokument.typ !== "XJUSTIZ",
        );
        const status = getEinreichungStatusPresentation(
          einreichung.status,
          shared.statusPresentation.einreichung,
        );

        const dokumenteCountLabel = (
          visibleDokumente.length === 1
            ? labels.dokumenteCountSingular
            : labels.dokumenteCount
        ).replace("{{count}}", String(visibleDokumente.length));

        return (
          <VerfahrenTimelineStep
            key={einreichung.id}
            timelineLabel={formatDate(
              einreichung.eingereichtAm ?? einreichung.erstelltAm,
            )}
            iconClassName={
              isEinreichungOpen(einreichung)
                ? "kern-icon--edit"
                : "kern-icon--check"
            }
            showConnector={index < newestFirst.length - 1}
          >
            <details className="kern-accordion space-y-2.5">
              <summary className="kern-accordion__header">
                <span className="kern-title flex-none">{einreichung.name}</span>
                <VerfahrenStatusBadge
                  tone={status.badgeClassModifier}
                  label={status.label}
                />
                <span className="kern-body kern-body--muted ml-auto">
                  {dokumenteCountLabel}
                </span>
              </summary>
              <section className="kern-accordion__body">
                {visibleDokumente.length > 0 ? (
                  <div className="kern-gap-md flex w-full flex-col">
                    {visibleDokumente.map((dokument) => (
                      <VerfahrenDokumentItem
                        key={dokument.id}
                        dokument={dokument}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="kern-body m-0">Keine Dokumente vorhanden.</p>
                )}
              </section>
            </details>
          </VerfahrenTimelineStep>
        );
      })}
    </div>
  );
}
