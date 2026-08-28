import { describe, expect, it } from "vitest";
import buildBeteiligungFromFormValues, {
  AnwaltFormValues,
  buildRaKanzleiFromFormValues,
  ParteiFormValues,
} from "../buildBeteiligungFromFormValues";

const codeIds = {
  rollenbezeichnungId: "rolle-1",
  anschriftstypId: "typ-1",
  staatId: "staat-1",
  emailTelekommunikationsartId: "tka-email",
  telefonTelekommunikationsartId: "tka-telefon",
};

const emptyPartei: ParteiFormValues = {
  vorname: "",
  nachname: "",
  strasse: "",
  hausnummer: "",
  postleitzahl: "",
  ort: "",
  email: "",
  telefon: "",
};

describe("buildBeteiligungFromFormValues", () => {
  it("returns null when no nachname was provided", () => {
    expect(buildBeteiligungFromFormValues(emptyPartei, codeIds)).toBeNull();
  });

  it("builds a full natuerlichePerson request with address and both contacts", () => {
    const partei: ParteiFormValues = {
      ...emptyPartei,
      vorname: "Emilia",
      nachname: "Kühn",
      strasse: "Bockenheimer Landstraße",
      hausnummer: "42-44",
      postleitzahl: "60323",
      ort: "Frankfurt am Main",
      email: "emiliakuehn@posteo.de",
      telefon: "06921994731",
    };

    expect(buildBeteiligungFromFormValues(partei, codeIds)).toEqual({
      beteiligtenart: "natuerlichePerson",
      vorname: "Emilia",
      titel: null,
      namensvorsatz: null,
      nachname: "Kühn",
      rollen: [
        {
          rollennummer: null,
          rollenbezeichnung_id: "rolle-1",
          geschaeftszeichen: null,
          referenz: null,
        },
      ],
      anschriften: [
        {
          anschriftstyp_id: "typ-1",
          strasse: "Bockenheimer Landstraße",
          hausnummer: "42-44",
          postleitzahl: "60323",
          ort: "Frankfurt am Main",
          postfachnummer: null,
          staat_id: "staat-1",
        },
      ],
      kommunikationsanschluesse: [
        {
          telekommunikationsart_id: "tka-email",
          verbindung: "emiliakuehn@posteo.de",
        },
        { telekommunikationsart_id: "tka-telefon", verbindung: "06921994731" },
      ],
    });
  });

  it("omits anschriften when no address fields were provided", () => {
    const partei: ParteiFormValues = { ...emptyPartei, nachname: "Kühn" };

    const result = buildBeteiligungFromFormValues(partei, codeIds);

    expect(result?.anschriften).toBeNull();
  });

  it("nulls out the individual address fields that were left empty", () => {
    const partei: ParteiFormValues = {
      ...emptyPartei,
      nachname: "Kühn",
      postleitzahl: "60323",
    };

    const result = buildBeteiligungFromFormValues(partei, codeIds);

    expect(result?.anschriften).toEqual([
      {
        anschriftstyp_id: "typ-1",
        strasse: null,
        hausnummer: null,
        postleitzahl: "60323",
        ort: null,
        postfachnummer: null,
        staat_id: "staat-1",
      },
    ]);
  });

  it("nulls out postleitzahl when only ort was provided", () => {
    const partei: ParteiFormValues = {
      ...emptyPartei,
      nachname: "Kühn",
      ort: "Frankfurt am Main",
    };

    const result = buildBeteiligungFromFormValues(partei, codeIds);

    expect(result?.anschriften).toEqual([
      {
        anschriftstyp_id: "typ-1",
        strasse: null,
        hausnummer: null,
        postleitzahl: null,
        ort: "Frankfurt am Main",
        postfachnummer: null,
        staat_id: "staat-1",
      },
    ]);
  });

  it("only includes the email contact when no phone was provided", () => {
    const partei: ParteiFormValues = {
      ...emptyPartei,
      nachname: "Kühn",
      email: "emiliakuehn@posteo.de",
    };

    const result = buildBeteiligungFromFormValues(partei, codeIds);

    expect(result?.kommunikationsanschluesse).toEqual([
      {
        telekommunikationsart_id: "tka-email",
        verbindung: "emiliakuehn@posteo.de",
      },
    ]);
  });

  it("omits kommunikationsanschluesse when neither email nor phone was provided", () => {
    const partei: ParteiFormValues = { ...emptyPartei, nachname: "Kühn" };

    const result = buildBeteiligungFromFormValues(partei, codeIds);

    expect(result?.kommunikationsanschluesse).toBeNull();
  });

  it("sets the given rollennummer on the built role", () => {
    const partei: ParteiFormValues = { ...emptyPartei, nachname: "Kühn" };

    const result = buildBeteiligungFromFormValues(partei, codeIds, "klaegerin");

    expect(result?.rollen[0].rollennummer).toBe("klaegerin");
  });
});

describe("buildRaKanzleiFromFormValues", () => {
  const anwaltCodeIds = { ...codeIds, kanzleiformId: "kanzleiform-1" };
  const emptyAnwalt: AnwaltFormValues = {
    name: "",
    strasse: "",
    hausnummer: "",
    postleitzahl: "",
    ort: "",
    email: "",
    telefon: "",
  };

  it("returns null when no name was provided", () => {
    expect(
      buildRaKanzleiFromFormValues(emptyAnwalt, anwaltCodeIds, "klaegerin"),
    ).toBeNull();
  });

  it("builds a raKanzlei request linked to the represented party via referenz", () => {
    const anwalt: AnwaltFormValues = {
      ...emptyAnwalt,
      name: "Kanzlei Böhm",
      strasse: "Römerberg",
      hausnummer: "2",
      postleitzahl: "60311",
      ort: "Frankfurt am Main",
      email: "kanzlei@ra-boehm.de",
      telefon: "06921994731",
    };

    expect(
      buildRaKanzleiFromFormValues(anwalt, anwaltCodeIds, "klaegerin"),
    ).toEqual({
      beteiligtenart: "raKanzlei",
      bezeichnung: "Kanzlei Böhm",
      rechtsform_id: null,
      kanzleiform_id: "kanzleiform-1",
      rollen: [
        {
          rollennummer: null,
          rollenbezeichnung_id: "rolle-1",
          geschaeftszeichen: null,
          referenz: "klaegerin",
        },
      ],
      anschriften: [
        {
          anschriftstyp_id: "typ-1",
          strasse: "Römerberg",
          hausnummer: "2",
          postleitzahl: "60311",
          ort: "Frankfurt am Main",
          postfachnummer: null,
          staat_id: "staat-1",
        },
      ],
      kommunikationsanschluesse: [
        {
          telekommunikationsart_id: "tka-email",
          verbindung: "kanzlei@ra-boehm.de",
        },
        { telekommunikationsart_id: "tka-telefon", verbindung: "06921994731" },
      ],
    });
  });
});
