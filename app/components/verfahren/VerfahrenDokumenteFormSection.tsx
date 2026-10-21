import { RefObject } from "react";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { AnlagenDokumentTypeSchema } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

export type VerfahrenDokumenteFormSectionProps = {
  id?: string;
  uploadedDokumente: Dokument[];
  disabled?: boolean;
  uploading?: boolean;
  showFileInputError: boolean;
  uploadFileInputRef: RefObject<HTMLInputElement | null>;
  onFileInputChange: () => void;
  selectedDokumentType: string;
  onDokumentTypeChange: (value: string) => void;
  dokumentTypeError: string | false | undefined;
  onDeleteDokument: (dokument: Dokument) => void;
};

export default function VerfahrenDokumenteFormSection({
  id,
  uploadedDokumente,
  uploading,
  disabled = false,
  showFileInputError,
  uploadFileInputRef,
  onFileInputChange,
  selectedDokumentType,
  onDokumentTypeChange,
  dokumentTypeError,
  onDeleteDokument,
}: Readonly<VerfahrenDokumenteFormSectionProps>) {
  const t = useTranslations();

  return (
    <FieldsetCard
      id={id}
      title={t.routes.verfahrenNeu.step2.form.assets.title}
      subline={t.routes.verfahrenNeu.step2.form.assets.description}
      TitleComponent="h3"
    >
      {uploadedDokumente.length > 0 && (
        <ul
          className="kern-mt-md kern-mb-lg kern-px-none kern-gap-md flex w-full flex-col"
          aria-label={t.routes.verfahrenNeu.step2.form.assets.listLabel}
        >
          {uploadedDokumente.map((dokument) => {
            return (
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

                <div className="flex items-center">
                  <Button
                    appearance="secondary"
                    className="kern-btn--x-small"
                    type="button"
                    onClick={() => onDeleteDokument(dokument)}
                    disabled={disabled}
                    label={t.shared.form.deleteDokument.label}
                  >
                    <span
                      className="kern-icon kern-icon--delete"
                      aria-hidden="true"
                    ></span>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="kern-gap-md flex w-full flex-col">
        <InputFile
          ref={uploadFileInputRef}
          label={t.shared.form.uploadDokument.label}
          id="file"
          hint={t.shared.form.uploadDokument.hint}
          error={
            showFileInputError ? t.shared.form.uploadDokument.error : undefined
          }
          disabled={disabled || uploading}
          onChange={onFileInputChange}
        />
        <VerfahrenDokumentTypeSelect
          label={t.shared.form.selectDokumentType.label}
          id="type"
          types={AnlagenDokumentTypeSchema.options}
          placeholder={t.shared.form.select.placeholder}
          onChange={(e) => onDokumentTypeChange(e.target.value)}
          selectedValue={selectedDokumentType}
          hint={t.shared.form.selectDokumentType.hint}
          error={dokumentTypeError || undefined}
        />

        <div className="flex justify-end">
          <Button
            appearance="secondary"
            type="submit"
            name="formType"
            value="upload"
            disabled={disabled || uploading}
            label={
              uploading
                ? t.shared.form.uploadDokument.submitting
                : t.shared.form.uploadDokument.submit
            }
          />
        </div>
      </div>
    </FieldsetCard>
  );
}
