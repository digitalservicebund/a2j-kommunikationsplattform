type BadgeTone = "success" | "warning" | "danger" | "info";

type Presentation = {
  badgeClassModifier: BadgeTone;
  label: string;
};

export type DokumentStatusBadgeLabels = {
  erstellt: string;
  eingereicht: string;
  wirdValidiert: string;
};

export type VerfahrenStatusBadgeLabels = {
  erstellt: string;
  eingereicht: string;
  gerichtsverfahrenAngelegt: string;
  abgeschlossen: string;
  geloescht: string;
};

export function getDokumentStatusPresentation(
  status: string,
  badgeLabels: DokumentStatusBadgeLabels,
): Presentation {
  if (status === "ERSTELLT") {
    return {
      badgeClassModifier: "info",
      label: badgeLabels.erstellt,
    };
  }

  if (status === "EINGEREICHT") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.eingereicht,
    };
  }

  return {
    badgeClassModifier: "warning",
    label: badgeLabels.wirdValidiert,
  };
}

export function getVerfahrenStatusPresentation(
  status: string,
  badgeLabels: VerfahrenStatusBadgeLabels,
): Presentation {
  if (status === "EINGEREICHT") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.eingereicht,
    };
  }

  if (status === "GERICHTSVERFAHRENANGELEGT") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.gerichtsverfahrenAngelegt,
    };
  }

  if (status === "ABGESCHLOSSEN") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.abgeschlossen,
    };
  }

  if (status === "GELOESCHT") {
    return {
      badgeClassModifier: "danger",
      label: badgeLabels.geloescht,
    };
  }

  return {
    badgeClassModifier: "info",
    label: badgeLabels.erstellt,
  };
}
