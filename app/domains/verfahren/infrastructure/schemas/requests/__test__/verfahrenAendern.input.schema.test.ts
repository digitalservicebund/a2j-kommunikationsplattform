import { describe, expect, it } from "vitest";
import { VerfahrenAendernInputSchema } from "../verfahrenAendern.input.schema";

describe("VerfahrenAendernInputSchema", () => {
  it("maps the camelCase domain shape to the snake_case wire shape", () => {
    const input = {
      verfahrensgegenstand: "Zahlungsklage",
      kurzrubrum: null,
      gerichtId: "b727131c-0c32-91ba-3eaa-f44405967b6d",
      beteiligungen: null,
    };

    expect(VerfahrenAendernInputSchema.parse(input)).toEqual({
      verfahrensgegenstand: "Zahlungsklage",
      kurzrubrum: null,
      gericht_id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
      beteiligungen: null,
    });
  });

  it("throws on an invalid input", () => {
    expect(() =>
      VerfahrenAendernInputSchema.parse({ invalid: true }),
    ).toThrow();
  });
});
