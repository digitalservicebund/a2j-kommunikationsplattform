import { EinreichungWithValidierungsstatusDetails } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
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

export function makeEinreichungWithValidierungsstatusDetails(
  params?: Partial<EinreichungWithValidierungsstatusDetails>,
): EinreichungWithValidierungsstatusDetails {
  return {
    ...makeEinreichung(params),
    validierungsstatusDetails:
      params?.validierungsstatusDetails ?? makeValidierungsstatus(),
  };
}
