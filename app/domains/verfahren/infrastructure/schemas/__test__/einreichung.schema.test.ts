import { describe, expect, it } from "vitest";
import {
  EinreichenResponseSchema,
  EinreichungenSchema,
  EinreichungErstellenResponseSchema,
  EinreichungSchema,
} from "~/domains/verfahren/infrastructure/schemas/einreichung.schema";

describe("EinreichungSchema", () => {
  it("maps the snake_case API response to the camelCase domain shape", () => {
    const apiResponse = {
      id: "e-1",
      name: "Klageschrift",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      status: "ERSTELLT",
      beantragt_am: null,
      gesendet_am: null,
      eingereicht_am: null,
      validierungs_status: "AUSSTEHEND",
    };

    expect(EinreichungSchema.parse(apiResponse)).toEqual({
      id: "e-1",
      name: "Klageschrift",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      status: "ERSTELLT",
      beantragtAm: null,
      gesendetAm: null,
      eingereichtAm: null,
      validierungsStatus: "AUSSTEHEND",
    });
  });
});

describe("EinreichungenSchema", () => {
  it("maps a liste response's elemente to camelCase domain objects", () => {
    const apiResponse = {
      elemente: [
        {
          id: "e-1",
          name: "Klageschrift",
          erstellt_von: "user-1",
          erstellt_am: "2026-07-22T10:00:00.000Z",
          status: "ERSTELLT",
          beantragt_am: null,
          gesendet_am: null,
          eingereicht_am: null,
          validierungs_status: "AUSSTEHEND",
        },
      ],
    };

    const result = EinreichungenSchema.parse(apiResponse);

    expect(result.elemente).toEqual([
      expect.objectContaining({ id: "e-1", erstelltVon: "user-1" }),
    ]);
  });
});

describe("EinreichungErstellenResponseSchema", () => {
  it("maps the create response's narrower snake_case shape to camelCase", () => {
    // The API's EinreichungErstellenResponse DTO omits
    // beantragt_am/gesendet_am/eingereicht_am/validierungs_status entirely —
    // they don't exist yet for a just-created Einreichung. Validating this
    // response against the full EinreichungSchema (which requires those
    // fields) fails at runtime; this schema must accept the narrower shape.
    const apiResponse = {
      id: "e-1",
      name: "Klageeinreichung",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2026-01-01T12:00:00.000Z",
      status: "ERSTELLT",
    };

    expect(EinreichungErstellenResponseSchema.parse(apiResponse)).toEqual({
      id: "e-1",
      name: "Klageeinreichung",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-01-01T12:00:00.000Z",
      status: "ERSTELLT",
    });
  });
});

describe("EinreichenResponseSchema", () => {
  it("maps beleg_id to belegId", () => {
    expect(EinreichenResponseSchema.parse({ beleg_id: "b-1" })).toEqual({
      belegId: "b-1",
    });
  });
});
