// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~/util/testUtils";
import VerfahrenTile, { type VerfahrenTileProps } from "../VerfahrenTile";

describe("VerfahrenTile", () => {
  const { buttons } = getTestTranslations();

  const mockBeteiligungen: VerfahrenTileProps["beteiligungen"] = [
    {
      id: "1",
      name: "Klaus",
      rollen: [
        {
          id: "role-1",
          wert: "Kläger(in)",
          code: "101",
        },
      ],
      prozessbevollmaechtigte: [],
    },
    {
      id: "2",
      name: "Maria Schmidt",
      rollen: [
        {
          id: "role-2",
          wert: "Beklagte(r)",
          code: "028",
        },
      ],
      prozessbevollmaechtigte: [],
    },
  ];

  it("should render the default state", () => {
    const { getByRole, queryByRole, getByText, container } =
      renderWithTestTranslations(
        <MemoryRouter>
          <VerfahrenTile id="123" beteiligungen={mockBeteiligungen} />
        </MemoryRouter>,
      );

    expect(getByText("Klaus")).toBeInTheDocument();
    expect(getByText("Maria Schmidt")).toBeInTheDocument();

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

  it("should render with gericht and aktenzeichen", () => {
    const { getByText } = render(
      <MemoryRouter>
        <VerfahrenTile
          id="123"
          beteiligungen={mockBeteiligungen}
          gericht={{
            id: "gericht-1",
            wert: "Landgericht Frankfurt",
            code: "LG_FFM",
          }}
          aktenzeichen_gericht="JBA-82746242"
        />
      </MemoryRouter>,
    );

    expect(getByText("Landgericht Frankfurt")).toBeInTheDocument();
    expect(getByText("JBA-82746242")).toBeInTheDocument();
  });

  it("should render with prozessbevollmaechtigte", () => {
    const beteiligungen: VerfahrenTileProps["beteiligungen"] = [
      {
        id: "1",
        name: "Klaus",
        rollen: [
          {
            id: "role-1",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "GZ-123",
            bevollmaechtigter: {
              id: "anwalt-1",
              safe_id: "safe-1",
              name: "RA Müller",
            },
          },
        ],
      },
      {
        id: "2",
        name: "Maria Schmidt",
        rollen: [
          {
            id: "role-2",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "GZ-456",
            bevollmaechtigter: {
              id: "anwalt-2",
              safe_id: "safe-2",
              name: "RA Schmidt",
            },
          },
        ],
      },
    ];

    const { getByText } = render(
      <MemoryRouter>
        <VerfahrenTile id="123" beteiligungen={beteiligungen} />
      </MemoryRouter>,
    );

    expect(getByText("GZ-123")).toBeInTheDocument();
    expect(getByText("RA Schmidt")).toBeInTheDocument();
  });
});
