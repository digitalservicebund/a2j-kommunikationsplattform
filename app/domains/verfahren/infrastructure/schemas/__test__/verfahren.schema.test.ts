import { describe, expect, it } from "vitest";
import { VerfahrenSchema } from "~/domains/verfahren/infrastructure/schemas/verfahren.schema";

describe("VerfahrenSchema", () => {
  it("maps the snake_case API response to the camelCase domain shape", () => {
    const apiResponse = {
      id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
      aktenzeichen_gericht: "JBA-82746242",
      verfahrensgegenstand: null,
      kurzrubrum: null,
      status: "ERSTELLT",
      status_geaendert_am: "2025-03-08T05:00:29.659Z",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2025-03-08T05:00:29.659Z",
      eingereicht_am: "2024-12-29T22:46:29.329Z",
      gericht: {
        id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        wert: "Landgericht Frankfurt",
        code: "LG_FFM",
      },
      beteiligungen: [],
    };

    const result = VerfahrenSchema.parse(apiResponse);

    expect(result).toEqual({
      id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
      aktenzeichenGericht: "JBA-82746242",
      verfahrensgegenstand: null,
      kurzrubrum: null,
      status: "ERSTELLT",
      statusGeaendertAm: "2025-03-08T05:00:29.659Z",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2025-03-08T05:00:29.659Z",
      eingereichtAm: "2024-12-29T22:46:29.329Z",
      gericht: {
        id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        wert: "Landgericht Frankfurt",
        code: "LG_FFM",
      },
      beteiligungen: [],
    });
  });

  it("throws on an invalid response", () => {
    expect(() => VerfahrenSchema.parse({ invalid: true })).toThrow();
  });
});
