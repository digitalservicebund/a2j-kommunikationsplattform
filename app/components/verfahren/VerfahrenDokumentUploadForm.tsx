import { useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import InputRadio from "~/components/InputRadio";
import { SIGNATURDATEI_UPLOAD_FAILED_PARAM } from "~/config/signaturdateiUploadFailed";
import type { UploadDokumentType } from "~/domains/verfahren/entities/dokument/dokument.entity";
import {
  SIGNATURDATEI_EXTENSIONS,
  SIGNATURDATEI_MIME_TYPES,
} from "~/domains/verfahren/services/isSignaturdatei";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

type UploadActionData = { formType?: string; typ?: string };

const DOKUMENT_TYPES: readonly UploadDokumentType[] = [
  "SCHRIFTSTUECK",
  "ANHANG",
];

const ACCEPTED_FILE_TYPES = [
  // Word
  ".docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // PDF
  ".pdf",
  "application/pdf",
].join(",");

const ACCEPTED_SIGNATURDATEI_TYPES = [
  ...SIGNATURDATEI_EXTENSIONS,
  ...SIGNATURDATEI_MIME_TYPES,
].join(",");

export type VerfahrenDokumentUploadFormProps = {
  einreichungId: string | undefined;
  hasSchriftstueck: boolean;
  schriftstueckLabel?: string;
  disabled: boolean;
};

export default function VerfahrenDokumentUploadForm({
  einreichungId,
  hasSchriftstueck,
  schriftstueckLabel,
  disabled,
}: Readonly<VerfahrenDokumentUploadFormProps>) {
  const t = useTranslations();

  const labels = t.shared.form.dokumentUpload;
  const [typ, setTyp] = useState<UploadDokumentType>(
    hasSchriftstueck ? "ANHANG" : "SCHRIFTSTUECK",
  );

  const actionData = useActionData<ActionResult<UploadActionData>>();
  const isUploadResult = actionData?.data?.formType === "upload";
  const [searchParams] = useSearchParams();
  const signaturdateiUploadError =
    einreichungId !== undefined &&
    searchParams.get(SIGNATURDATEI_UPLOAD_FAILED_PARAM) === einreichungId
      ? t.shared.form.errors.signaturdateiUploadFailed
      : undefined;
  const uploadError =
    isUploadResult && actionData.status === "error"
      ? actionData.error
      : signaturdateiUploadError;
  const fieldErrors =
    isUploadResult && actionData.status === "invalid"
      ? actionData.fieldErrors
      : undefined;
  const showSignaturdateiError = Boolean(fieldErrors?.signaturdatei);
  const showFileError =
    Boolean(fieldErrors?.file) ||
    (fieldErrors !== undefined && !showSignaturdateiError);

  const navigation = useNavigation();
  const isUploading =
    navigation.state !== "idle" &&
    navigation.formData?.get("formType") === "upload";

  const isTypUnavailable = (option: UploadDokumentType) =>
    option === "SCHRIFTSTUECK" && hasSchriftstueck;

  const handleTypChange = (option: UploadDokumentType) => {
    // aria-disabled doesn't block the selection itself
    if (disabled || isTypUnavailable(option)) {
      return;
    }

    setTyp(option);
  };

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      preventScrollReset
      // After the first upload has created the Verfahren, going back must
      // not return to the page that would create another one
      replace
      className="kern-gap-md flex flex-col"
    >
      <input type="hidden" name="formType" value="upload" />
      {einreichungId && (
        <input type="hidden" name="einreichungId" value={einreichungId} />
      )}

      <fieldset className="kern-fieldset">
        <legend className="kern-label">{labels.typLegend}</legend>
        <div className="kern-fieldset__body kern-fieldset__body--horizontal">
          {DOKUMENT_TYPES.map((option) => {
            const id = `dokument-typ-${option.toLowerCase()}`;
            const label =
              option === "SCHRIFTSTUECK" && schriftstueckLabel
                ? schriftstueckLabel
                : t.shared.dokumentType[option];

            return (
              <InputRadio
                key={option}
                id={id}
                name="typ"
                value={option}
                label={
                  isTypUnavailable(option)
                    ? `${label} ${labels.alreadyUploaded}`
                    : label
                }
                checked={typ === option}
                onChange={() => handleTypChange(option)}
                aria-disabled={disabled || isTypUnavailable(option)}
              />
            );
          })}
        </div>
      </fieldset>

      <InputFile
        id="dokument-upload-file"
        name="file"
        label={t.shared.form.uploadDokument.label}
        hint={labels.hint}
        accept={ACCEPTED_FILE_TYPES}
        error={showFileError ? t.shared.form.uploadDokument.error : undefined}
        aria-disabled={disabled}
        onClick={(event) => disabled && event.preventDefault()}
      />

      <InputFile
        id="dokument-upload-signaturdatei"
        name="signaturdatei"
        label={labels.signaturdatei.label}
        hint={labels.signaturdatei.hint}
        accept={ACCEPTED_SIGNATURDATEI_TYPES}
        error={showSignaturdateiError ? labels.signaturdatei.error : undefined}
        aria-disabled={disabled}
        onClick={(event) => disabled && event.preventDefault()}
      />

      {uploadError && <Alert type="error" title={uploadError} />}

      <div className="flex justify-end">
        <Button
          appearance="secondary"
          type="submit"
          aria-disabled={disabled}
          onClick={(event) => disabled && event.preventDefault()}
          label={isUploading ? labels.submitting : labels.submit}
        />
      </div>
    </Form>
  );
}
