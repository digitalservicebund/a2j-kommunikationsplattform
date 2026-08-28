import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";

export function isValidierungslaufRunning(
  validierungsstatus: Validierungsstatus,
): boolean {
  return validierungsstatus.validierungslaufStatus !== "ABGESCHLOSSEN";
}
