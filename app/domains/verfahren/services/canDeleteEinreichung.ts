import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { isEinreichungDraft } from "~/domains/verfahren/services/findEinreichungDraft";
import isKlageeinreichung from "~/domains/verfahren/services/isKlageeinreichung";

// Only a draft Weitere Einreichung can be deleted on its own: the
// Klageeinreichung goes away together with its Verfahren instead.
export default function canDeleteEinreichung(
  einreichung: Pick<Einreichung, "name" | "status">,
): boolean {
  return !isKlageeinreichung(einreichung) && isEinreichungDraft(einreichung);
}
