import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { isEinreichungDraft } from "~/domains/verfahren/services/findEinreichungDraft";

/**
 * Returns true if nothing of the Verfahren has been submitted yet — the
 * condition under which the API allows deleting it (it responds with 409
 * `wrong-state-verfahren-delete` otherwise).
 */
export default function isVerfahrenDraft(
  verfahren: Pick<Verfahren, "status">,
  einreichungen: readonly Pick<Einreichung, "status">[],
): boolean {
  return (
    verfahren.status === "ERSTELLT" && einreichungen.every(isEinreichungDraft)
  );
}
