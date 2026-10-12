import type {
  StatusBadgeIcon,
  StatusBadgeState,
} from "~/components/StatusBadge";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";

type Presentation = {
  state: StatusBadgeState;
  label: string;
  icon?: StatusBadgeIcon;
};

// `icon` is only set for a status that deliberately looks different from the
// others in its state; otherwise the badge shows the state's default icon.
type StatusPresentation<LabelKey> = {
  state: StatusBadgeState;
  labelKey: LabelKey;
  icon?: StatusBadgeIcon;
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
): Presentation {
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
): Presentation {
  const { state, labelKey, icon } = verfahrenStatusPresentation[status];

  return { state, label: badgeLabels[labelKey], icon };
}
