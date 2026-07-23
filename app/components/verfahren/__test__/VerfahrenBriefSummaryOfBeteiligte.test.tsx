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

  it("renders beteiligte details with formatted vertretung values", () => {
    render(
      <VerfahrenBriefSummaryOfBeteiligte
        title="Beklagte"
        beteiligte={[
          {
            id: "bet-1",
            name: "Erika Mustermann",
            prozessbevollmaechtigte: [
              {
                name: "RA Schmidt",
                aktenzeichen: "AZ-100",
              },
              {
                name: null,
              },
            ],
          },
          {
            id: "bet-2",
            name: null,
            prozessbevollmaechtigte: null,
          },
        ]}
        fallbackLabel="Keine Beteiligten vorhanden"
        notAvailableLabel="Unbekannt"
      />,
    );

    expect(screen.getByText("Erika Mustermann")).toBeInTheDocument();
    expect(
      screen.getByText("RA Schmidt (AZ-100), Unbekannt"),
    ).toBeInTheDocument();

    const unknownValues = screen.getAllByText("Unbekannt");
    expect(unknownValues.length).toBeGreaterThanOrEqual(4);
  });
});
