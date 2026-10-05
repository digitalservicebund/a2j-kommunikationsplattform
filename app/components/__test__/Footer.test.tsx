// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { it } from "vitest";
import Footer from "../layout/Footer";

describe("Footer", () => {
  const t = getTestTranslations();

  it("should render a <nav/> with links and a project info", () => {
    const { getByLabelText, getByRole } = renderWithTestTranslations(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    // check if nav is being rendered
    expect(getByLabelText(t.layout.footer.ariaLabel)).toBeInTheDocument();
    // check if a link is being rendered
    expect(
      getByRole("link", { name: t.layout.footer.links.dataProtection }),
    ).toBeInTheDocument();
    // check if proejct info is present
    expect(
      screen.getByText(t.layout.footer.projectDescription),
    ).toBeInTheDocument();
  });
});
