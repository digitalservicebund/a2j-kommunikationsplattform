import type { StatusBadgeState } from "~/components/StatusBadge";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";

type Presentation = {
  state: StatusBadgeState;
  label: string;
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
  { state: StatusBadgeState; labelKey: keyof EinreichungStatusBadgeLabels }
> = {
  ERSTELLT: { state: "draft", labelKey: "erstellt" },
  // Submitted, but not yet confirmed as eingereicht.
  BEANTRAGT: { state: "pending", labelKey: "beantragt" },
  VERSENDET: { state: "pending", labelKey: "versendet" },
  // Received by the Gericht, but not yet veraktet.
  EINGEREICHT: { state: "pending", labelKey: "eingereicht" },
  VERAKTET: { state: "done", labelKey: "veraktet" },
  FEHLGESCHLAGEN: { state: "failed", labelKey: "fehlgeschlagen" },
  GELOESCHT: { state: "closed", labelKey: "geloescht" },
};

export function getEinreichungStatusPresentation(
  status: Einreichung["status"],
  badgeLabels: EinreichungStatusBadgeLabels,
): Presentation {
  const { state, labelKey } = einreichungStatusPresentation[status];

  return { state, label: badgeLabels[labelKey] };
}

const verfahrenStatusPresentation: Record<
  Verfahren["status"],
  { state: StatusBadgeState; labelKey: keyof VerfahrenStatusBadgeLabels }
> = {
  ERSTELLT: { state: "draft", labelKey: "erstellt" },
  // Filed, but the Gericht hasn't opened a Gerichtsverfahren yet.
  EINGEREICHT: { state: "pending", labelKey: "eingereicht" },
  GERICHTSVERFAHRENANGELEGT: {
    state: "done",
    labelKey: "gerichtsverfahrenAngelegt",
  },
  ABGESCHLOSSEN: { state: "closed", labelKey: "abgeschlossen" },
  GELOESCHT: { state: "closed", labelKey: "geloescht" },
};

export function getVerfahrenStatusPresentation(
  status: Verfahren["status"],
  badgeLabels: VerfahrenStatusBadgeLabels,
): Presentation {
  const { state, labelKey } = verfahrenStatusPresentation[status];

  return { state, label: badgeLabels[labelKey] };
}
