// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { it } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  const { labels, descriptions, contentLinkLabels } = getTestTranslations();
  it("should render a <nav/> with links and a project info", () => {
    const { getByLabelText, getByRole } = renderWithTestTranslations(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    // check if nav is being rendered
    expect(getByLabelText(labels.FOOTER_ARIA_LABEL)).toBeInTheDocument();
    // check if a link is being rendered
    expect(
      getByRole("link", { name: contentLinkLabels.DATENSCHUTZ_LINK_LABEL }),
    ).toBeInTheDocument();
    // check if proejct info is present
    expect(
      screen.getByText(descriptions.PROJECT_DESCRIPTION),
    ).toBeInTheDocument();
  });
});
