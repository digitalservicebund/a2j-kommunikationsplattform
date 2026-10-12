import { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";

/**
 * Returns true if the passed Einreichung status implies that the Einreichung
 * is not yet "eingereicht" (successfully submitted) yet. Such an Einreichhung
 * is considered still editable.
 */
export function isDraftEinreichungStatus(
  status: Einreichung["status"],
): boolean {
  return status === "ERSTELLT" || status === "FEHLGESCHLAGEN";
}
