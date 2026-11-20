import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungArtStep from "~/components/verfahren/VerfahrenWeitereEinreichungArtStep";
import VerfahrenWeitereEinreichungDokumenteStep from "~/components/verfahren/VerfahrenWeitereEinreichungDokumenteStep";
import { useTranslations } from "~/services/translations/context";

export const DELETE_EINREICHUNG_FORM_TYPE = "delete-einreichung";

type VerfahrenWeitereEinreichungSectionProps = {
  verfahrenId: string;
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungSection({
  verfahrenId,
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungSectionProps>) {
  const { routes } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;

  return (
    <div className="kern-card">
      <div className="kern-card__container">
        <header className="kern-card__header kern-gap-md flex flex-row flex-wrap items-start justify-between">
          <h3 className="kern-title">{labels.headline}</h3>
          {draftWeitereEinreichung && (
            <ConfirmDeleteDialog
              formType={DELETE_EINREICHUNG_FORM_TYPE}
              fields={{ einreichungId: draftWeitereEinreichung.einreichung.id }}
              title={labels.delete.title}
              message={labels.delete.message}
            />
          )}
        </header>
        <section className="kern-card__body space-y-2.5">
          <VerfahrenWeitereEinreichungArtStep
            draftWeitereEinreichung={draftWeitereEinreichung}
          />
          <VerfahrenWeitereEinreichungDokumenteStep
            verfahrenId={verfahrenId}
            draftWeitereEinreichung={draftWeitereEinreichung}
          />
        </section>
      </div>
    </div>
  );
}
