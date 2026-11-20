import { EinreichungWithStatus } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { makeValidierungsstatus } from "./validierungsstatus";

export function makeEinreichung(params?: Partial<Einreichung>): Einreichung {
  return {
    id: crypto.randomUUID(),
    name: "Klageeinreichung",
    erstelltVon: crypto.randomUUID(),
    erstelltAm: "2026-09-30T12:24:56.789Z",
    status: "VERAKTET",
    beantragtAm: "2026-09-30T12:24:56.789Z",
    gesendetAm: "2026-09-30T12:24:56.789Z",
    eingereichtAm: "2026-09-30T12:24:56.789Z",
    validierungsStatus: "ABGESCHLOSSEN",
    ...params,
  };
}

export function makeEinreichungWithStatus(
  params?: Partial<Einreichung> & { einreichungsStatus?: Validierungsstatus },
): EinreichungWithStatus {
  return {
    ...makeEinreichung(params),
    einreichungsStatus: params?.einreichungsStatus ?? makeValidierungsstatus(),
  };
}
