import type { StatusBadgePresentation } from "~/components/StatusBadge";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";

// `icon` is only set for a status that deliberately looks different from the
// others in its state; otherwise the badge shows the state's default icon.
type StatusPresentation<LabelKey> = Omit<StatusBadgePresentation, "label"> & {
  labelKey: LabelKey;
};

export type VerfahrenStatusBadgeLabels = {
  erstellt: string;
  eingereicht: string;
  gerichtsverfahrenAngelegt: string;
  abgeschlossen: string;
  geloescht: string;
};

export type EinreichungStatusBadgeLabels = {
  erstellt: string;
  beantragt: string;
  versendet: string;
  eingereicht: string;
  veraktet: string;
  fehlgeschlagen: string;
  geloescht: string;
};

const einreichungStatusPresentation: Record<
  Einreichung["status"],
  StatusPresentation<keyof EinreichungStatusBadgeLabels>
> = {
  ERSTELLT: { state: "draft", labelKey: "erstellt" },
  // Submitted, but not yet confirmed as eingereicht.
  BEANTRAGT: { state: "pending", labelKey: "beantragt" },
  VERSENDET: { state: "pending", labelKey: "versendet" },
  // Received by the Gericht, but not yet veraktet.
  EINGEREICHT: { state: "pending", labelKey: "eingereicht" },
  VERAKTET: { state: "done", labelKey: "veraktet" },
  FEHLGESCHLAGEN: { state: "failed", labelKey: "fehlgeschlagen" },
  GELOESCHT: { state: "closed", labelKey: "geloescht", icon: "delete" },
};

export function getEinreichungStatusPresentation(
  status: Einreichung["status"],
  badgeLabels: EinreichungStatusBadgeLabels,
): StatusBadgePresentation {
  const { state, labelKey, icon } = einreichungStatusPresentation[status];

  return { state, label: badgeLabels[labelKey], icon };
}

const verfahrenStatusPresentation: Record<
  Verfahren["status"],
  StatusPresentation<keyof VerfahrenStatusBadgeLabels>
> = {
  ERSTELLT: { state: "draft", labelKey: "erstellt" },
  // Filed, but the Gericht hasn't opened a Gerichtsverfahren yet.
  EINGEREICHT: { state: "pending", labelKey: "eingereicht" },
  GERICHTSVERFAHRENANGELEGT: {
    state: "done",
    labelKey: "gerichtsverfahrenAngelegt",
  },
  ABGESCHLOSSEN: { state: "closed", labelKey: "abgeschlossen" },
  GELOESCHT: { state: "closed", labelKey: "geloescht", icon: "delete" },
};

export function getVerfahrenStatusPresentation(
  status: Verfahren["status"],
  badgeLabels: VerfahrenStatusBadgeLabels,
): StatusBadgePresentation {
  const { state, labelKey, icon } = verfahrenStatusPresentation[status];

  return { state, label: badgeLabels[labelKey], icon };
}

export type BelegBadgeLabels = {
  pending: string;
  ready: string;
};

// A Beleg is created asynchronously after einreichen; once ERSTELLT nothing
// more happens to it, so it's done.
const belegStatusPresentation: Record<
  Beleg["status"],
  StatusPresentation<keyof BelegBadgeLabels>
> = {
  IN_BEARBEITUNG: { state: "pending", labelKey: "pending", loading: true },
  ERSTELLT: { state: "done", labelKey: "ready", loading: false },
};

export function getBelegStatusPresentation(
  status: Beleg["status"],
  badgeLabels: BelegBadgeLabels,
): StatusBadgePresentation {
  const { state, labelKey, icon, loading } = belegStatusPresentation[status];

  return { state, label: badgeLabels[labelKey], icon, loading };
}
