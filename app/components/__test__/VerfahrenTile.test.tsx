// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import VerfahrenTile from "../VerfahrenTile";

describe("VerfahrenTile", () => {
  it("should render the default state", () => {
    const { getByRole, queryByRole, getByText, container } = render(
      <MemoryRouter>
        <VerfahrenTile detailsHref="/verfahren/123" mandantin="Klaus" />
      </MemoryRouter>,
    );

    expect(getByText("Klaus")).toBeInTheDocument();

    expect(
      (
        getByRole("link", {
          name: "Verfahrensdetails anzeigen",
        }) as HTMLAnchorElement
      ).href,
    ).toContain("/verfahren/123");

    // no "Urteil anzeigen" button
    expect(
      queryByRole("link", {
        name: "Urteil anzeigen",
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
        <VerfahrenTile
          detailsHref="/verfahren/123"
          update="Neue Dokumente vom Gericht"
        />
      </MemoryRouter>,
    );

    expect(container.querySelector(".kern-badge")).toBeInTheDocument();
    expect(getByText("Neue Dokumente vom Gericht")).toBeInTheDocument();
  });

  it("should render the 'abgeschlossen' state", () => {
    const { getByRole, container } = render(
      <MemoryRouter>
        <VerfahrenTile
          detailsHref="/verfahren/123"
          urteilsHref="/urteile/123"
          abgeschlossen
        />
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
