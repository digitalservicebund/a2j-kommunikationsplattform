// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import type { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import VerfahrenFilterBar from "../VerfahrenFilterBar";

const gerichte: CodeWert[] = [
  { id: "gericht-1", wert: "Landgericht Frankfurt", code: "LG_FFM" },
];

const baseProps = {
  gerichte,
  isInputDisabled: false,
  searchDefaultValue: "",
  onSearch: vi.fn(),
  gerichtValue: "",
  onGerichtChange: vi.fn(),
  sortValue: "",
  onSortChange: vi.fn(),
};

describe("VerfahrenFilterBar", () => {
  it("renders the search input, gericht select and sort select", () => {
    const { getByLabelText, getByRole } = renderWithTestTranslations(
      <VerfahrenFilterBar {...baseProps} />,
    );

    expect(getByLabelText("Zuständiges Gericht")).toBeInTheDocument();
    expect(getByLabelText("Sortierung")).toBeInTheDocument();
    expect(
      getByRole("option", { name: "Landgericht Frankfurt" }),
    ).toBeInTheDocument();
  });

  it("disables the inputs when isInputDisabled is true", () => {
    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenFilterBar {...baseProps} isInputDisabled />,
    );

    expect(getByLabelText("Zuständiges Gericht")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(getByLabelText("Sortierung")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
