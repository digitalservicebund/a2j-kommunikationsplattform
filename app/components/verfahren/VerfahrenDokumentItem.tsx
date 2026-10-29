import type { ReactNode } from "react";
import buildDokumentDateiHref from "~/components/verfahren/presentation/buildDokumentDateiHref";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import VerfahrenDokumentStatusBadge from "~/components/verfahren/VerfahrenDokumentStatusBadge";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDokumentItemProps = {
  dokument: Dokument;
  verfahrenId: string;
  einreichungId: string;
  typLabel?: string;
  validierungsstatus?: Validierungsstatus;
  actions?: ReactNode;
};

export default function VerfahrenDokumentItem({
  dokument,
  verfahrenId,
  einreichungId,
  typLabel,
  validierungsstatus,
  actions,
}: Readonly<VerfahrenDokumentItemProps>) {
  const { routes } = useTranslations();
  const labels =
    routes.verfahrenId.draftKlageeinreichung.proceduralSteps.einreichung
      .dokumente;
  const dateiHrefOptions = {
    verfahrenId,
    einreichungId,
    dokumentId: dokument.id,
  };

  return (
    // border-decorative-border rather than border-(--kern-color-…): see the
    // KERN grid note in theme.css
    <div className="kern-p-md flex flex-col rounded-(--kern-metric-border-radius-default) border border-decorative-border">
      <div className="kern-gap-sm flex flex-wrap items-center justify-between">
        <div className="kern-gap-sm flex flex-col">
          <div className="kern-gap-sm flex items-center">
            <a
              className="kern-link kern-body kern-body--bold"
              href={buildDokumentDateiHref({
                ...dateiHrefOptions,
                disposition: "inline",
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dokument.anzeigename}{" "}
              <span className="kern-sr-only">{labels.opensInNewTabLabel}</span>
            </a>
            <a
              className="kern-btn kern-btn--secondary kern-btn--x-small"
              href={buildDokumentDateiHref({
                ...dateiHrefOptions,
                disposition: "attachment",
              })}
            >
              <span
                className="kern-icon kern-icon--download"
                aria-hidden="true"
              ></span>
              <span className="kern-label kern-sr-only">
                {labels.downloadLabel.replace("{{name}}", dokument.anzeigename)}
              </span>
            </a>
          </div>
          <div className="kern-body kern-body--small kern-body--muted">
            {typLabel && `${typLabel} · `}
            {formatDokumentSize(dokument.sizeInBytes ?? 0)}
            {" · "}
            {labels.uploadedAtLabel}{" "}
            {new Date(dokument.erstelltAm).toLocaleDateString()}
          </div>
        </div>

        {validierungsstatus && (
          <VerfahrenDokumentStatusBadge
            validierungsstatus={validierungsstatus}
          />
        )}
      </div>
      {actions && <div className="flex justify-end">{actions}</div>}
    </div>
  );
}
