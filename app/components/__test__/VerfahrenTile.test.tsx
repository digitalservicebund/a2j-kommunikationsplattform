// @vitest-environment jsdom

import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { it } from "vitest";
import VerfahrenTile, { VerfahrenTileProps } from "../verfahren/VerfahrenTile";

const mockVerfahren: VerfahrenTileProps = {
  id: "123",
  aktenzeichen_gericht: "AZ-123",
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
          bevollmaechtigter: {
            id: "bev-1",
            safe_id: "safe-1",
            name: "Rechtsanwalt Schmidt",
          },
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
          bevollmaechtigter: {
            id: "bev-2",
            safe_id: "safe-2",
            name: "Rechtsanwältin Fischer",
          },
        },
      ],
    },
  ],
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
    expect(getByText("Rechtsanwältin Fischer")).toBeInTheDocument();
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

    // no badge
    expect(container.querySelector(".kern-badge")).not.toBeInTheDocument();

    // no "disabled/muted" appearance
    expect(
      container.querySelector("dd.text-kern-layout-text-muted"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".after\\:bg-kern-layout-background-hued"),
    ).not.toBeInTheDocument();
  });

  it("should render 'nicht verfügbar' for missing data", () => {
    const { getAllByText } = renderWithTestTranslations(
      <MemoryRouter>
        <VerfahrenTile id="123" beteiligungen={[]} />
      </MemoryRouter>,
    );

    const notAvailableElements = getAllByText("nicht verfügbar");
    expect(notAvailableElements.length).toBeGreaterThan(0);
  });
});
