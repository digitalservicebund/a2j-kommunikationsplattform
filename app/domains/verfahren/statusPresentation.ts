type BadgeTone = "success" | "warning" | "danger" | "info";

type Presentation = {
  badgeClassModifier: BadgeTone;
  label: string;
};

type VirenScanLabelVariant = "short" | "long";

export type EinreichungStatusBadgeLabels = {
  gruen: string;
  rot: string;
  gelb: string;
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

export type VirenScanStatusBadgeLabels = {
  sauber: string;
  infiziertShort: string;
  infiziertLong: string;
  fehlgeschlagenShort: string;
  fehlgeschlagenLong: string;
  inBearbeitungShort: string;
  inBearbeitungLong: string;
  ausstehendShort: string;
  ausstehendLong: string;
};

export function getEinreichungStatusPresentation(
  status: string,
  badgeLabels: EinreichungStatusBadgeLabels,
): Presentation {
  if (status === "GRUEN") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.gruen,
    };
  }

  if (status === "ROT") {
    return {
      badgeClassModifier: "danger",
      label: badgeLabels.rot,
    };
  }

  return {
    badgeClassModifier: "warning",
    label: badgeLabels.gelb,
  };
}

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

export function getVirenScanStatusPresentation(
  status: string,
  badgeLabels: VirenScanStatusBadgeLabels,
  variant: VirenScanLabelVariant = "short",
): Presentation {
  if (status === "SAUBER") {
    return {
      badgeClassModifier: "success",
      label: badgeLabels.sauber,
    };
  }

  if (status === "INFIZIERT") {
    return {
      badgeClassModifier: "danger",
      label:
        variant === "long"
          ? badgeLabels.infiziertLong
          : badgeLabels.infiziertShort,
    };
  }

  if (status === "FEHLGESCHLAGEN") {
    return {
      badgeClassModifier: "danger",
      label:
        variant === "long"
          ? badgeLabels.fehlgeschlagenLong
          : badgeLabels.fehlgeschlagenShort,
    };
  }

  if (status === "IN_BEARBEITUNG") {
    return {
      badgeClassModifier: "warning",
      label:
        variant === "long"
          ? badgeLabels.inBearbeitungLong
          : badgeLabels.inBearbeitungShort,
    };
  }

  return {
    badgeClassModifier: "warning",
    label:
      variant === "long"
        ? badgeLabels.ausstehendLong
        : badgeLabels.ausstehendShort,
  };
}

export function isEinreichungReady(
  dokumente: Array<{ viren_scan_status: string }>,
): boolean {
  return (
    dokumente.length > 0 &&
    dokumente.every(
      (dokument) =>
        dokument.viren_scan_status !== "FEHLGESCHLAGEN" &&
        dokument.viren_scan_status !== "INFIZIERT",
    )
  );
}
