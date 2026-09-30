import { getEinreichungStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import VerfahrenDokumentItem from "~/components/verfahren/VerfahrenDokumentItem";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { useTranslations } from "~/services/translations/context";

type VerfahrenEinreichungHistoryListProps = {
  einreichungen: EinreichungSummary[];
};

export default function VerfahrenEinreichungHistoryList({
  einreichungen,
}: Readonly<VerfahrenEinreichungHistoryListProps>) {
  const { shared, routes } = useTranslations();
  const labels = routes.verfahrenId.einreichungHistory;

  if (einreichungen.length === 0) {
    return (
      <p className="kern-body kern-mt-md m-0">Keine Einreichung vorhanden.</p>
    );
  }

  return (
    // No spacing between the items — KERN joins adjacent accordions itself
    // (`.kern-accordion + .kern-accordion`).
    <div>
      {einreichungen.map(({ einreichung, dokumente }) => {
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
          <details key={einreichung.id} className="kern-accordion">
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
        );
      })}
    </div>
  );
}
