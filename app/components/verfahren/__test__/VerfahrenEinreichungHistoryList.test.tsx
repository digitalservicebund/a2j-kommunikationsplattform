// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import VerfahrenEinreichungHistoryList from "../VerfahrenEinreichungHistoryList";

const einreichungen: EinreichungSummary[] = [
  {
    einreichung: {
      id: "e-1",
      name: "Erste Einreichung",
      status: "EINGEREICHT",
      erstelltVon: "user-1",
      erstelltAm: "2026-01-01T00:00:00.000Z",
      beantragtAm: null,
      gesendetAm: null,
      eingereichtAm: "2026-01-02T00:00:00.000Z",
      validierungsStatus: "ABGESCHLOSSEN",
      einreichungsStatus: {
        validierungslaufStatus: "ABGESCHLOSSEN",
        ergebnis: "GRUEN",
        fehler: [],
      },
    },
    dokumente: [],
  },
];

describe("VerfahrenEinreichungHistoryList", () => {
  it("renders one timeline card per einreichung", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList einreichungen={einreichungen} />,
    );

    expect(getByText("Erste Einreichung")).toBeInTheDocument();
  });

  it("renders the empty-state message when there are no einreichungen", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList einreichungen={[]} />,
    );

    expect(getByText("Keine Einreichung vorhanden.")).toBeInTheDocument();
  });
});
