import type { DokumentType } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import isKlageeinreichung from "~/domains/verfahren/services/isKlageeinreichung";

// The auto-managed XJustiz-Dokument may never be deleted. In the
// Klageeinreichung, Schriftstücke (the Klageschrift, and any further
// Schriftstück a user attaches) are part of the substantive filing and must
// stay — they're replaced via the edit flow instead. A Weitere Einreichung has
// no such flow, so its Schriftstücke may be deleted.
const PROTECTED_DOKUMENT_TYPES_KLAGEEINREICHUNG: ReadonlySet<DokumentType> =
  new Set<DokumentType>(["XJUSTIZ", "SCHRIFTSTUECK"]);
const PROTECTED_DOKUMENT_TYPES_WEITERE_EINREICHUNG: ReadonlySet<DokumentType> =
  new Set<DokumentType>(["XJUSTIZ"]);

export default function canDeleteDokument(
  dokument: { typ: DokumentType },
  einreichung: Pick<Einreichung, "name">,
): boolean {
  const protectedTypes = isKlageeinreichung(einreichung)
    ? PROTECTED_DOKUMENT_TYPES_KLAGEEINREICHUNG
    : PROTECTED_DOKUMENT_TYPES_WEITERE_EINREICHUNG;

  return !protectedTypes.has(dokument.typ);
}
