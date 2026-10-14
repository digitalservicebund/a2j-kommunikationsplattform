import type { StatusBadgePresentation } from "~/components/StatusBadge";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";

export type ValidierungBadgeLabels = {
  ready: string;
  soon: string;
  checking: string;
  problem: string;
  warning: string;
};

// The rules shared by the Einreichung and Dokument badges: "still checking"
// while a Validierungslauf is running, otherwise the Validierungslauf's result.
function resolveValidierungPresentation(
  { ergebnis }: Validierungsstatus,
  badgeLabels: ValidierungBadgeLabels,
  isChecking: boolean,
): StatusBadgePresentation {
  if (isChecking) {
    return {
      label: badgeLabels.checking,
      state: "pending",
      loading: true,
    };
  }

  if (ergebnis === "GRUEN") {
    return {
      label: badgeLabels.ready,
      state: "done",
      loading: false,
    };
  }

  if (ergebnis === "ROT") {
    return {
      label: badgeLabels.problem,
      state: "failed",
      loading: false,
    };
  }

  if (ergebnis === "GELB") {
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

export function resolveEinreichungPresentation(
  validierungsstatus: Validierungsstatus,
  badgeLabels: ValidierungBadgeLabels,
  // Additional Validierungsstatus (e.g. of the Einreichung's Dokumente) that
  // should also mark this badge as "still checking" — keeps an aggregate
  // badge consistent with the individual badges it summarizes.
  relatedValidierungsstatus: Validierungsstatus[] = [],
): StatusBadgePresentation {
  return resolveValidierungPresentation(
    validierungsstatus,
    badgeLabels,
    isValidierungslaufRunning(validierungsstatus) ||
      relatedValidierungsstatus.some(isValidierungslaufRunning),
  );
}

// A single Dokument that passed its check reads as "checked clean" rather than
// "ready to submit", since readiness only applies to the Einreichung as a whole.
export function resolveDokumentPresentation(
  validierungsstatus: Validierungsstatus,
  badgeLabels: ValidierungBadgeLabels & { checkedClean: string },
): StatusBadgePresentation {
  return resolveValidierungPresentation(
    validierungsstatus,
    { ...badgeLabels, ready: badgeLabels.checkedClean },
    isValidierungslaufRunning(validierungsstatus),
  );
}
