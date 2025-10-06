// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import PageFooter from "../PageFooter";

describe("PageFooter", () => {
  it("should render a <nav/> with links and a project info", () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <PageFooter />
      </MemoryRouter>,
    );

    // check if nav is being rendered
    expect(
      getByLabelText("Rechtliche und weiterführende Informationen"),
    ).toBeInTheDocument();
    // check if a link is being rendered
    expect(getByRole("link", { name: "Datenschutz" })).toBeInTheDocument();
    // check if proejct info is present
    expect(
      screen.getByText(
        "Ein Onlineprojekt der DigitalService GmbH des Bundes in Zusammenarbeit mit der BRAK, SINC und im Auftrag des BMJV.",
      ),
    ).toBeInTheDocument();
  });
});
