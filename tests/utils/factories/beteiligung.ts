import { NatuerlichePersonBeteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { makeKlaegerinRolle } from "./rolle";

export function makeNatuerlichePersonBeteiligung(
  params?: Partial<NatuerlichePersonBeteiligung>,
): NatuerlichePersonBeteiligung {
  return {
    id: crypto.randomUUID(),
    beteiligtenart: "natuerlichePerson",
    vorname: "Johanna",
    nachname: "Groß",
    titel: null,
    namensvorsatz: null,
    rollen: [makeKlaegerinRolle()],
    anschriften: [
      {
        id: crypto.randomUUID(),
        anschriftstyp: {
          id: "2b5aee01-5fc9-4129-bbf9-98978683154e",
          wert: "Privatanschrift",
          code: "017",
        },
        strasse: "Bockenheimer Landstraße",
        hausnummer: "42-44",
        postleitzahl: "60323",
        ort: "Frankfurt am Main",
        postfachnummer: null,
        staat: {
          id: "51dd7b05-2c64-4ce9-800d-9a49d77aa062",
          wert: "Deutschland",
          code: "000",
        },
      },
    ],
    telekommunikation: [
      {
        id: crypto.randomUUID(),
        telekommunikationsart: {
          id: "a680bdc5-4722-4a89-9862-780762b3d188",
          wert: "E-Mail",
          code: "001",
          beschreibung: null,
        },
        verbindung: "johanna.gross@example.com",
      },
      {
        id: crypto.randomUUID(),
        telekommunikationsart: {
          id: "3b03f01e-fa4d-4777-b1a6-f64045bd02a6",
          wert: "Mobiltelefon",
          code: "004",
          beschreibung: null,
        },
        verbindung: "06921994731",
      },
    ],
    ...params,
  };
}
