import { describe, expect, it } from "vitest";
import {
  isValidierungslaufRunning,
  resolveBelegPresentation,
  resolveReadinessPresentation,
} from "../einreichungReadiness";

const badgeLabels = {
  ready: "ready",
  soon: "soon",
  checking: "checking",
  problem: "problem",
  warning: "warning",
};

describe("isValidierungslaufRunning", () => {
  it("is true while the Validierungslauf hasn't finished", () => {
    expect(
      isValidierungslaufRunning({
        validierungslauf_status: "LAEUFT",
        ergebnis: "NICHT_VERFUEGBAR",
        fehler: [],
      }),
    ).toBe(true);
  });

  it("is false once ABGESCHLOSSEN", () => {
    expect(
      isValidierungslaufRunning({
        validierungslauf_status: "ABGESCHLOSSEN",
        ergebnis: "GRUEN",
        fehler: [],
      }),
    ).toBe(false);
  });
});

describe("resolveReadinessPresentation", () => {
  it("shows checking while running", () => {
    const result = resolveReadinessPresentation(
      {
        validierungslauf_status: "AUSSTEHEND",
        ergebnis: "NICHT_VERFUEGBAR",
        fehler: [],
      },
      badgeLabels,
    );

    expect(result).toEqual({
      readinessLabel: "checking",
      readinessBadgeClass: "info",
    });
  });

  it("shows checking when a related Validierungsstatus is still running", () => {
    const result = resolveReadinessPresentation(
      {
        validierungslauf_status: "ABGESCHLOSSEN",
        ergebnis: "GRUEN",
        fehler: [],
      },
      badgeLabels,
      [
        {
          validierungslauf_status: "LAEUFT",
          ergebnis: "NICHT_VERFUEGBAR",
          fehler: [],
        },
      ],
    );

    expect(result.readinessBadgeClass).toBe("info");
  });

  it("maps GRUEN/ROT/GELB/other to the right tone once finished", () => {
    const finished = (
      ergebnis: "GRUEN" | "ROT" | "GELB" | "NICHT_VERFUEGBAR",
    ) =>
      resolveReadinessPresentation(
        { validierungslauf_status: "ABGESCHLOSSEN", ergebnis, fehler: [] },
        badgeLabels,
      );

    expect(finished("GRUEN")).toEqual({
      readinessLabel: "ready",
      readinessBadgeClass: "success",
    });
    expect(finished("ROT")).toEqual({
      readinessLabel: "problem",
      readinessBadgeClass: "danger",
    });
    expect(finished("GELB")).toEqual({
      readinessLabel: "warning",
      readinessBadgeClass: "warning",
    });
    expect(finished("NICHT_VERFUEGBAR")).toEqual({
      readinessLabel: "soon",
      readinessBadgeClass: "warning",
    });
  });
});

describe("resolveBelegPresentation", () => {
  const belegBadgeLabels = { pending: "pending", ready: "ready" };

  it("is success once ERSTELLT", () => {
    expect(
      resolveBelegPresentation(
        { status: "ERSTELLT" } as never,
        belegBadgeLabels,
      ),
    ).toEqual({ readinessLabel: "ready", readinessBadgeClass: "success" });
  });

  it("is info while IN_BEARBEITUNG", () => {
    expect(
      resolveBelegPresentation(
        { status: "IN_BEARBEITUNG" } as never,
        belegBadgeLabels,
      ),
    ).toEqual({ readinessLabel: "pending", readinessBadgeClass: "info" });
  });
});
