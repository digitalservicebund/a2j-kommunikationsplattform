// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenDokumentTypeSelect from "../VerfahrenDokumentTypeSelect";

describe("VerfahrenDokumentTypeSelect", () => {
  const defaultProps = {
    id: "dokument-type",
    label: "Dokumenttyp",
    selectedValue: "",
    onChange: vi.fn(),
  };

  it("renders all dokument type options", () => {
    renderWithTestTranslations(
      <VerfahrenDokumentTypeSelect {...defaultProps} />,
    );

    expect(screen.getByRole("option", { name: "Anhang" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Schriftstück" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "XJustiz" })).toBeInTheDocument();
  });

  it("calls onChange handler when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTestTranslations(
      <VerfahrenDokumentTypeSelect
        {...defaultProps}
        onChange={handleChange}
        placeholder="Bitte auswahlen"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "XJUSTIZ");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("passes hint and error through to underlying select", () => {
    renderWithTestTranslations(
      <VerfahrenDokumentTypeSelect
        {...defaultProps}
        hint="Wahlen Sie den Dokumenttyp"
        error="Bitte Dokumenttyp auswahlen"
      />,
    );

    expect(screen.getByText("Wahlen Sie den Dokumenttyp")).toBeInTheDocument();
    expect(screen.getByText("Bitte Dokumenttyp auswahlen")).toBeInTheDocument();
  });

  it("respects required and disabled attributes", () => {
    renderWithTestTranslations(
      <VerfahrenDokumentTypeSelect {...defaultProps} required disabled />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("required");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });
});
