import { describe, expect, it } from "vitest";
import { KommunikationsanschlussInputSchema } from "../kommunikationsanschluss.input.schema";

describe("KommunikationsanschlussInputSchema", () => {
  it("maps the camelCase domain shape to the snake_case wire shape", () => {
    const input = {
      telekommunikationsartId: "tka-email",
      verbindung: "emiliakuehn@posteo.de",
    };

    expect(KommunikationsanschlussInputSchema.parse(input)).toEqual({
      telekommunikationsart_id: "tka-email",
      verbindung: "emiliakuehn@posteo.de",
    });
  });

  it("throws on an invalid input", () => {
    expect(() =>
      KommunikationsanschlussInputSchema.parse({ invalid: true }),
    ).toThrow();
  });
});
