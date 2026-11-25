import { describe, expect, it } from "vitest";
import { TelekommunikationInputSchema } from "../kommunikationsanschluss.input.schema";

describe("TelekommunikationInputSchema", () => {
  it("maps the camelCase domain shape to the snake_case wire shape", () => {
    const input = {
      telekommunikationsartId: "tka-email",
      verbindung: "emiliakuehn@posteo.de",
    };

    expect(TelekommunikationInputSchema.parse(input)).toEqual({
      telekommunikationsart_id: "tka-email",
      verbindung: "emiliakuehn@posteo.de",
    });
  });

  it("throws on an invalid input", () => {
    expect(() =>
      TelekommunikationInputSchema.parse({ invalid: true }),
    ).toThrow();
  });
});
