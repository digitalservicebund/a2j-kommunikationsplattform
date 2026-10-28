import { ChangeEvent } from "react";
import { Form } from "react-router";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import VerfahrenDokumentItem from "~/components/verfahren/VerfahrenDokumentItem";
import VerfahrenDokumentSichtbarkeitForm from "~/components/verfahren/VerfahrenDokumentSichtbarkeitForm";
import type {
  Dokument,
  UploadDokumentType,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

export type VerfahrenDokumentUploadBoxProps = {
  typ: UploadDokumentType;
  dokumente: Dokument[];
  verfahrenId: string | undefined;
  einreichungId: string | undefined;
  // Only one Dokument may be uploaded, e.g. the Klageschrift
  single?: boolean;
  accept?: string;
  disabled: boolean;
  showFileError: boolean;
};

/**
 * Lists the uploaded Dokumente of one type and uploads further ones as soon
 * as a file is selected.
 */
export default function VerfahrenDokumentUploadBox({
  typ,
  dokumente,
  verfahrenId,
  einreichungId,
  single = false,
  accept,
  disabled,
  showFileError,
}: Readonly<VerfahrenDokumentUploadBoxProps>) {
  const { routes, shared } = useTranslations();
  const typeTranslations = routes.verfahrenNeu.dokumente.types[typ];
  const { title, description } = typeTranslations;
  const hint =
    "hint" in typeTranslations
      ? typeTranslations.hint
      : shared.form.uploadDokument.hint;
  const canUpload = !single || dokumente.length === 0;

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
    <FieldsetCard
      id={`dokumente-${typ.toLowerCase()}`}
      title={title}
      subline={description}
      TitleComponent="h3"
    >
      {/* Uploaded Dokumente always belong to an existing Verfahren */}
      {verfahrenId && einreichungId && dokumente.length > 0 && (
        <ul
          className="kern-mt-md kern-mb-lg kern-px-none kern-gap-md flex w-full flex-col"
          aria-label={routes.verfahrenNeu.dokumente.uploadedListLabel}
        >
          {dokumente.map((dokument) => (
            <li key={dokument.id}>
              <VerfahrenDokumentItem
                dokument={dokument}
                verfahrenId={verfahrenId}
                einreichungId={einreichungId}
              >
                <div className="kern-gap-sm flex items-end">
                  <VerfahrenDokumentSichtbarkeitForm
                    dokument={dokument}
                    verfahrenId={verfahrenId}
                    einreichungId={einreichungId}
                    disabled={disabled}
                  />
                  <Form method="post" className="flex items-center">
                    <input
                      type="hidden"
                      name="einreichungId"
                      value={einreichungId}
                    />
                    <input
                      type="hidden"
                      name="dokumentId"
                      value={dokument.id}
                    />
                    <Button
                      appearance="secondary"
                      className="kern-btn--x-small border-feedback-danger"
                      type="submit"
                      name="formType"
                      value="delete"
                      disabled={disabled}
                    >
                      <span
                        className="kern-icon kern-icon--delete bg-feedback-danger"
                        aria-hidden="true"
                      ></span>
                      <span className="kern-label kern-sr-only">
                        {shared.form.deleteDokument.label}
                      </span>
                    </Button>
                  </Form>
                </div>
              </VerfahrenDokumentItem>
            </li>
          ))}
        </ul>
      )}

      {canUpload && (
        <Form
          method="post"
          encType="multipart/form-data"
          // After the first upload has created the Verfahren, going back must
          // not return to the page that would create another one
          replace
        >
          <input type="hidden" name="formType" value="upload" />
          <input type="hidden" name="typ" value={typ} />
          {einreichungId && (
            <input type="hidden" name="einreichungId" value={einreichungId} />
          )}
          <InputFile
            id={`file-${typ.toLowerCase()}`}
            name="file"
            label={shared.form.uploadDokument.label}
            hint={hint}
            accept={accept}
            error={showFileError ? shared.form.uploadDokument.error : undefined}
            // KERN recommends aria-disabled over disabled to keep the input
            // reachable; it doesn't block anything itself, so do it here
            aria-disabled={disabled}
            onClick={(event) => disabled && event.preventDefault()}
            onChange={handleFileChange}
          />
        </Form>
      )}
    </FieldsetCard>
  );
}
