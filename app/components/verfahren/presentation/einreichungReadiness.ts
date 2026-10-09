import type { BadgeTone } from "~/components/Badge";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";

export type ReadinessBadgeLabels = {
  ready: string;
  soon: string;
  checking: string;
  problem: string;
  warning: string;
};

export type ReadinessPresentation = {
  readinessLabel: string;
  readinessBadgeClass: BadgeTone;
};

export function resolveReadinessPresentation(
  validierungsstatus: Validierungsstatus,
  badgeLabels: ReadinessBadgeLabels,
  // Additional Validierungsstatus (e.g. of the Einreichung's Dokumente) that
  // should also mark this badge as "still checking" — keeps an aggregate
  // badge consistent with the individual badges it summarizes.
  relatedValidierungsstatus: Validierungsstatus[] = [],
): ReadinessPresentation {
  if (
    isValidierungslaufRunning(validierungsstatus) ||
    relatedValidierungsstatus.some(isValidierungslaufRunning)
  ) {
    return {
      readinessLabel: badgeLabels.checking,
      readinessBadgeClass: "info",
    };
  }

  if (validierungsstatus.ergebnis === "GRUEN") {
    return {
      readinessLabel: badgeLabels.ready,
      readinessBadgeClass: "success",
    };
  }

  if (validierungsstatus.ergebnis === "ROT") {
    return {
      readinessLabel: badgeLabels.problem,
      readinessBadgeClass: "danger",
    };
  }

  if (validierungsstatus.ergebnis === "GELB") {
    return {
      readinessLabel: badgeLabels.warning,
      readinessBadgeClass: "warning",
    };
  }

  return { readinessLabel: badgeLabels.soon, readinessBadgeClass: "warning" };
}

// A single Dokument that passed its check reads as "checked clean" rather than
// "ready to submit", since readiness only applies to the Einreichung as a whole.
export function resolveDokumentPresentation(
  validierungsstatus: Validierungsstatus,
  badgeLabels: ReadinessBadgeLabels & { checkedClean: string },
): ReadinessPresentation {
  return resolveReadinessPresentation(validierungsstatus, {
    ...badgeLabels,
    ready: badgeLabels.checkedClean,
  });
}

export type BelegBadgeLabels = {
  pending: string;
  ready: string;
};

export function resolveBelegPresentation(
  beleg: Beleg,
  badgeLabels: BelegBadgeLabels,
): ReadinessPresentation {
  if (beleg.status === "ERSTELLT") {
    return {
      readinessLabel: badgeLabels.ready,
      readinessBadgeClass: "success",
    };
  }

  return { readinessLabel: badgeLabels.pending, readinessBadgeClass: "info" };
}
