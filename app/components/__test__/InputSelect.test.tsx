// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~/util/testUtils";
import InputSelect from "../InputSelect";

describe("InputSelect", () => {
  const { labels } = getTestTranslations();
  const defaultProps = {
    label: "Test Label",
    name: "test-select",
  };

  const mockOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  it("renders with required props", () => {
    renderWithTestTranslations(<InputSelect {...defaultProps} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute("name", "test-select");
  });

  it("renders default placeholder when none provided", () => {
    renderWithTestTranslations(<InputSelect {...defaultProps} />);

    expect(
      screen.getByRole("option", { name: labels.PLEASE_SELECT_LABEL }),
    ).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    renderWithTestTranslations(
      <InputSelect {...defaultProps} placeholder="Select an option" />,
    );

    expect(
      screen.getByRole("option", { name: "Select an option" }),
    ).toBeInTheDocument();
  });

  it("renders all options", () => {
    renderWithTestTranslations(
      <InputSelect {...defaultProps} options={mockOptions} />,
    );

    mockOptions.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  it("sets selected value", () => {
    renderWithTestTranslations(
      <InputSelect {...defaultProps} options={mockOptions} selectedValue="2" />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("2");
  });

  it("calls onChange handler when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTestTranslations(
      <InputSelect
        {...defaultProps}
        options={mockOptions}
        onChange={handleChange}
      />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "2");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("applies disabled state via aria-disabled", () => {
    renderWithTestTranslations(
      <InputSelect {...defaultProps} disabled={true} />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });

  it("renders with empty options array", () => {
    renderWithTestTranslations(<InputSelect {...defaultProps} options={[]} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1); // Only placeholder
  });

  it("associates label with select via id", () => {
    renderWithTestTranslations(<InputSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    const label = screen.getByText("Test Label");

    expect(select).toHaveAttribute("id", "test-select");
    expect(label).toHaveAttribute("for", "test-select");
  });
});
