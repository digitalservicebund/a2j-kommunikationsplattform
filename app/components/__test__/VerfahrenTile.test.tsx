// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~/util/testUtils";
import VerfahrenTile from "../verfahren/VerfahrenTile";

describe("VerfahrenTile", () => {
  const { buttons } = getTestTranslations();
  it("should render the default state", () => {
    const { getByRole, queryByRole, getByText, container } =
      renderWithTestTranslations(
        <MemoryRouter>
          <VerfahrenTile id="123" mandantin="Klaus" />
        </MemoryRouter>,
      );

    expect(getByText("Klaus")).toBeInTheDocument();

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

  it("should render the badge", () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <VerfahrenTile id="123" update="Neue Dokumente vom Gericht" />
      </MemoryRouter>,
    );

    expect(container.querySelector(".kern-badge")).toBeInTheDocument();
    expect(getByText("Neue Dokumente vom Gericht")).toBeInTheDocument();
  });

  it("should render the 'abgeschlossen' state", () => {
    const { getByRole, container } = render(
      <MemoryRouter>
        <VerfahrenTile id="123" urteilsHref="/urteile/123" abgeschlossen />
      </MemoryRouter>,
    );

    expect(
      (
        getByRole("link", {
          name: "Urteil anzeigen",
        }) as HTMLAnchorElement
      ).href,
    ).toContain("/urteile/123");

    // "disabled/muted" appearance
    expect(
      container.querySelector("dd.text-kern-layout-text-muted"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".after\\:bg-kern-layout-background-hued"),
    ).toBeInTheDocument();
  });
});
