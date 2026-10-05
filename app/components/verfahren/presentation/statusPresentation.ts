import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";

type BadgeTone = "success" | "warning" | "danger" | "info";

type Presentation = {
  badgeClassModifier: BadgeTone;
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
  { tone: BadgeTone; labelKey: keyof EinreichungStatusBadgeLabels }
> = {
  ERSTELLT: { tone: "info", labelKey: "erstellt" },
  // Submitted, but not yet confirmed as eingereicht.
  BEANTRAGT: { tone: "info", labelKey: "beantragt" },
  VERSENDET: { tone: "info", labelKey: "versendet" },
  EINGEREICHT: { tone: "success", labelKey: "eingereicht" },
  VERAKTET: { tone: "success", labelKey: "veraktet" },
  FEHLGESCHLAGEN: { tone: "danger", labelKey: "fehlgeschlagen" },
  GELOESCHT: { tone: "danger", labelKey: "geloescht" },
};

export function getEinreichungStatusPresentation(
  status: Einreichung["status"],
  badgeLabels: EinreichungStatusBadgeLabels,
): Presentation {
  const { tone, labelKey } = einreichungStatusPresentation[status];

  return { badgeClassModifier: tone, label: badgeLabels[labelKey] };
}

const verfahrenStatusPresentation: Record<
  Verfahren["status"],
  { tone: BadgeTone; labelKey: keyof VerfahrenStatusBadgeLabels }
> = {
  ERSTELLT: { tone: "info", labelKey: "erstellt" },
  EINGEREICHT: { tone: "success", labelKey: "eingereicht" },
  GERICHTSVERFAHRENANGELEGT: {
    tone: "success",
    labelKey: "gerichtsverfahrenAngelegt",
  },
  ABGESCHLOSSEN: { tone: "success", labelKey: "abgeschlossen" },
  GELOESCHT: { tone: "danger", labelKey: "geloescht" },
};

export function getVerfahrenStatusPresentation(
  status: Verfahren["status"],
  badgeLabels: VerfahrenStatusBadgeLabels,
): Presentation {
  const { tone, labelKey } = verfahrenStatusPresentation[status];

  return { badgeClassModifier: tone, label: badgeLabels[labelKey] };
}
