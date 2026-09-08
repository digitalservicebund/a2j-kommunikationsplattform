import { describe, expect, it } from "vitest";
import { RollenInputSchema } from "../rollen.input.schema";

describe("RollenInputSchema", () => {
  it("maps the camelCase domain shape to the snake_case wire shape", () => {
    const input = {
      rollennummer: "klaegerin",
      rollenbezeichnungId: "rolle-1",
      geschaeftszeichen: null,
      referenz: null,
    };

    expect(RollenInputSchema.parse(input)).toEqual({
      rollennummer: "klaegerin",
      rollenbezeichnung_id: "rolle-1",
      geschaeftszeichen: null,
      referenz: null,
    });
  });

  it("throws on an invalid input", () => {
    expect(() => RollenInputSchema.parse({ invalid: true })).toThrow();
  });
});
