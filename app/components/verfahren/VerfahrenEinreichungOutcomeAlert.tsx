import Alert from "~/components/Alert";
import VerfahrenBelegStatusAlert from "~/components/verfahren/VerfahrenBelegStatusAlert";
import type { Beleg } from "~/domains/verfahren/schemas/belegSchema";
import { useTranslations } from "~/services/translations/context";

type VerfahrenEinreichungOutcomeAlertProps = {
  hasSubmitError: boolean;
  beleg: Beleg | null;
  hasValidationIssues: boolean;
  isValidationErrorFatal: boolean;
  readinessLabel: string;
  fehler: string[];
};

// Single place that decides which of the (mutually exclusive) einreichen
// outcomes to show: a client-side submit failure, the Beleg's own
// pending/ready status, or — before any Beleg exists — pre-submission
// Validierungslauf issues.
export default function VerfahrenEinreichungOutcomeAlert({
  hasSubmitError,
  beleg,
  hasValidationIssues,
  isValidationErrorFatal,
  readinessLabel,
  fehler,
}: Readonly<VerfahrenEinreichungOutcomeAlertProps>) {
  const { shared } = useTranslations();

  if (hasSubmitError) {
    return (
      <Alert
        type="error"
        title={shared.form.submit.title}
        message={shared.form.submit.message}
      />
    );
  }

  if (beleg) {
    return <VerfahrenBelegStatusAlert beleg={beleg} />;
  }

  if (!hasValidationIssues) {
    return null;
  }

  return (
    <Alert
      type={isValidationErrorFatal ? "error" : "warning"}
      title={readinessLabel}
      message={fehler.join("\n")}
    />
  );
}
