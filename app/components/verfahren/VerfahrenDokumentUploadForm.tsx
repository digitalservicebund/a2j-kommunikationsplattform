import { ChangeEvent, useState } from "react";
import { Form, useActionData } from "react-router";
import Alert from "~/components/Alert";
import InputFile from "~/components/InputFile";
import type { UploadDokumentType } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

type UploadActionData = { formType?: string; typ?: string };

const DOKUMENT_TYPES: readonly UploadDokumentType[] = [
  "SCHRIFTSTUECK",
  "ANHANG",
  "SIGNATURDATEI",
];

const ACCEPTED_SCHRIFTSTUECK_FILE_TYPES = [
  // Word
  ".docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // PDF
  ".pdf",
  "application/pdf",
].join(",");

export type VerfahrenDokumentUploadFormProps = {
  // Undefined until the Einreichung exists (e.g. before the Klageeinreichung's
  // first upload, which creates it)
  einreichungId: string | undefined;
  // An Einreichung has only one Schriftstück
  hasSchriftstueck: boolean;
  // Overrides the Schriftstück's type label, e.g. to call it the Klageschrift
  schriftstueckLabel?: string;
  disabled: boolean;
};

/**
 * Uploads a Dokument of the chosen type as soon as a file is selected. The
 * Schriftstück is preselected until one exists, then the Anlage. The route's
 * action handles the "upload" formType (see einreichungDokumentActions.server).
 *
 * Keyed by the parent on the Dokumente count, so the type and file reset
 * after each successful upload.
 */
export default function VerfahrenDokumentUploadForm({
  einreichungId,
  hasSchriftstueck,
  schriftstueckLabel,
  disabled,
}: Readonly<VerfahrenDokumentUploadFormProps>) {
  const { shared } = useTranslations();
  const labels = shared.form.dokumentUpload;
  const [typ, setTyp] = useState<UploadDokumentType>(
    hasSchriftstueck ? "ANHANG" : "SCHRIFTSTUECK",
  );

  const actionData = useActionData<ActionResult<UploadActionData>>();
  const isUploadResult = actionData?.data?.formType === "upload";
  const uploadError =
    isUploadResult && actionData.status === "error"
      ? actionData.error
      : undefined;
  const showFileError = isUploadResult && actionData.status === "invalid";

  const isTypUnavailable = (option: UploadDokumentType) =>
    option === "SCHRIFTSTUECK" && hasSchriftstueck;

  const handleTypChange = (option: UploadDokumentType) => {
    // aria-disabled doesn't block the selection itself
    if (disabled || isTypUnavailable(option)) {
      return;
    }

    setTyp(option);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    // Clicks are blocked while disabled, but a file can still be dropped
    if (disabled) {
      input.value = "";
      return;
    }

    input.form?.requestSubmit();
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
                : shared.dokumentType[option];

            return (
              <div key={option} className="kern-form-check">
                <input
                  type="radio"
                  className="kern-form-check__radio"
                  id={id}
                  name="typ"
                  value={option}
                  checked={typ === option}
                  onChange={() => handleTypChange(option)}
                  aria-disabled={disabled || isTypUnavailable(option)}
                />
                <label className="kern-label" htmlFor={id}>
                  {label}
                  {isTypUnavailable(option) && ` ${labels.alreadyUploaded}`}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <InputFile
        id="dokument-upload-file"
        name="file"
        label={shared.form.uploadDokument.label}
        hint={
          typ === "SIGNATURDATEI"
            ? labels.signaturdateiHint
            : shared.form.uploadDokument.hint
        }
        accept={
          typ === "SCHRIFTSTUECK"
            ? ACCEPTED_SCHRIFTSTUECK_FILE_TYPES
            : undefined
        }
        error={showFileError ? shared.form.uploadDokument.error : undefined}
        // KERN recommends aria-disabled over disabled to keep the input
        // reachable; it doesn't block anything itself, so do it here
        aria-disabled={disabled}
        onClick={(event) => disabled && event.preventDefault()}
        onChange={handleFileChange}
      />

      {uploadError && <Alert type="error" title={uploadError} />}
    </Form>
  );
}
