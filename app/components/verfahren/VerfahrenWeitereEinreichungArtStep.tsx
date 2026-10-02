import { useRef, type ChangeEvent } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import Alert from "~/components/Alert";
import InputSelect from "~/components/InputSelect";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import { EinreichungArtSchema } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

export const CREATE_EINREICHUNG_FORM_TYPE = "create-einreichung";

type CreateEinreichungActionData = { formType?: string };

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
  const navigation = useNavigation();
  const actionData = useActionData<ActionResult<CreateEinreichungActionData>>();

  // Stays true through the redirect's revalidation, until the created draft
  // has been loaded.
  const isCreatingEinreichung =
    navigation.state !== "idle" &&
    navigation.formData?.get("formType") === CREATE_EINREICHUNG_FORM_TYPE;
  const createEinreichungError =
    actionData?.status === "error" &&
    actionData.data?.formType === CREATE_EINREICHUNG_FORM_TYPE
      ? actionData.error
      : null;

  const artBeingCreated = isCreatingEinreichung
    ? navigation.formData?.get("art")
    : null;
  const art =
    draftWeitereEinreichung?.einreichung.name ??
    (typeof artBeingCreated === "string" ? artBeingCreated : "");

  const isLocked = draftWeitereEinreichung !== null || isCreatingEinreichung;

  function handleArtChange(event: ChangeEvent<HTMLSelectElement>) {
    if (isLocked || event.target.value === "") {
      return;
    }

    formRef.current?.requestSubmit();
  }

  return (
    <div className="kern-gap-md flex w-full flex-col">
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
          disabled={isLocked}
        />
      </Form>

      {createEinreichungError && (
        <Alert type="error" title={createEinreichungError} />
      )}
    </div>
  );
}
