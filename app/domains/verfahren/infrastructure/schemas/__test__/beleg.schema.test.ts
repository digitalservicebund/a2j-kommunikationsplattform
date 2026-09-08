import { describe, expect, it } from "vitest";
import { BelegSchema } from "../beleg.schema";

describe("BelegSchema", () => {
  it("maps the snake_case API response to the camelCase domain shape", () => {
    const apiResponse = {
      id: "b-1",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      typ: "NACHWEIS",
      status: "ERSTELLT",
      einreichung_id: "e-1",
      anzeigename: "Beleg.pdf",
      dateiname: "beleg.pdf",
      content_type: "application/pdf",
      size_in_bytes: 1234,
    };

    expect(BelegSchema.parse(apiResponse)).toEqual({
      id: "b-1",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      typ: "NACHWEIS",
      status: "ERSTELLT",
      einreichungId: "e-1",
      anzeigename: "Beleg.pdf",
      dateiname: "beleg.pdf",
      contentType: "application/pdf",
      sizeInBytes: 1234,
    });
  });

  it("allows a null typ while the Beleg is still IN_BEARBEITUNG", () => {
    const apiResponse = {
      id: "b-1",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      typ: null,
      status: "IN_BEARBEITUNG",
      dateiname: null,
      content_type: null,
    };

    expect(BelegSchema.parse(apiResponse).typ).toBeNull();
  });
});
