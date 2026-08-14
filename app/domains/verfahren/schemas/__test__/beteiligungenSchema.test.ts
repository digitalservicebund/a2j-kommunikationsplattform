import { describe, expect, it } from "vitest";
import { BeteiligungenSchema } from "../beteiligungenSchema";

const baseFields = {
  id: "bet-1",
  rollen: [
    {
      id: "rolle-1",
      rollennummer: null,
      rollenbezeichnung: { id: "rb-1", wert: "Kläger(in)", code: "101" },
      geschaeftszeichen: null,
      referenz: null,
    },
  ],
  anschriften: null,
  telekommunikation: null,
};

describe("BeteiligungenSchema", () => {
  it("parses a natuerlichePerson entry", () => {
    const result = BeteiligungenSchema.parse([
      {
        ...baseFields,
        beteiligtenart: "natuerlichePerson",
        vorname: "Emilia",
        titel: null,
        namensvorsatz: null,
        nachname: "Kühn",
      },
    ]);

    expect(result?.[0]).toMatchObject({ nachname: "Kühn" });
  });

  it("parses an organisation entry", () => {
    const result = BeteiligungenSchema.parse([
      {
        ...baseFields,
        beteiligtenart: "organisation",
        bezeichnung: "Lufthansa",
      },
    ]);

    expect(result?.[0]).toMatchObject({ bezeichnung: "Lufthansa" });
  });

  it("parses a raKanzlei entry and retains kanzleiform/rechtsform", () => {
    const result = BeteiligungenSchema.parse([
      {
        ...baseFields,
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Böhm",
        rechtsform: "GbR",
        kanzleiform: { id: "kf-1", wert: "Einzelanwalt", code: "001" },
      },
    ]);

    expect(result?.[0]).toMatchObject({
      bezeichnung: "Kanzlei Böhm",
      rechtsform: "GbR",
      kanzleiform: { id: "kf-1", wert: "Einzelanwalt", code: "001" },
    });
  });
});
