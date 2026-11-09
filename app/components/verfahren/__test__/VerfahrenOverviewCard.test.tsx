// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { makeGerichtInformation } from "~tests/utils/factories/gerichtInformation";
import { makeVerfahren } from "~tests/utils/factories/verfahren";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import VerfahrenOverviewCard from "../VerfahrenOverviewCard";

const verfahren = makeVerfahren({
  id: "123",
  aktenzeichenGericht: "AZ-123",
  verfahrensgegenstand: "Zahlungsklage",
  kurzrubrum: null,
  status: "EINGEREICHT",
  statusGeaendertAm: "2026-05-22T14:02:31.832Z",
  erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
  erstelltAm: "2026-05-22T14:02:31.832Z",
  eingereichtAm: "2026-05-22T14:02:31.832Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [
    {
      beteiligtenart: "natuerlichePerson",
      id: "bet-1",
      nachname: "Müller",
      vorname: "Klaus",
      titel: null,
      namensvorsatz: null,
      rollen: [
        {
          id: "rolle-1",
          rollennummer: null,
          rollenbezeichnung: { id: "rb-1", wert: "Kläger:in", code: "101" },
          geschaeftszeichen: "GZ-12345",
          referenz: [],
        },
      ],
      anschriften: null,
      telekommunikation: null,
    },
    {
      beteiligtenart: "natuerlichePerson",
      id: "bet-2",
      nachname: "Weber",
      vorname: "Maria",
      titel: null,
      namensvorsatz: null,
      rollen: [
        {
          id: "rolle-2",
          rollennummer: null,
          rollenbezeichnung: { id: "rb-2", wert: "Beklagte:r", code: "028" },
          geschaeftszeichen: "GZ-67890",
          referenz: [],
        },
      ],
      anschriften: null,
      telekommunikation: null,
    },
  ],
});

const gerichtInformation = makeGerichtInformation({
  bankverbindungen: [
    {
      iban: "DE16 2500 0000 0025 0015 30",
      bank: "Deutsche Bundesbank",
      bic: "MARKDEF1250",
      kontoinhaber: "Amtsgericht Bremen",
    },
  ],
});

describe("VerfahrenOverviewCard", () => {
  it("renders the Kläger / Beklagte names, Aktenzeichen, Gericht and Verfahrensgegenstand", () => {
    const { getByText, getAllByText } = renderWithTestTranslations(
      <VerfahrenOverviewCard
        verfahren={verfahren}
        gerichtInformation={gerichtInformation}
      />,
    );

    expect(getByText("Klaus Müller ./. Maria Weber")).toBeInTheDocument();
    expect(getByText("Zahlungsklage")).toBeInTheDocument();
    expect(getByText("DE16 2500 0000 0025 0015 30")).toBeInTheDocument();

    // "Landgericht Frankfurt" and "AZ-123" each appear both in the header
    // line and again in the VerfahrenBriefSummaryOfGericht summary column.
    expect(getAllByText("Landgericht Frankfurt").length).toBeGreaterThan(0);
    expect(getAllByText("AZ-123").length).toBeGreaterThan(0);
  });

  it("prefers verfahren.kurzrubrum over the klaeger/beklagte names when set", () => {
    const { getByText, queryByText } = renderWithTestTranslations(
      <VerfahrenOverviewCard
        verfahren={{ ...verfahren, kurzrubrum: "Müller ./. Weber u.a." }}
        gerichtInformation={null}
      />,
    );

    expect(getByText("Müller ./. Weber u.a.")).toBeInTheDocument();
    expect(queryByText("Klaus Müller ./. Maria Weber")).not.toBeInTheDocument();
  });

  it("offers deleting the Verfahren while its Klage hasn't been submitted", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <VerfahrenOverviewCard
            verfahren={{ ...verfahren, status: "ERSTELLT" }}
            gerichtInformation={null}
          />
        ),
      },
    ]);
    renderWithTestTranslations(<Stub />);

    expect(
      screen.getByRole("button", {
        name: getTestTranslations().shared.form.confirmDelete.open,
      }),
    ).toBeInTheDocument();
  });

  it("doesn't offer deleting the Verfahren once its Klage has been submitted", () => {
    renderWithTestTranslations(
      <VerfahrenOverviewCard verfahren={verfahren} gerichtInformation={null} />,
    );

    expect(
      screen.queryByRole("button", {
        name: getTestTranslations().shared.form.confirmDelete.open,
      }),
    ).not.toBeInTheDocument();
  });
});
