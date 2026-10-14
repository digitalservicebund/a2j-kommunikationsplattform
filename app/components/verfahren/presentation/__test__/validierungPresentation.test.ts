import { describe, expect, it } from "vitest";
import {
  resolveDokumentPresentation,
  resolveEinreichungPresentation,
} from "../validierungPresentation";

const badgeLabels = {
  ready: "ready",
  soon: "soon",
  checking: "checking",
  problem: "problem",
  warning: "warning",
};

describe("resolveEinreichungPresentation", () => {
  it("shows checking while running", () => {
    const result = resolveEinreichungPresentation(
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
    const result = resolveEinreichungPresentation(
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
      resolveEinreichungPresentation(
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

describe("resolveDokumentPresentation", () => {
  const dokumentBadgeLabels = { ...badgeLabels, checkedClean: "checkedClean" };

  it("reads as checked clean instead of ready once GRUEN", () => {
    expect(
      resolveDokumentPresentation(
        {
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        },
        dokumentBadgeLabels,
      ),
    ).toEqual({ label: "checkedClean", state: "done", loading: false });
  });

  it("shows checking while its own Validierungslauf is running", () => {
    expect(
      resolveDokumentPresentation(
        {
          validierungslaufStatus: "LAEUFT",
          ergebnis: "NICHT_VERFUEGBAR",
          fehler: [],
        },
        dokumentBadgeLabels,
      ),
    ).toEqual({ label: "checking", state: "pending", loading: true });
  });

  it("keeps the shared labels for other results", () => {
    expect(
      resolveDokumentPresentation(
        {
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "ROT",
          fehler: [],
        },
        dokumentBadgeLabels,
      ),
    ).toEqual({ label: "problem", state: "failed", loading: false });
  });
});
