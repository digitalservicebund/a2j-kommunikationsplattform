// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenSelect from "../VerfahrenSelect";

describe("VerfahrenSelect", () => {
  const options = [
    { value: "ag-koeln", label: "Amtsgericht Koln" },
    { value: "lg-hamburg", label: "Landgericht Hamburg" },
  ];

  const defaultProps = {
    id: "gericht",
    label: "Empfangergericht",
    options,
    selectedValue: "",
    onChange: vi.fn(),
  };

  it("renders label, placeholder and all options", () => {
    renderWithTestTranslations(
      <VerfahrenSelect {...defaultProps} placeholder="Bitte auswahlen" />,
    );

    expect(screen.getByLabelText("Empfangergericht")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Bitte auswahlen" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Amtsgericht Koln" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Landgericht Hamburg" }),
    ).toBeInTheDocument();
  });

  it("uses selectedValue", () => {
    renderWithTestTranslations(
      <VerfahrenSelect {...defaultProps} selectedValue="lg-hamburg" />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("lg-hamburg");
  });

  it("calls onChange when user selects another option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTestTranslations(
      <VerfahrenSelect {...defaultProps} onChange={handleChange} />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "ag-koeln");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("passes hint, error, required and disabled state", () => {
    renderWithTestTranslations(
      <VerfahrenSelect
        {...defaultProps}
        hint="Wahlen Sie ein Gericht"
        error="Bitte Gericht auswahlen"
        required
        disabled
      />,
    );

    const select = screen.getByRole("combobox");
    expect(screen.getByText("Wahlen Sie ein Gericht")).toBeInTheDocument();
    expect(screen.getByText("Bitte Gericht auswahlen")).toBeInTheDocument();
    expect(select).toHaveAttribute("required");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });
});
