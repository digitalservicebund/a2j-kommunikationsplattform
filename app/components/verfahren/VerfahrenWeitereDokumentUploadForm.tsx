import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import InputSelect from "~/components/InputSelect";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

export const UPLOAD_WEITERE_DOKUMENT_FORM_TYPE = "upload-weitere-dokument";

type UploadActionData = { formType?: string };

type VerfahrenWeitereDokumentUploadFormProps = {
  einreichungId: string;
};

export default function VerfahrenWeitereDokumentUploadForm({
  einreichungId,
}: Readonly<VerfahrenWeitereDokumentUploadFormProps>) {
  const { routes, shared } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;

  const [selectedDokumentType, setSelectedDokumentType] = useState("");
  const [sichtbarkeitAlle, setSichtbarkeitAlle] = useState("true");

  const navigation = useNavigation();
  const actionData = useActionData<ActionResult<UploadActionData>>();
  const isUploadResult =
    actionData?.data?.formType === UPLOAD_WEITERE_DOKUMENT_FORM_TYPE;
  const uploadError =
    isUploadResult && actionData.status === "error" ? actionData.error : null;
  const hasFileError =
    isUploadResult &&
    actionData.status === "invalid" &&
    Boolean(actionData.fieldErrors.file);
  const hasDokumentTypeError =
    isUploadResult &&
    actionData.status === "invalid" &&
    Boolean(actionData.fieldErrors.type) &&
    selectedDokumentType === "";
  const isUploading =
    navigation.state !== "idle" &&
    navigation.formData?.get("formType") === UPLOAD_WEITERE_DOKUMENT_FORM_TYPE;

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      preventScrollReset
      className="kern-gap-md flex flex-col"
    >
      <input
        type="hidden"
        name="formType"
        value={UPLOAD_WEITERE_DOKUMENT_FORM_TYPE}
      />
      <input type="hidden" name="einreichungId" value={einreichungId} />

      <InputFile
        id="file"
        label={shared.form.uploadDokument.label}
        hint={shared.form.uploadDokument.hint}
        error={hasFileError ? shared.form.uploadDokument.error : undefined}
      />

      <VerfahrenDokumentTypeSelect
        id="type"
        label={shared.form.selectDokumentType.label}
        hint={shared.form.selectDokumentType.hint}
        placeholder={shared.form.select.placeholder}
        selectedValue={selectedDokumentType}
        onChange={(event) => setSelectedDokumentType(event.target.value)}
        error={
          hasDokumentTypeError
            ? shared.form.selectDokumentType.error
            : undefined
        }
      />

      <InputSelect
        id="sichtbarkeitAlle"
        label={labels.sichtbarkeit.label}
        options={[
          { value: "true", label: labels.sichtbarkeit.alleParteien },
          { value: "false", label: labels.sichtbarkeit.nurGerichtUndPartei },
        ]}
        selectedValue={sichtbarkeitAlle}
        onChange={(event) => setSichtbarkeitAlle(event.target.value)}
      />

      {uploadError && <Alert type="error" title={uploadError} />}

      <div className="flex justify-end">
        <Button
          appearance="secondary"
          type="submit"
          disabled={isUploading}
          label={isUploading ? labels.uploading : labels.upload}
        />
      </div>
    </Form>
  );
}
