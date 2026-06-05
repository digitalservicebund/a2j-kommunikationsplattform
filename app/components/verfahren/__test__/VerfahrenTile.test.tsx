// @vitest-environment jsdom

import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { it } from "vitest";
import VerfahrenTile, { VerfahrenTileProps } from "../VerfahrenTile";

const mockVerfahren: VerfahrenTileProps = {
  id: "123",
  aktenzeichen_gericht: "AZ-123",
  status: "EINGEREICHT",
  status_changed: "2026-05-22T14:02:31.832Z",
  eingereicht_am: "2026-05-22T14:02:31.832Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [
    {
      id: "bet-1",
      name: "Klaus Müller",
      rollen: [
        {
          id: "rolle-1",
          wert: "Kläger:in",
          code: "101",
        },
      ],
      prozessbevollmaechtigte: [
        {
          aktenzeichen: "GZ-12345",
          id: "bev-1",
          name: "Rechtsanwalt Schmidt",
        },
      ],
    },
    {
      id: "bet-2",
      name: "Maria Weber",
      rollen: [
        {
          id: "rolle-2",
          wert: "Beklagte:r",
          code: "028",
        },
      ],
      prozessbevollmaechtigte: [
        {
          aktenzeichen: "GZ-67890",
          id: "bev-2",
          name: "Rechtsanwältin Fischer",
        },
      ],
    },
  ],
};

const mockVerfahrenWithMissingData: VerfahrenTileProps = {
  id: "456",
  aktenzeichen_gericht: "AZ-456",
  status: "EINGEREICHT",
  status_changed: "2026-05-22T14:02:31.832Z",
  eingereicht_am: "2026-05-22T14:02:31.832Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: null,
};

describe("VerfahrenTile", () => {
  const { buttons } = getTestTranslations();
  it("should render the default state", () => {
    const { getByRole, queryByRole, getByText, container } =
      renderWithTestTranslations(
        <MemoryRouter>
          <VerfahrenTile {...mockVerfahren} />
        </MemoryRouter>,
      );

    expect(getByText("Klaus Müller")).toBeInTheDocument();
    expect(getByText("Maria Weber")).toBeInTheDocument();
    expect(getByText("GZ-12345")).toBeInTheDocument();
    expect(getByText("Landgericht Frankfurt")).toBeInTheDocument();
    expect(getByText("AZ-123")).toBeInTheDocument();

    expect(
      (
        getByRole("link", {
          name: buttons.SHOW_VERFAHREN_DETAILS,
        }) as HTMLAnchorElement
      ).href,
    ).toContain("/verfahren/123");

    // no "Urteil anzeigen" button
    expect(
      queryByRole("link", {
        name: buttons.SHOW_URTEIL,
      }),
    ).not.toBeInTheDocument();

    // badge is shown for submitted cases
    expect(container.querySelector(".kern-badge")).toBeInTheDocument();
    expect(getByText("Klage eingereicht")).toBeInTheDocument();

    // no "disabled/muted" appearance
    expect(
      container.querySelector("dd.text-kern-layout-text-muted"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".after\\:bg-kern-layout-background-hued"),
    ).not.toBeInTheDocument();
  });

  it("should render 'Unbekannt' for missing data", () => {
    const { getAllByText } = renderWithTestTranslations(
      <MemoryRouter>
        <VerfahrenTile {...mockVerfahrenWithMissingData} />
      </MemoryRouter>,
    );

    const notAvailableElements = getAllByText("Unbekannt");
    expect(notAvailableElements.length).toBeGreaterThan(0);
  });
});
