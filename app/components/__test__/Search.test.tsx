// @vitest-environment jsdom
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormEvent } from "react";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import Search from "../Search";

describe("Search", () => {
  const { placeholders, labels, buttons } = getTestTranslations();

  it("renders input and submit button with translations and defaultValue", () => {
    renderWithTestTranslations(
      <Search
        handleSearch={() => {}}
        disabled={false}
        defaultValue="initial"
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button", { name: buttons.SEARCH_BUTTON });

    expect(screen.getByText(labels.SEARCH_LABEL)).toBeInTheDocument();
    expect(input.placeholder).toBe(placeholders.SEARCH_PLACEHOLDER);
    expect(input.value).toBe("initial");
    expect(button).toBeInTheDocument();
  });

  it("calls handleSearch when form is submitted", async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn((e: FormEvent<HTMLFormElement>) => {
      // prevent actual navigation in test
      e.preventDefault?.();
    });

    renderWithTestTranslations(
      <Search handleSearch={handleSearch} disabled={false} defaultValue="" />,
    );

    const button = screen.getByRole("button", { name: buttons.SEARCH_BUTTON });
    await user.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when disabled prop is true", () => {
    renderWithTestTranslations(
      <Search handleSearch={() => {}} disabled={true} defaultValue="" />,
    );

    const button = screen.getByRole("button", { name: buttons.SEARCH_BUTTON });
    expect(button).toBeDisabled();
  });

  it("selects all text in the input when focused", () => {
    renderWithTestTranslations(
      <Search
        handleSearch={() => {}}
        disabled={false}
        defaultValue="select-me"
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    // focus should trigger the inline onFocus which calls select()
    fireEvent.focus(input);

    // selectionStart/selectionEnd should cover the whole value
    const len = input.value.length;
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(len);
  });
});
