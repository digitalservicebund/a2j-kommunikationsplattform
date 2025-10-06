// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import {
  getTranslationsForTests,
  renderWithTranslations,
} from "~/util/test/testUtils";
import PageFooter from "../PageFooter";

describe("PageFooter", () => {
  const { labels, descriptions, contentLinkLabels } = getTranslationsForTests();
  it("should render a <nav/> with links and a project info", () => {
    const { getByLabelText, getByRole } = renderWithTranslations(
      <MemoryRouter>
        <PageFooter />
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
