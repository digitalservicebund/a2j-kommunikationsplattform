// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { makeGericht } from "tests/utils/factories/gericht";
import { makeVerfahren } from "tests/utils/factories/verfahren";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { describe, it, expect } from "vitest";
import { VerfahrenTable } from "../VerfahrenTable";

describe("VerfahrenTable", () => {
  const t = getTestTranslations();

  it("renders Kurzrubrum, Gericht and Aktenzeichen for each Verfahren", async () => {
    const items = [
      makeVerfahren({
        kurzrubrum: "Beispiel 1",
        aktenzeichenGericht: "123 456",
        gericht: makeGericht({ wert: "Amtsgericht München" }),
      }),
      makeVerfahren({
        kurzrubrum: "Beispiel 2",
        aktenzeichenGericht: "789 012",
        gericht: makeGericht({ wert: "Amtsgericht Hamburg" }),
      }),
    ];

    renderWithTestTranslations(
      <MemoryRouter>
        <VerfahrenTable items={items} isLoading={false} />,
      </MemoryRouter>,
    );

    const rowHeaders = screen.getAllByRole("rowheader");
    expect(rowHeaders).toHaveLength(2);

    expect(rowHeaders[0]).toHaveTextContent(/Beispiel 1/);
    expect(rowHeaders[0]).toHaveTextContent(/123 456/);
    expect(rowHeaders[0]).toHaveTextContent(/Amtsgericht München/);

    expect(rowHeaders[1]).toHaveTextContent(/Beispiel 2/);
    expect(rowHeaders[1]).toHaveTextContent(/789 012/);
    expect(rowHeaders[1]).toHaveTextContent(/Amtsgericht Hamburg/);
  });

  it("renders status of each Verfahren", async () => {
    const items = [
      makeVerfahren({ status: "ERSTELLT" }),
      makeVerfahren({ status: "EINGEREICHT" }),
      makeVerfahren({ status: "ABGESCHLOSSEN" }),
    ];

    renderWithTestTranslations(
      <MemoryRouter>
        <VerfahrenTable items={items} isLoading={false} />,
      </MemoryRouter>,
    );

    const statusColumnHeader = screen.getByRole("columnheader", {
      name: t.shared.status.label,
    });
    const statusColumn = screen
      .getAllByRole("columnheader")
      .indexOf(statusColumnHeader);

    const [, ...rows] = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);

    const { erstellt, eingereicht, abgeschlossen } = t.shared.status.verfahren;
    expect(rows[0].childNodes[statusColumn]).toHaveTextContent(erstellt);
    expect(rows[1].childNodes[statusColumn]).toHaveTextContent(eingereicht);
    expect(rows[2].childNodes[statusColumn]).toHaveTextContent(abgeschlossen);
  });
});
