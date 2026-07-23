type BadgeTone = "success" | "warning" | "danger" | "info";

type Presentation = {
  badgeClassModifier: BadgeTone;
  label: string;
};

type VirenScanLabelVariant = "short" | "long";

export function getEinreichungStatusPresentation(status: string): Presentation {
  if (status === "GRUEN") {
    return {
      badgeClassModifier: "success",
      label: "Grün",
    };
  }

  if (status === "ROT") {
    return {
      badgeClassModifier: "danger",
      label: "Rot",
    };
  }

  return {
    badgeClassModifier: "warning",
    label: "Gelb",
  };
}

export function getDokumentStatusPresentation(status: string): Presentation {
  if (status === "ERSTELLT") {
    return {
      badgeClassModifier: "info",
      label: "Erstellt",
    };
  }

  if (status === "EINGEREICHT") {
    return {
      badgeClassModifier: "success",
      label: "Eingereicht",
    };
  }

  return {
    badgeClassModifier: "warning",
    label: "Wird validiert",
  };
}

export function getVirenScanStatusPresentation(
  status: string,
  variant: VirenScanLabelVariant = "short",
): Presentation {
  if (status === "SAUBER") {
    return {
      badgeClassModifier: "success",
      label: "Geprüft und virenfrei",
    };
  }

  if (status === "INFIZIERT") {
    return {
      badgeClassModifier: "danger",
      label: variant === "long" ? "Dokument ist infiziert" : "Infiziert",
    };
  }

  if (status === "FEHLGESCHLAGEN") {
    return {
      badgeClassModifier: "danger",
      label: variant === "long" ? "Scan ist fehlgeschlagen" : "Fehlgeschlagen",
    };
  }

  if (status === "IN_BEARBEITUNG") {
    return {
      badgeClassModifier: "warning",
      label: variant === "long" ? "Scan ist in Bearbeitung" : "In Bearbeitung",
    };
  }

  return {
    badgeClassModifier: "warning",
    label: variant === "long" ? "Scan ist ausstehend" : "In Bearbeitung",
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
