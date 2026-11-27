import { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";

export function makeBeleg(params?: Partial<Beleg>): Beleg {
  return {
    id: "beleg-1",
    erstelltAm: "2026-01-01T00:00:00.000Z",
    typ: "NACHWEIS",
    status: "ERSTELLT",
    dateiname: "nachweis.pdf",
    contentType: "application/pdf",
    ...params,
  };
}
