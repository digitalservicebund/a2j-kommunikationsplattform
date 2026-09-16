import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  makeNatuerlichePersonBeteiligung,
  makeRAKanzleiBeteiligung,
} from "./beteiligung";
import { makeGericht } from "./gericht";
import { makeBeklagteRolle, makeKlaegerinRolle } from "./rolle";

export function makeVerfahren(params?: Partial<Verfahren>): Verfahren {
  return {
    id: crypto.randomUUID(),
    erstelltVon: "7c7b6a8e-fdb9-4f38-944d-3ef010a4cab0",
    erstelltAm: "2026-09-30T12:24:56.789Z",
    eingereichtAm: "2026-09-30T12:34:56.789Z",
    status: "EINGEREICHT",
    statusGeaendertAm: "2026-09-30T12:34:56.789Z",
    gericht: makeGericht(),
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
