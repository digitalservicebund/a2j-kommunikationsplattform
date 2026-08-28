import { describe, expect, it } from "vitest";
import { AnschriftInputSchema } from "../anschrift.input.schema";

describe("AnschriftInputSchema", () => {
  it("maps the camelCase domain shape to the snake_case wire shape", () => {
    const input = {
      anschriftstypId: "typ-1",
      strasse: "Römerberg",
      hausnummer: "2",
      postleitzahl: "60311",
      ort: "Frankfurt am Main",
      postfachnummer: null,
      staatId: "staat-1",
    };

    expect(AnschriftInputSchema.parse(input)).toEqual({
      anschriftstyp_id: "typ-1",
      strasse: "Römerberg",
      hausnummer: "2",
      postleitzahl: "60311",
      ort: "Frankfurt am Main",
      postfachnummer: null,
      staat_id: "staat-1",
    });
  });

  it("throws on an invalid input", () => {
    expect(() => AnschriftInputSchema.parse({ invalid: true })).toThrow();
  });
});
