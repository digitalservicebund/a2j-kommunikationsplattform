import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import {
  ReadinessPresentation,
  resolveBelegPresentation,
} from "~/components/verfahren/presentation/einreichungReadiness";
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
    ? resolveBelegPresentation(beleg, belegBadgeLabels)
    : readinessPresentation;

  if (!presentation) {
    return null;
  }

  return (
    <p className="kern-preline">
      <VerfahrenStatusBadge
        small
        tone={presentation.readinessBadgeClass}
        label={presentation.readinessLabel}
      />
    </p>
  );
}
