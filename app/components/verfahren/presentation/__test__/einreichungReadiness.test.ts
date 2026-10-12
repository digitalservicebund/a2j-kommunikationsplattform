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
      label: "checking",
      state: "pending",
      loading: true,
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

    expect(result).toMatchObject({
      state: "pending",
      loading: true,
    });
  });

  it("maps GRUEN/ROT/GELB/other to the right state once finished", () => {
    const finished = (
      ergebnis: "GRUEN" | "ROT" | "GELB" | "NICHT_VERFUEGBAR",
    ) =>
      resolveReadinessPresentation(
        { validierungslaufStatus: "ABGESCHLOSSEN", ergebnis, fehler: [] },
        badgeLabels,
      );

    expect(finished("GRUEN")).toEqual({
      label: "ready",
      state: "done",
      loading: false,
    });
    expect(finished("ROT")).toEqual({
      label: "problem",
      state: "failed",
      loading: false,
    });
    expect(finished("GELB")).toEqual({
      label: "warning",
      state: "attention",
      loading: false,
    });
    expect(finished("NICHT_VERFUEGBAR")).toEqual({
      label: "soon",
      state: "attention",
      loading: false,
    });
  });
});

describe("resolveBelegPresentation", () => {
  const belegBadgeLabels = { pending: "pending", ready: "ready" };

  it("is done once ERSTELLT", () => {
    expect(
      resolveBelegPresentation(
        { status: "ERSTELLT" } as never,
        belegBadgeLabels,
      ),
    ).toEqual({
      label: "ready",
      state: "done",
      loading: false,
    });
  });

  it("is pending and loading while IN_BEARBEITUNG", () => {
    expect(
      resolveBelegPresentation(
        { status: "IN_BEARBEITUNG" } as never,
        belegBadgeLabels,
      ),
    ).toEqual({
      label: "pending",
      state: "pending",
      loading: true,
    });
  });
});
