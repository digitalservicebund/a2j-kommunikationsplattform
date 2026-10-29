import { Form } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import type { EinreichungDetails } from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenEinreichungDokumente from "~/components/verfahren/VerfahrenEinreichungDokumente";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";
import { useTranslations } from "~/services/translations/context";

type VerfahrenWeitereEinreichungDokumenteStepProps = {
  verfahrenId: string;
  // null until an Art has been picked, which creates the draft — the step is
  // shown disabled until then.
  draftWeitereEinreichung: EinreichungDetails | null;
};

export default function VerfahrenWeitereEinreichungDokumenteStep({
  verfahrenId,
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
    useEinreichenSubmission({
      isValidating,
      isBelegPending: false,
    });

  return (
    <div
      className={`kern-gap-md flex w-full flex-col ${isDisabled ? "opacity-50" : ""}`}
    >
      <VerfahrenEinreichungDokumente
        verfahrenId={verfahrenId}
        einreichung={draftWeitereEinreichung?.einreichung}
        dokumente={dokumente}
        disabled={isDisabled}
      />

      {error && (
        <Alert type="error" title={shared.form.errors.einreichungFailed} />
      )}

      <Form
        ref={formRef}
        method="post"
        preventScrollReset
        onSubmit={handleSubmit}
        className="flex justify-end"
      >
        <input type="hidden" name="formType" value="einreichen" />
        <input type="hidden" name="einreichungId" value={einreichungId} />
        <Button
          appearance="primary"
          type="submit"
          disabled={
            isDisabled ||
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
