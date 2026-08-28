import { RefObject, Suspense } from "react";
import { Await } from "react-router";
import Button from "~/components/Button";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDocumentsFormSectionProps = {
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

export default function VerfahrenDocumentsFormSection({
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
}: Readonly<VerfahrenDocumentsFormSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container mb-kern-space-default">
        <header className="kern-card__header">
          <hgroup>
            <h3 className="kern-title">
              {routes.verfahrenNeu.step2.form.assets.title}
            </h3>
          </hgroup>
        </header>
        <section className="kern-card__body">
          <p className="kern-body">
            {routes.verfahrenNeu.step2.form.assets.description}
          </p>

          <Suspense fallback={<div>Dokumente werden geladen ...</div>}>
            <Await resolve={dokumente}>
              {(resolvedData: Dokument[]) =>
                resolvedData.length > 1 && (
                  <div className="mt-kern-space-default mb-kern-space-large gap-kern-space-default flex w-full flex-col">
                    {uploadedDokumente.map((dokumente) => {
                      const dokument = dokumente;

                      if (!dokument) {
                        return null;
                      }

                      return (
                        <div
                          key={dokument.id}
                          className="p-kern-space-default align-center gap-kern-space-default rounded-kern-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)"
                        >
                          <div className="flex-1">
                            <div className="kern-body kern-body--bold">
                              {dokument.anzeigename}
                            </div>

                            <div className="kern-body kern-body--small">
                              {formatDokumentSize(dokument.sizeInBytes)}
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

          <div className="gap-kern-space-default flex w-full flex-col">
            <div
              className={
                showFileInputError
                  ? "kern-form-input--error kern-form-input"
                  : "kern-form-input"
              }
            >
              <label className="kern-label" htmlFor="file">
                {shared.form.uploadDokument.label}
              </label>
              <div className="kern-hint" id="input-file-hint">
                {shared.form.uploadDokument.hint}
              </div>
              <input
                ref={uploadFileInputRef}
                className={
                  showFileInputError
                    ? "kern-form-input__input kern-form-input__input--error"
                    : "kern-form-input__input"
                }
                id="file"
                name="file"
                type="file"
                onChange={onFileInputChange}
                aria-describedby={
                  showFileInputError
                    ? "input-file-hint file-input-error"
                    : "input-file-hint"
                }
              />
              {showFileInputError && (
                <p className="kern-error" id="file-input-error">
                  <span
                    className="kern-icon kern-icon--danger kern-icon--md"
                    aria-hidden="true"
                  ></span>
                  <span className="kern-body">
                    {shared.form.uploadDokument.error}
                  </span>
                </p>
              )}
            </div>
            <VerfahrenDokumentTypeSelect
              label={shared.form.selectDokumentType.label}
              id="type"
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
        </section>
      </div>
    </div>
  );
}
