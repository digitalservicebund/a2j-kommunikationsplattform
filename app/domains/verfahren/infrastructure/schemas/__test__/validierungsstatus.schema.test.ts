import { describe, expect, it } from "vitest";
import { ValidierungsstatusSchema } from "~/domains/verfahren/infrastructure/schemas/validierungsstatus.schema";

describe("ValidierungsstatusSchema", () => {
  it("maps the snake_case API response to the camelCase domain shape", () => {
    const apiResponse = {
      validierungslauf_status: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    };

    expect(ValidierungsstatusSchema.parse(apiResponse)).toEqual({
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    });
  });
});
