import { describe, expect, it } from "vitest";
import { BelegSchema } from "../belegSchema";

describe("BelegSchema", () => {
  it("parses a Beleg that is still IN_BEARBEITUNG with typ: null", () => {
    const result = BelegSchema.parse({
      id: "b-1",
      erstellt_am: "2026-08-24T15:18:20.092219Z",
      typ: null,
      status: "IN_BEARBEITUNG",
      einreichung_id: "e-1",
      anzeigename: null,
      dateiname: null,
      content_type: null,
      size_in_bytes: null,
    });

    expect(result.typ).toBeNull();
  });

  it("parses a completed Beleg with a typ", () => {
    const result = BelegSchema.parse({
      id: "b-1",
      erstellt_am: "2026-08-24T15:18:20.092219Z",
      typ: "NACHWEIS",
      status: "ERSTELLT",
      dateiname: "eingangsbestaetigung.pdf",
      content_type: "application/pdf",
    });

    expect(result.typ).toBe("NACHWEIS");
  });
});
