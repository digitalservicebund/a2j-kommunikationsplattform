import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";

export type ReadinessBadgeLabels = {
  ready: string;
  soon: string;
  checking: string;
  problem: string;
  warning: string;
  notAvailable: string;
};

export type ReadinessPresentation = {
  readinessLabel: string;
  readinessBadgeClass: "success" | "warning" | "danger" | "info";
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

  if (validierungsstatus.ergebnis === "NICHT_VERFUEGBAR") {
    // Provisional: treating every NICHT_VERFUEGBAR the same regardless of
    // Dokument typ, as it's non-blocking per the API
    // Pending confirmed product requirements for this state.
    return {
      readinessLabel: badgeLabels.notAvailable,
      readinessBadgeClass: "info",
    };
  }

  return { readinessLabel: badgeLabels.ready, readinessBadgeClass: "success" };
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
