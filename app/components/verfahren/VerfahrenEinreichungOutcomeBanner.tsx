import Alert from "~/components/Alert";
import VerfahrenBelegStatusAlert from "~/components/verfahren/VerfahrenBelegStatusAlert";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenEinreichungOutcomeBannerProps = {
  hasSubmitError: boolean;
  beleg: Beleg | null;
  isValidating: boolean;
  hasValidationIssues: boolean;
  isValidationErrorFatal: boolean;
  readinessLabel: string;
  fehler: string[];
};

// Single place that decides which of the (mutually exclusive) einreichen
// outcomes to show: a client-side submit failure, the Beleg's own
// pending/ready status, or — before any Beleg exists — pre-submission
// Validierungslauf issues.
export default function VerfahrenEinreichungOutcomeBanner({
  hasSubmitError,
  beleg,
  isValidating,
  hasValidationIssues,
  isValidationErrorFatal,
  readinessLabel,
  fehler,
}: Readonly<VerfahrenEinreichungOutcomeBannerProps>) {
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

  // A new Validierungslauf (e.g. after regenerating xjustiz.xml) can take a
  // moment to start, during which `ergebnis`/`fehler` may still reflect the
  // *previous* run — don't surface stale errors while a fresh check is
  // already in progress.
  if (isValidating || !hasValidationIssues) {
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
