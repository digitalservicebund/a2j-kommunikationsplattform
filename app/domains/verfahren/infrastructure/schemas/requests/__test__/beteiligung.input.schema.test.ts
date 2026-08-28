import { describe, expect, it } from "vitest";
import { BeteiligungenInputSchema } from "../beteiligung.input.schema";

const rolle = {
  rollennummer: null,
  rollenbezeichnungId: "rolle-1",
  geschaeftszeichen: null,
  referenz: null,
};

describe("BeteiligungenInputSchema", () => {
  it("passes null through unchanged", () => {
    expect(BeteiligungenInputSchema.parse(null)).toBeNull();
  });

  it("maps a natuerlichePerson entry to the snake_case wire shape", () => {
    const input = [
      {
        beteiligtenart: "natuerlichePerson",
        vorname: "Emilia",
        titel: null,
        namensvorsatz: null,
        nachname: "Kühn",
        rollen: [rolle],
        anschriften: null,
        kommunikationsanschluesse: null,
      },
    ];

    expect(BeteiligungenInputSchema.parse(input)).toEqual([
      {
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
        anschriften: null,
        kommunikationsanschluesse: null,
      },
    ]);
  });

  it("maps a raKanzlei entry's rechtsformId/kanzleiformId to snake_case", () => {
    const input = [
      {
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Böhm",
        rechtsformId: null,
        kanzleiformId: "kanzleiform-1",
        rollen: [rolle],
        anschriften: null,
        kommunikationsanschluesse: null,
      },
    ];

    expect(BeteiligungenInputSchema.parse(input)).toEqual([
      {
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Böhm",
        rechtsform_id: null,
        kanzleiform_id: "kanzleiform-1",
        rollen: [
          {
            rollennummer: null,
            rollenbezeichnung_id: "rolle-1",
            geschaeftszeichen: null,
            referenz: null,
          },
        ],
        anschriften: null,
        kommunikationsanschluesse: null,
      },
    ]);
  });

  it("throws on an invalid beteiligtenart", () => {
    expect(() =>
      BeteiligungenInputSchema.parse([{ beteiligtenart: "invalid" }]),
    ).toThrow();
  });
});
