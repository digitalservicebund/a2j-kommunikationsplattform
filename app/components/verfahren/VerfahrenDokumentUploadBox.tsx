import { ChangeEvent } from "react";
import { Form } from "react-router";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import type {
  Dokument,
  UploadDokumentType,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

export type VerfahrenDokumentUploadBoxProps = {
  typ: UploadDokumentType;
  dokumente: Dokument[];
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
      {dokumente.length > 0 && (
        <ul
          className="kern-mt-md kern-mb-lg kern-px-none kern-gap-md flex w-full flex-col"
          aria-label={routes.verfahrenNeu.dokumente.uploadedListLabel}
        >
          {dokumente.map((dokument) => (
            <li
              key={dokument.id}
              className="kern-p-md align-center kern-gap-md flex flex-wrap rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)"
            >
              <div className="flex-1">
                <div className="kern-body kern-body--bold">
                  {dokument.anzeigename}
                </div>
                <div className="kern-body kern-body--small">
                  {formatDokumentSize(dokument.sizeInBytes ?? 0)}
                </div>
              </div>

              <Form method="post" className="flex items-center">
                <input
                  type="hidden"
                  name="einreichungId"
                  value={einreichungId}
                />
                <input type="hidden" name="dokumentId" value={dokument.id} />
                <Button
                  appearance="secondary"
                  className="kern-btn--x-small"
                  type="submit"
                  name="formType"
                  value="delete"
                  disabled={disabled}
                  label={shared.form.deleteDokument.label}
                >
                  <span
                    className="kern-icon kern-icon--delete"
                    aria-hidden="true"
                  ></span>
                </Button>
              </Form>
            </li>
          ))}
        </ul>
      )}

      {canUpload && (
        <Form method="post" encType="multipart/form-data">
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
