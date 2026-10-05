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
export function isEinreichungOpen(
  einreichung: Pick<Einreichung, "status">,
): boolean {
  return OPEN_EINREICHUNG_STATUSES.has(einreichung.status);
}

type WithEinreichung = {
  einreichung: Pick<Einreichung, "status" | "erstelltAm">;
};

/**
 * Finds the Einreichung the user is currently working on: the newest one
 * that is still open. Sorted by `erstelltAm` rather than relying on the
 * API's list order.
 */
export default function findOpenEinreichung<T extends WithEinreichung>(
  einreichungen: readonly T[],
): T | undefined {
  const newestFirst = [...einreichungen].sort((a, b) =>
    b.einreichung.erstelltAm.localeCompare(a.einreichung.erstelltAm),
  );

  return newestFirst.find(({ einreichung }) => isEinreichungOpen(einreichung));
}
