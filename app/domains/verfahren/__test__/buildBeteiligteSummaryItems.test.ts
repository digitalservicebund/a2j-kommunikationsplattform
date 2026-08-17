import { describe, expect, it } from "vitest";
import { buildBeteiligteSummaryItems } from "../buildBeteiligteSummaryItems";

const ROLE_CODE_KLAEGERIN = "101";
const ROLE_CODE_BEKLAGTE = "028";

const beteiligungen = [
  {
    beteiligtenart: "natuerlichePerson" as const,
    id: "bet-1",
    vorname: "Emilia",
    nachname: "Kühn",
    titel: null,
    namensvorsatz: null,
    rollen: [
      {
        id: "rolle-1",
        rollennummer: ROLE_CODE_KLAEGERIN,
        rollenbezeichnung: {
          id: "rb-1",
          wert: "Kläger(in)",
          code: ROLE_CODE_KLAEGERIN,
        },
        geschaeftszeichen: null,
        referenz: null,
      },
    ],
    anschriften: [
      {
        id: "a-1",
        anschriftstyp: { id: "at-1", wert: "Privatanschrift", code: "017" },
        strasse: "Bockenheimer Landstraße",
        hausnummer: "42-44",
        postleitzahl: "60323",
        ort: "Frankfurt am Main",
        postfachnummer: null,
        staat: { id: "s-1", wert: "Deutschland", code: "000" },
      },
    ],
    telekommunikation: [
      {
        id: "t-1",
        telekommunikationsart: {
          id: "tk-1",
          wert: "E-Mail",
          code: "001",
          beschreibung: null,
        },
        verbindung: "emiliakuehn@posteo.de",
      },
      {
        id: "t-2",
        telekommunikationsart: {
          id: "tk-2",
          wert: "Mobiltelefon",
          code: "004",
          beschreibung: null,
        },
        verbindung: "06921994731",
      },
    ],
  },
  {
    beteiligtenart: "raKanzlei" as const,
    id: "bet-2",
    bezeichnung: "Kanzlei Böhm",
    rechtsform: null,
    kanzleiform: { id: "kf-1", wert: "Einzelanwalt", code: "001" },
    rollen: [
      {
        id: "rolle-2",
        rollennummer: null,
        rollenbezeichnung: {
          id: "rb-2",
          wert: "Prozessbevollmächtigte(r)",
          code: "132",
        },
        geschaeftszeichen: null,
        referenz: ROLE_CODE_KLAEGERIN,
      },
    ],
    anschriften: [
      {
        id: "a-2",
        anschriftstyp: { id: "at-1", wert: "Privatanschrift", code: "017" },
        strasse: "Römerberg",
        hausnummer: "2",
        postleitzahl: "60311",
        ort: "Frankfurt am Main",
        postfachnummer: null,
        staat: { id: "s-1", wert: "Deutschland", code: "000" },
      },
    ],
    telekommunikation: [
      {
        id: "t-3",
        telekommunikationsart: {
          id: "tk-1",
          wert: "E-Mail",
          code: "001",
          beschreibung: null,
        },
        verbindung: "kanzlei@ra-boehm.de",
      },
    ],
  },
  {
    beteiligtenart: "natuerlichePerson" as const,
    id: "bet-3",
    vorname: "Max",
    nachname: "Mustermann",
    titel: null,
    namensvorsatz: null,
    rollen: [
      {
        id: "rolle-3",
        rollennummer: ROLE_CODE_BEKLAGTE,
        rollenbezeichnung: {
          id: "rb-3",
          wert: "Beklagte(r)",
          code: ROLE_CODE_BEKLAGTE,
        },
        geschaeftszeichen: null,
        referenz: null,
      },
    ],
    anschriften: null,
    telekommunikation: null,
  },
];

describe("buildBeteiligteSummaryItems", () => {
  it("builds the Klägerin summary with address, email, phone and lawyer details", () => {
    const result = buildBeteiligteSummaryItems(
      beteiligungen,
      ROLE_CODE_KLAEGERIN,
    );

    expect(result).toEqual([
      {
        id: "bet-1",
        name: "Emilia Kühn",
        anschrift: "Bockenheimer Landstraße 42-44, 60323 Frankfurt am Main",
        email: "emiliakuehn@posteo.de",
        telefon: "06921994731",
        prozessbevollmaechtigte: [
          {
            name: "Kanzlei Böhm",
            aktenzeichen: null,
            anschrift: "Römerberg 2, 60311 Frankfurt am Main",
            email: "kanzlei@ra-boehm.de",
          },
        ],
      },
    ]);
  });

  it("builds the Beklagte summary without a lawyer", () => {
    const result = buildBeteiligteSummaryItems(
      beteiligungen,
      ROLE_CODE_BEKLAGTE,
    );

    expect(result).toEqual([
      {
        id: "bet-3",
        name: "Max Mustermann",
        anschrift: null,
        email: null,
        telefon: null,
        prozessbevollmaechtigte: [],
      },
    ]);
  });

  it("returns an empty array when there is no beteiligung for the role", () => {
    expect(buildBeteiligteSummaryItems(beteiligungen, "999")).toEqual([]);
  });

  it("returns an empty array when beteiligungen is null", () => {
    expect(buildBeteiligteSummaryItems(null, ROLE_CODE_KLAEGERIN)).toEqual([]);
  });
});
