import {
  NatuerlichePersonBeteiligung,
  OrganisationBeteiligung,
  RAKanzleiBeteiligung,
} from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import {
  makeBeklagteRolle,
  makeKlaegerinRolle,
  makeProzessbevollmeachtigteRolle,
} from "./rolle";

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
    telekommunikationen: [
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

export function makeOrganisationBeteiligung(
  params?: Partial<OrganisationBeteiligung>,
): OrganisationBeteiligung {
  return {
    id: crypto.randomUUID(),
    beteiligtenart: "organisation",
    bezeichnung: "Muster GmbH",
    rollen: [makeBeklagteRolle()],
    anschriften: [
      {
        id: crypto.randomUUID(),
        anschriftstyp: {
          id: "6f0b6a8e-3f4d-4c2b-9a51-0d6f1c2e7b34",
          wert: "Dienst-/Geschäftsanschrift",
          code: "003",
        },
        strasse: "Friedrichstraße",
        hausnummer: "100",
        postleitzahl: "10117",
        ort: "Berlin",
        postfachnummer: null,
        staat: {
          id: "51dd7b05-2c64-4ce9-800d-9a49d77aa062",
          wert: "Deutschland",
          code: "000",
        },
      },
    ],
    telekommunikationen: [],
    ...params,
  };
}

export function makeRAKanzleiBeteiligung(
  params?: Partial<RAKanzleiBeteiligung>,
): RAKanzleiBeteiligung {
  return {
    id: crypto.randomUUID(),
    beteiligtenart: "raKanzlei",
    bezeichnung: "",
    rechtsform: null,
    kanzleiform: {
      id: "d405a33e-3e11-25c4-6835-7f4f60eb4c98",
      wert: "Einzelanwalt",
      code: "001",
    },
    rollen: [makeProzessbevollmeachtigteRolle()],
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
    telekommunikationen: [],
    ...params,
  };
}
