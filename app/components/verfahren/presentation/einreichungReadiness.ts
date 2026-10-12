import type { StatusBadgeState } from "~/components/StatusBadge";
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
  label: string;
  state: StatusBadgeState;
  loading: boolean;
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
      label: badgeLabels.checking,
      state: "pending",
      loading: true,
    };
  }

  if (validierungsstatus.ergebnis === "GRUEN") {
    return {
      label: badgeLabels.ready,
      state: "done",
      loading: false,
    };
  }

  if (validierungsstatus.ergebnis === "ROT") {
    return {
      label: badgeLabels.problem,
      state: "failed",
      loading: false,
    };
  }

  if (validierungsstatus.ergebnis === "GELB") {
    return {
      label: badgeLabels.warning,
      state: "attention",
      loading: false,
    };
  }

  return {
    label: badgeLabels.soon,
    state: "attention",
    loading: false,
  };
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
      label: badgeLabels.ready,
      state: "done",
      loading: false,
    };
  }

  return {
    label: badgeLabels.pending,
    state: "pending",
    loading: true,
  };
}
