// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import VerfahrenBriefSummaryOfBeteiligte from "../VerfahrenBriefSummaryOfBeteiligte";

describe("VerfahrenBriefSummaryOfBeteiligte", () => {
  it("renders fallback label when no beteiligte are provided", () => {
    render(
      <VerfahrenBriefSummaryOfBeteiligte
        title="Klaeger"
        beteiligte={[]}
        fallbackLabel="Keine Beteiligten vorhanden"
        notAvailableLabel="Unbekannt"
      />,
    );

    expect(screen.getByText("Klaeger")).toBeInTheDocument();
    expect(screen.getByText("Keine Beteiligten vorhanden")).toBeInTheDocument();
  });

  it("renders beteiligte details with separate email/telefon and the Vertretung's own address/contact", () => {
    render(
      <VerfahrenBriefSummaryOfBeteiligte
        title="Beklagte"
        beteiligte={[
          {
            id: "bet-1",
            name: "Erika Mustermann",
            anschrift: "Musterstraße 1, 12345 Berlin",
            email: "erika@example.com",
            telefon: "0123456789",
            prozessbevollmaechtigte: [
              {
                name: "RA Schmidt",
                aktenzeichen: "AZ-100",
                anschrift: "Kanzleistraße 5, 54321 Hamburg",
                email: "schmidt@kanzlei.de",
              },
              {
                name: "Kanzlei Böhm",
                aktenzeichen: null,
                anschrift: null,
                email: null,
              },
              {
                name: null,
                aktenzeichen: null,
                anschrift: null,
                email: null,
              },
            ],
          },
          {
            id: "bet-2",
            name: null,
            anschrift: null,
            email: null,
            telefon: null,
            prozessbevollmaechtigte: [],
          },
        ]}
        fallbackLabel="Keine Beteiligten vorhanden"
        notAvailableLabel="Unbekannt"
      />,
    );

    expect(screen.getByText("Erika Mustermann")).toBeInTheDocument();
    expect(
      screen.getByText("Musterstraße 1, 12345 Berlin"),
    ).toBeInTheDocument();
    expect(screen.getByText("erika@example.com")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("RA Schmidt (AZ-100)")).toBeInTheDocument();
    expect(
      screen.getByText("Kanzleistraße 5, 54321 Hamburg"),
    ).toBeInTheDocument();
    expect(screen.getByText("schmidt@kanzlei.de")).toBeInTheDocument();
    expect(screen.getByText("Kanzlei Böhm")).toBeInTheDocument();

    const unknownValues = screen.getAllByText("Unbekannt");
    expect(unknownValues.length).toBeGreaterThanOrEqual(7);
  });
});
