import { describe, expect, it } from "vitest";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import {
  makeNatuerlichePersonBeteiligung,
  makeRAKanzleiBeteiligung,
} from "~tests/utils/factories/beteiligung";
import { makeKlaegerinRolle } from "~tests/utils/factories/rolle";
import buildBeteiligungenInputFromVerfahren from "../buildBeteiligungenInputFromVerfahren";

describe("buildBeteiligungenInputFromVerfahren", () => {
  it.each([null, []])("returns null for %j", (beteiligungen) => {
    expect(buildBeteiligungenInputFromVerfahren(beteiligungen)).toBeNull();
  });

  it("maps a natürliche Person with its Rollen, Anschriften and Kommunikation", () => {
    const rolle = makeKlaegerinRolle();
    const person = makeNatuerlichePersonBeteiligung({ rollen: [rolle] });
    const [anschrift] = person.anschriften ?? [];
    const [email, telefon] = person.telekommunikation ?? [];

    expect(buildBeteiligungenInputFromVerfahren([person])).toEqual([
      {
        beteiligtenart: "natuerlichePerson",
        vorname: "Johanna",
        titel: null,
        namensvorsatz: null,
        nachname: "Groß",
        rollen: [
          {
            rollennummer: rolle.rollennummer,
            rollenbezeichnungId: rolle.rollenbezeichnung.id,
            geschaeftszeichen: rolle.geschaeftszeichen,
            referenz: rolle.referenz,
          },
        ],
        anschriften: [
          {
            anschriftstypId: anschrift?.anschriftstyp?.id,
            strasse: "Bockenheimer Landstraße",
            hausnummer: "42-44",
            postleitzahl: "60323",
            ort: "Frankfurt am Main",
            postfachnummer: null,
            staatId: anschrift?.staat?.id,
          },
        ],
        kommunikationsanschluesse: [
          {
            telekommunikationsartId: email?.telekommunikationsart.id,
            verbindung: "johanna.gross@example.com",
          },
          {
            telekommunikationsartId: telefon?.telekommunikationsart.id,
            verbindung: "06921994731",
          },
        ],
      },
    ]);
  });

  it("maps a RA-Kanzlei with its Kanzleiform and Rechtsform", () => {
    const kanzlei = makeRAKanzleiBeteiligung({
      bezeichnung: "Kanzlei Hölzer",
      rechtsform: { id: "rechtsform-1", wert: "GmbH", code: "010" },
      anschriften: null,
      telekommunikation: null,
    });

    expect(buildBeteiligungenInputFromVerfahren([kanzlei])).toEqual([
      expect.objectContaining({
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Hölzer",
        rechtsformId: "rechtsform-1",
        kanzleiformId: kanzlei.kanzleiform.id,
        anschriften: null,
        kommunikationsanschluesse: null,
      }),
    ]);
  });

  it("produces input accepted by the Verfahren update schema", () => {
    const beteiligungen = buildBeteiligungenInputFromVerfahren([
      makeNatuerlichePersonBeteiligung(),
      makeRAKanzleiBeteiligung({ bezeichnung: "Kanzlei Hölzer" }),
    ]);

    const result = VerfahrenAendernInputSchema.safeParse({
      verfahrensgegenstand: "Zahlungsklage",
      kurzrubrum: null,
      gerichtId: "gericht-1",
      beteiligungen,
    });

    expect(result.success).toBe(true);
  });
});
