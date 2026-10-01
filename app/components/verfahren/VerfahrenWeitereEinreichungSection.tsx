import { useRef, useState, type ChangeEvent } from "react";
import { Form } from "react-router";
import InputSelect from "~/components/InputSelect";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungDokumenteStep from "~/components/verfahren/VerfahrenWeitereEinreichungDokumenteStep";
import { EinreichungArtSchema } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { useTranslations } from "~/services/translations/context";

export const CREATE_EINREICHUNG_FORM_TYPE = "create-einreichung";

type VerfahrenWeitereEinreichungSectionProps = {
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungSection({
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungSectionProps>) {
  const { routes, shared } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;

  const createEinreichungFormRef = useRef<HTMLFormElement>(null);
  const [art, setArt] = useState(
    draftWeitereEinreichung?.einreichung.name ?? "",
  );

  function handleArtChange(event: ChangeEvent<HTMLSelectElement>) {
    // Once created, the Art is fixed — picking another one must not create
    // a second Einreichung.
    if (draftWeitereEinreichung) {
      return;
    }

    setArt(event.target.value);
    createEinreichungFormRef.current?.requestSubmit();
  }

  return (
    <article className="kern-card">
      <div className="kern-card__container">
        <header className="kern-card__header">
          <h2 className="kern-title">{labels.headline}</h2>
        </header>
        <section className="kern-card__body space-y-2.5">
          <div className="w-full">
            <Form method="post" ref={createEinreichungFormRef}>
              <input
                type="hidden"
                name="formType"
                value={CREATE_EINREICHUNG_FORM_TYPE}
              />
              <InputSelect
                id="art"
                label={labels.artLabel}
                placeholder={shared.form.select.placeholder}
                options={EinreichungArtSchema.options.map((value) => ({
                  value,
                  label: value,
                }))}
                selectedValue={art}
                onChange={handleArtChange}
                disabled={Boolean(draftWeitereEinreichung)}
              />
            </Form>
          </div>
          <VerfahrenWeitereEinreichungDokumenteStep
            draftWeitereEinreichung={draftWeitereEinreichung}
          />
        </section>
      </div>
    </article>
  );
}
