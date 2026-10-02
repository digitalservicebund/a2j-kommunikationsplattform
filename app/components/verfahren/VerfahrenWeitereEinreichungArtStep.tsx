import { useRef, useState, type ChangeEvent } from "react";
import { Form } from "react-router";
import InputSelect from "~/components/InputSelect";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import { EinreichungArtSchema } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { useTranslations } from "~/services/translations/context";

export const CREATE_EINREICHUNG_FORM_TYPE = "create-einreichung";

type VerfahrenWeitereEinreichungArtStepProps = {
  // null until an Art has been picked, which creates the draft — its name is
  // the picked Art.
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungArtStep({
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungArtStepProps>) {
  const { routes, shared } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;

  const formRef = useRef<HTMLFormElement>(null);
  const [art, setArt] = useState(
    draftWeitereEinreichung?.einreichung.name ?? "",
  );
  const isArtFixed = draftWeitereEinreichung !== null;

  function handleArtChange(event: ChangeEvent<HTMLSelectElement>) {
    // Once created, the Art is fixed — picking another one must not create
    // a second Einreichung.
    if (isArtFixed) {
      return;
    }

    setArt(event.target.value);
    formRef.current?.requestSubmit();
  }

  return (
    <div className="w-full">
      <Form method="post" ref={formRef}>
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
          disabled={isArtFixed}
        />
      </Form>
    </div>
  );
}
