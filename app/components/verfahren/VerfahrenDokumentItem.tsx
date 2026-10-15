import type { ReactNode } from "react";
import buildDokumentDateiHref from "~/components/verfahren/presentation/buildDokumentDateiHref";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDokumentItemProps = {
  dokument: Dokument;
  verfahrenId: string;
  einreichungId: string;
  // Rendered on the right, e.g. a delete button or a status badge.
  children?: ReactNode;
};

export default function VerfahrenDokumentItem({
  dokument,
  verfahrenId,
  einreichungId,
  children,
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
    <div className="kern-p-md align-center kern-gap-md flex flex-wrap rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
      <div className="flex-1">
        <div className="kern-gap-sm flex items-center">
          {/* Plain anchors instead of <Link>: the resource route redirects
              to the file outside the app. */}
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
          {formatDokumentSize(dokument.sizeInBytes ?? 0)}
          {" · "}
          {labels.uploadedAtLabel}{" "}
          {new Date(dokument.erstelltAm).toLocaleDateString()}
        </div>
      </div>
      {children}
    </div>
  );
}
