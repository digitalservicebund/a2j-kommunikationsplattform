import { describe, expect, it } from "vitest";
import { isValidierungslaufRunning } from "../validierungslauf";

describe("isValidierungslaufRunning", () => {
  it("is true while the Validierungslauf hasn't finished", () => {
    expect(
      isValidierungslaufRunning({
        validierungslaufStatus: "LAEUFT",
        ergebnis: "NICHT_VERFUEGBAR",
        fehler: [],
      }),
    ).toBe(true);
  });

  it("is false once ABGESCHLOSSEN", () => {
    expect(
      isValidierungslaufRunning({
        validierungslaufStatus: "ABGESCHLOSSEN",
        ergebnis: "GRUEN",
        fehler: [],
      }),
    ).toBe(false);
  });
});
