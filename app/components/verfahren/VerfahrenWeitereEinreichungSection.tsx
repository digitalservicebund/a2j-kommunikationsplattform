import { Form, useActionData, useNavigation } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import InputFile from "~/components/InputFile";
import VerfahrenDokumenteList from "~/components/verfahren/VerfahrenDokumenteList";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

export const UPLOAD_WEITERE_DOKUMENT_FORM_TYPE = "upload-weitere-dokument";

type UploadActionData = { formType?: string };

type VerfahrenWeitereEinreichungSectionProps = {
  draftWeitereEinreichung: EinreichungDetails;
};

export default function VerfahrenWeitereEinreichungSection({
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungSectionProps>) {
  const { routes, shared } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;
  const { einreichung, dokumente } = draftWeitereEinreichung;

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
  const isUploading =
    navigation.state !== "idle" &&
    navigation.formData?.get("formType") === UPLOAD_WEITERE_DOKUMENT_FORM_TYPE;

  const isValidating = dokumente.some((dokument) =>
    isValidierungslaufRunning(dokument.validierungsstatus),
  );
  const hasUploadedDokumente = dokumente.some(
    (dokument) => dokument.typ !== "XJUSTIZ",
  );

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({ isValidating, isBelegPending: false });

  return (
    <div className="kern-gap-md flex w-full flex-col">
      <VerfahrenDokumenteList
        dokumente={dokumente}
        einreichungId={einreichung.id}
      />

      {/* Keyed by the Dokument count so the form (incl. the selected file)
          resets after a successful upload, but keeps its values on failure. */}
      <Form
        key={dokumente.length}
        method="post"
        encType="multipart/form-data"
        className="kern-gap-md flex flex-col"
      >
        <input
          type="hidden"
          name="formType"
          value={UPLOAD_WEITERE_DOKUMENT_FORM_TYPE}
        />
        <input type="hidden" name="einreichungId" value={einreichung.id} />

        <InputFile
          id="file"
          label={shared.form.uploadDokument.label}
          hint={shared.form.uploadDokument.hint}
          error={hasFileError ? shared.form.uploadDokument.error : undefined}
        />

        <fieldset className="kern-fieldset">
          <legend className="kern-label">{labels.sichtbarkeit.label}</legend>
          <div className="kern-fieldset__body">
            <div className="kern-form-check">
              <input
                type="radio"
                className="kern-form-check__radio"
                id="sichtbarkeitAlle-true"
                name="sichtbarkeitAlle"
                value="true"
                defaultChecked
              />
              <label className="kern-label" htmlFor="sichtbarkeitAlle-true">
                {labels.sichtbarkeit.alleParteien}
              </label>
            </div>
            <div className="kern-form-check">
              <input
                type="radio"
                className="kern-form-check__radio"
                id="sichtbarkeitAlle-false"
                name="sichtbarkeitAlle"
                value="false"
              />
              <label className="kern-label" htmlFor="sichtbarkeitAlle-false">
                {labels.sichtbarkeit.nurGerichtUndPartei}
              </label>
            </div>
          </div>
        </fieldset>

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

      {error && (
        <Alert type="error" title={shared.form.errors.einreichungFailed} />
      )}

      <Form
        ref={formRef}
        method="post"
        onSubmit={handleSubmit}
        className="flex justify-end"
      >
        <input type="hidden" name="formType" value="einreichen" />
        <input type="hidden" name="einreichungId" value={einreichung.id} />
        <Button
          appearance="primary"
          type="submit"
          disabled={
            isSubmitting === "submitting" ||
            isValidating ||
            !hasUploadedDokumente
          }
          label={labels.submit}
        />
      </Form>
    </div>
  );
}
