import type { ReactNode } from "react";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDokumentItemProps = {
  dokument: Dokument;
  // Rendered on the right, e.g. a delete button or a status badge.
  children?: ReactNode;
};

export default function VerfahrenDokumentItem({
  dokument,
  children,
}: Readonly<VerfahrenDokumentItemProps>) {
  const { routes } = useTranslations();

  return (
    <div className="kern-p-md align-center kern-gap-md flex flex-wrap rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
      <div className="flex-1">
        <div className="kern-body kern-body--bold">{dokument.anzeigename}</div>
        <div className="kern-body kern-body--small kern-body--muted">
          {formatDokumentSize(dokument.sizeInBytes ?? 0)}
          {" · "}
          {
            routes.verfahrenId.draftKlageeinreichung.proceduralSteps.einreichung
              .dokumente.uploadedAtLabel
          }{" "}
          {new Date(dokument.erstelltAm).toLocaleDateString()}
        </div>
      </div>
      {children}
    </div>
  );
}
