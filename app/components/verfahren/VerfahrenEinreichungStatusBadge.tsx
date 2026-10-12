import StatusBadge from "~/components/StatusBadge";
import { getBelegStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import { ReadinessPresentation } from "~/components/verfahren/presentation/validierungPresentation";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";

type VerfahrenEinreichungStatusBadgeProps = {
  beleg: Beleg | null;
  readinessPresentation: ReadinessPresentation | null;
  hasValidationIssues: boolean;
  belegBadgeLabels: { pending: string; ready: string };
};

// Once a Beleg exists, the badge reflects the Beleg's own status instead of
// the pre-submission Validierungslauf readiness. Before that, it's hidden
// while validation issues are already surfaced via the outcome Alert, to
// avoid showing the same information twice.
export default function VerfahrenEinreichungStatusBadge({
  beleg,
  readinessPresentation,
  hasValidationIssues,
  belegBadgeLabels,
}: Readonly<VerfahrenEinreichungStatusBadgeProps>) {
  if (!beleg && hasValidationIssues) {
    return null;
  }

  const presentation = beleg
    ? getBelegStatusPresentation(beleg.status, belegBadgeLabels)
    : readinessPresentation;

  if (!presentation) {
    return null;
  }

  return (
    <p className="kern-preline">
      <StatusBadge
        state={presentation.state}
        label={presentation.label}
        loading={presentation.loading}
      />
    </p>
  );
}
