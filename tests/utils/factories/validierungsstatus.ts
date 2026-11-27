import { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";

export function makeValidierungsstatus(
  params?: Partial<Validierungsstatus>,
): Validierungsstatus {
  return {
    validierungslaufStatus: "ABGESCHLOSSEN",
    ergebnis: "GRUEN",
    fehler: [],
    ...params,
  };
}
