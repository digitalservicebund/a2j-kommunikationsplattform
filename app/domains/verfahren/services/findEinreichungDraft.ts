import { orderBy } from "es-toolkit";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";

// The statuses the API still accepts `einreichen` for (see
// submitEinreichungIfNeeded) — i.e. an Einreichung that hasn't been submitted
// yet and the user can still work on.
const OPEN_EINREICHUNG_STATUSES: ReadonlySet<Einreichung["status"]> = new Set<
  Einreichung["status"]
>(["ERSTELLT", "FEHLGESCHLAGEN"]);

/**
 * Returns true if the Einreichung is in one of the statuses in which it has
 * not been submitted (eingereicht) yet.
 */
export function isEinreichungDraft(
  einreichung: Pick<Einreichung, "status">,
): boolean {
  return OPEN_EINREICHUNG_STATUSES.has(einreichung.status);
}

type WithEinreichung = {
  einreichung: Pick<Einreichung, "status" | "erstelltAm">;
};

/**
 * Returns the Einreichungen ordered newest first, whatever their status.
 */

export function getEinreichungenNewestFirst<T extends WithEinreichung>(
  einreichungen: readonly T[],
) {
  return orderBy(
    einreichungen,
    [(summary) => summary.einreichung.erstelltAm],
    ["desc"],
  );
}

/**
 * Finds the Einreichung the user is currently working on: the newest one
 * that is still open.
 */
export default function findEinreichungDraft<T extends WithEinreichung>(
  einreichungen: readonly T[],
): T | undefined {
  const newestFirst = getEinreichungenNewestFirst(einreichungen);
  return newestFirst.find(({ einreichung }) => isEinreichungDraft(einreichung));
}
