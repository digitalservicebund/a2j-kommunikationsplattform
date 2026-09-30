import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  makeNatuerlichePersonBeteiligung,
  makeRAKanzleiBeteiligung,
} from "./beteiligung";
import { makeBeklagteRolle, makeKlaegerinRolle } from "./rolle";

export function makeVerfahren(params?: Partial<Verfahren>): Verfahren {
  return {
    id: crypto.randomUUID(),
    erstelltVon: "",
    erstelltAm: "2026-09-30T12:24:56.789Z",
    eingereichtAm: "2026-09-30T12:34:56.789Z",
    status: "EINGEREICHT",
    statusGeaendertAm: "2026-09-30T12:34:56.789Z",
    gericht: {
      id: "78355359-57e9-31bb-8366-7bda03795c15",
      wert: "Amtsgericht München",
      code: "D2601",
    },
    aktenzeichenGericht: "8 C 7900/26",
    kurzrubrum: "Beispiel",
    verfahrensgegenstand:
      "Erstattung von Betreuungsleistungen (Art. 9 VO (EG) 261/2004)",
    beteiligungen: [
      makeNatuerlichePersonBeteiligung({
        vorname: "Luisa-Maria",
        nachname: "Roth",
        rollen: [makeKlaegerinRolle()],
      }),
      makeNatuerlichePersonBeteiligung({
        vorname: "Alexander",
        nachname: "Brück",
        rollen: [makeBeklagteRolle()],
      }),
      makeRAKanzleiBeteiligung(),
    ],
    ...params,
  };
}
