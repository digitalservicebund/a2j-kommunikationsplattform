import { Form } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import VerfahrenDokumenteList from "~/components/verfahren/VerfahrenDokumenteList";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereDokumentUploadForm from "~/components/verfahren/VerfahrenWeitereDokumentUploadForm";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";
import { useTranslations } from "~/services/translations/context";

type VerfahrenWeitereEinreichungDokumenteStepProps = {
  // null until an Art has been picked, which creates the draft — the step is
  // shown disabled until then.
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungDokumenteStep({
  draftWeitereEinreichung,
}: Readonly<VerfahrenWeitereEinreichungDokumenteStepProps>) {
  const { routes, shared } = useTranslations();
  const labels = routes.verfahrenId.weitereEinreichung;
  const isDisabled = draftWeitereEinreichung === null;
  const einreichungId = draftWeitereEinreichung?.einreichung.id ?? "";
  const dokumente = draftWeitereEinreichung?.dokumente ?? [];

  const isValidating = dokumente.some((dokument) =>
    isValidierungslaufRunning(dokument.validierungsstatus),
  );
  const hasUploadedDokumente = dokumente.some(
    (dokument) => dokument.typ !== "XJUSTIZ",
  );

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({ isValidating, isBelegPending: false });

  return (
    // A disabled fieldset disables every control inside, incl. both forms.
    <fieldset
      disabled={isDisabled}
      className="kern-gap-md flex w-full flex-col disabled:opacity-50"
    >
      {hasUploadedDokumente && (
        <VerfahrenDokumenteList
          dokumente={dokumente}
          einreichungId={einreichungId}
        />
      )}

      {/* Keyed by the Dokument count so the form (incl. the selected file)
          resets after a successful upload, but keeps its values on failure. */}
      <VerfahrenWeitereDokumentUploadForm
        key={dokumente.length}
        einreichungId={einreichungId}
      />

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
        <input type="hidden" name="einreichungId" value={einreichungId} />
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
    </fieldset>
  );
}
