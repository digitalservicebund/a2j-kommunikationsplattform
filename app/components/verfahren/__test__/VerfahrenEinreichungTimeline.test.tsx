// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import type { EinreichungSummary } from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import VerfahrenEinreichungTimeline from "../VerfahrenEinreichungTimeline";

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

describe("VerfahrenEinreichungTimeline", () => {
  it("renders one collapsed KERN accordion per einreichung, with name, Dokument count and status badge in the header", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenEinreichungTimeline einreichungen={einreichungen} />,
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
      <VerfahrenEinreichungTimeline
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
      <VerfahrenEinreichungTimeline einreichungen={einreichungen} />,
    );

    expect(getByText("Keine Dokumente vorhanden.")).toBeInTheDocument();
  });

  it("renders one timeline step per einreichung, newest first, connected except after the last", () => {
    const aelter = einreichungen[0];
    const neuer: EinreichungSummary = {
      ...aelter,
      einreichung: {
        ...aelter.einreichung,
        id: "e-2",
        name: "Schriftsatz",
        status: "ERSTELLT",
        erstelltAm: "2026-02-01T00:00:00.000Z",
        eingereichtAm: null,
      },
    };

    const { container, getAllByTestId } = renderWithTestTranslations(
      <VerfahrenEinreichungTimeline einreichungen={[aelter, neuer]} />,
    );

    const titles = [...container.querySelectorAll(".kern-title")].map(
      (title) => title.textContent,
    );
    expect(titles).toEqual(["Schriftsatz", "Erste Einreichung"]);
    expect(getAllByTestId("timeline-step-connector")).toHaveLength(1);
    // The still-open Einreichung gets the draft (edit) icon.
    const icons = container.querySelectorAll(".kern-icon--default");
    expect(icons[0]).toHaveClass("kern-icon--edit");
    expect(icons[1]).toHaveClass("kern-icon--check");
  });

  it("renders the empty-state message when there are no einreichungen", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenEinreichungTimeline einreichungen={[]} />,
    );

    expect(getByText("Keine Einreichung vorhanden.")).toBeInTheDocument();
  });
});
