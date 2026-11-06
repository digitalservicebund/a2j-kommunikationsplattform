// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import InputLabel from "../InputLabel";

describe("InputLabel", () => {
  const t = getTestTranslations();

  it("renders a KERN label for the given input", () => {
    renderWithTestTranslations(<InputLabel htmlFor="name">Name</InputLabel>);

    const label = screen.getByText("Name");
    expect(label).toHaveClass("kern-label");
    expect(label).toHaveAttribute("for", "name");
    expect(
      screen.queryByText(t.shared.form.optionalSuffix),
    ).not.toBeInTheDocument();
  });

  it("marks an optional input the KERN way", () => {
    renderWithTestTranslations(
      <InputLabel htmlFor="name" optional>
        Name
      </InputLabel>,
    );

    expect(screen.getByText(t.shared.form.optionalSuffix)).toHaveClass(
      "kern-label__optional",
    );
    expect(screen.getByText(/^Name/)).toHaveTextContent(
      `Name ${t.shared.form.optionalSuffix}`,
    );
  });
});
