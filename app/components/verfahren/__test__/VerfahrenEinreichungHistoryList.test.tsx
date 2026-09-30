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
  it("renders one collapsed KERN accordion per einreichung, with name, Dokument count and status badge in the header", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList einreichungen={einreichungen} />,
    );

    const details = container.querySelectorAll("details.kern-accordion");
    expect(details).toHaveLength(1);
    expect(details[0]).not.toHaveAttribute("open");

    const summary = details[0].querySelector("summary");
    expect(summary?.querySelector(".kern-title")).toHaveTextContent(
      "Erste Einreichung",
    );
    expect(summary).toHaveTextContent("0 Dokumente");
    expect(summary?.querySelector(".kern-badge--success")).toHaveTextContent(
      "Eingereicht",
    );
  });

  it("lists the uploaded Dokumente in the body but hides the XJustiz Dokument", () => {
    const { container, getByText, queryByText } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList
        einreichungen={[
          {
            ...einreichungen[0],
            dokumente: [
              {
                id: "d-1",
                typ: "SCHRIFTSTUECK",
                anzeigename: "Schriftsatz.pdf",
                sizeInBytes: 1024,
                erstelltAm: "2026-01-01T00:00:00.000Z",
              },
              {
                id: "d-2",
                typ: "XJUSTIZ",
                anzeigename: "xjustiz.xml",
                erstelltAm: "2026-01-01T00:00:00.000Z",
              },
            ] as EinreichungSummary["dokumente"],
          },
        ]}
      />,
    );

    expect(container.querySelector("summary")).toHaveTextContent("1 Dokument");
    expect(getByText("Schriftsatz.pdf")).toBeInTheDocument();
    expect(queryByText("xjustiz.xml")).not.toBeInTheDocument();
  });

  it("shows the empty state in the body when an einreichung has no Dokumente", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList einreichungen={einreichungen} />,
    );

    expect(getByText("Keine Dokumente vorhanden.")).toBeInTheDocument();
  });

  it("renders the empty-state message when there are no einreichungen", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenEinreichungHistoryList einreichungen={[]} />,
    );

    expect(getByText("Keine Einreichung vorhanden.")).toBeInTheDocument();
  });
});
