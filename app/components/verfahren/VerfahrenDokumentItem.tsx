import type { ReactNode } from "react";
import buildDokumentDateiHref from "~/components/verfahren/presentation/buildDokumentDateiHref";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import VerfahrenDokumentStatusBadge from "~/components/verfahren/VerfahrenDokumentStatusBadge";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import type { DokumentType } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { useTranslations } from "~/services/translations/context";

// Custom icons, see styles.css. XJustiz-Dokumente aren't listed.
const DOKUMENT_TYPE_ICONS: Partial<Record<DokumentType, string>> = {
  SCHRIFTSTUECK: "kern-icon--description",
  ANHANG: "kern-icon--attach-file",
  SIGNATURDATEI: "kern-icon--signature",
};

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
  const { routes, shared } = useTranslations();
  const labels =
    routes.verfahrenId.draftKlageeinreichung.proceduralSteps.einreichung
      .dokumente;
  const typIcon = DOKUMENT_TYPE_ICONS[dokument.typ];
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
            {typIcon && (
              // Labelled, since the timeline shows the Dokument without its typ
              <span>
                <span
                  className={`kern-icon ${typIcon}`}
                  aria-hidden="true"
                ></span>
                <span className="kern-sr-only">
                  {shared.dokumentType[dokument.typ]}
                </span>
              </span>
            )}
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
