import { RefObject, Suspense } from "react";
import { Await } from "react-router";
import Button from "~/components/Button";
import InputFile from "~/components/InputFile";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { AnlagenDokumentTypeSchema } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

type VerfahrenDokumenteFormSectionProps = {
  id?: string;
  dokumente: Dokument[];
  uploadedDokumente: Dokument[];
  submitState: string;
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
  dokumente,
  uploadedDokumente,
  submitState,
  showFileInputError,
  uploadFileInputRef,
  onFileInputChange,
  selectedDokumentType,
  onDokumentTypeChange,
  dokumentTypeError,
  onDeleteDokument,
}: Readonly<VerfahrenDokumenteFormSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <FieldsetCard
      id={id}
      title={routes.verfahrenNeu.step2.form.assets.title}
      subline={routes.verfahrenNeu.step2.form.assets.description}
      TitleComponent="h3"
    >
      <Suspense fallback={<div>Dokumente werden geladen ...</div>}>
        <Await resolve={dokumente}>
          {(resolvedData: Dokument[]) =>
            resolvedData.length > 1 && (
              <div className="kern-mt-md kern-mb-lg kern-gap-md flex w-full flex-col">
                {uploadedDokumente.map((dokument) => {
                  if (!dokument) {
                    return null;
                  }

                  return (
                    <div
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
                          disabled={submitState !== "idle"}
                          label={shared.form.deleteDokument.label}
                        >
                          <span
                            className="kern-icon kern-icon--delete"
                            aria-hidden="true"
                          ></span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </Await>
      </Suspense>

      <div className="kern-gap-md flex w-full flex-col">
        <InputFile
          ref={uploadFileInputRef}
          label={shared.form.uploadDokument.label}
          id="file"
          hint={shared.form.uploadDokument.hint}
          error={
            showFileInputError ? shared.form.uploadDokument.error : undefined
          }
          onChange={onFileInputChange}
        />
        <VerfahrenDokumentTypeSelect
          label={shared.form.selectDokumentType.label}
          id="type"
          types={AnlagenDokumentTypeSchema.options}
          placeholder={shared.form.select.placeholder}
          onChange={(e) => onDokumentTypeChange(e.target.value)}
          selectedValue={selectedDokumentType}
          hint={shared.form.selectDokumentType.hint}
          error={dokumentTypeError || undefined}
        />

        <div className="flex justify-end">
          <Button
            appearance="secondary"
            type="submit"
            name="formType"
            value="upload"
            disabled={submitState !== "idle"}
            label={
              submitState === "upload" ? "Wird hochgeladen..." : "Hochladen"
            }
          />
        </div>
      </div>
    </FieldsetCard>
  );
}
