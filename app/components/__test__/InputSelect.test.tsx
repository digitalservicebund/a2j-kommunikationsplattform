// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InputSelect from "../InputSelect";

describe("InputSelect", () => {
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
    render(<InputSelect {...defaultProps} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute("name", "test-select");
  });

  it("renders default placeholder when none provided", () => {
    render(<InputSelect {...defaultProps} />);

    expect(
      screen.getByRole("option", { name: "Bitte auswählen" }),
    ).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<InputSelect {...defaultProps} placeholder="Select an option" />);

    expect(
      screen.getByRole("option", { name: "Select an option" }),
    ).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<InputSelect {...defaultProps} options={mockOptions} />);

    mockOptions.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  it("sets selected value", () => {
    render(
      <InputSelect {...defaultProps} options={mockOptions} selectedValue="2" />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("2");
  });

  it("calls onChange handler when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
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
    render(<InputSelect {...defaultProps} disabled={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });

  it("renders with empty options array", () => {
    render(<InputSelect {...defaultProps} options={[]} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1); // Only placeholder
  });

  it("associates label with select via id", () => {
    render(<InputSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    const label = screen.getByText("Test Label");

    expect(select).toHaveAttribute("id", "test-select");
    expect(label).toHaveAttribute("for", "test-select");
  });
});
