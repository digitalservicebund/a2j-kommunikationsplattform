// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import PageFooter, {
  FOOTER_ARIA_LABEL,
  PROJECT_DESCRIPTION,
} from "../PageFooter";

describe("PageFooter", () => {
  it("should render a <nav/> with links and a project info", () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <PageFooter />
      </MemoryRouter>,
    );

    // check if nav is being rendered
    expect(getByLabelText(FOOTER_ARIA_LABEL)).toBeInTheDocument();
    // check if a link is being rendered
    expect(getByRole("link", { name: "Datenschutz" })).toBeInTheDocument();
    // check if proejct info is present
    expect(screen.getByText(PROJECT_DESCRIPTION)).toBeInTheDocument();
  });
});
