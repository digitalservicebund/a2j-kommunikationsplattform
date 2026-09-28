import { describe, expect, it } from "vitest";
import {
  resolveBelegPresentation,
  resolveReadinessPresentation,
} from "../einreichungReadiness";

const badgeLabels = {
  ready: "ready",
  soon: "soon",
  checking: "checking",
  problem: "problem",
  warning: "warning",
  notAvailable: "notAvailable",
};

describe("resolveReadinessPresentation", () => {
  it("shows checking while running", () => {
    const result = resolveReadinessPresentation(
      {
        validierungslaufStatus: "AUSSTEHEND",
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
        validierungslaufStatus: "ABGESCHLOSSEN",
        ergebnis: "GRUEN",
        fehler: [],
      },
      badgeLabels,
      [
        {
          validierungslaufStatus: "LAEUFT",
          ergebnis: "NICHT_VERFUEGBAR",
          fehler: [],
        },
      ],
    );

    expect(result.readinessBadgeClass).toBe("info");
  });

  it("maps GRUEN/ROT/GELB to the right tone once finished", () => {
    const finished = (ergebnis: "GRUEN" | "ROT" | "GELB") =>
      resolveReadinessPresentation(
        { validierungslaufStatus: "ABGESCHLOSSEN", ergebnis, fehler: [] },
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
  });

  // Only ROT blocks Einreichen (per the API's einreichen 409 contract), so
  // NICHT_VERFUEGBAR (e.g. the system-generated XJustiz Dokument, which
  // isn't subject to content validation) is non-blocking — but it wasn't
  // actually checked, so it gets its own neutral badge instead of "ready".
  it("shows a neutral notAvailable badge for a finished NICHT_VERFUEGBAR result", () => {
    const result = resolveReadinessPresentation(
      {
        validierungslaufStatus: "ABGESCHLOSSEN",
        ergebnis: "NICHT_VERFUEGBAR",
        fehler: [],
      },
      badgeLabels,
    );

    expect(result).toEqual({
      readinessLabel: "notAvailable",
      readinessBadgeClass: "info",
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
    ).toEqual({
      readinessLabel: "ready",
      readinessBadgeClass: "success",
    });
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
