import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungArtStep from "~/components/verfahren/VerfahrenWeitereEinreichungArtStep";
import VerfahrenWeitereEinreichungDokumenteStep from "~/components/verfahren/VerfahrenWeitereEinreichungDokumenteStep";
import { useTranslations } from "~/services/translations/context";

type VerfahrenWeitereEinreichungSectionProps = {
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungSection({
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungSectionProps>) {
  const { routes } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;

  return (
    <article className="kern-card">
      <div className="kern-card__container">
        <header className="kern-card__header">
          <h2 className="kern-title">{labels.headline}</h2>
        </header>
        <section className="kern-card__body space-y-2.5">
          <VerfahrenWeitereEinreichungArtStep
            draftWeitereEinreichung={draftWeitereEinreichung}
          />
          <VerfahrenWeitereEinreichungDokumenteStep
            draftWeitereEinreichung={draftWeitereEinreichung}
          />
        </section>
      </div>
    </article>
  );
}
