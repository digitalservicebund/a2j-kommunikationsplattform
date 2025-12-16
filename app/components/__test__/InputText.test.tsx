// File: `app/components/__test__/InputText.test.tsx`
// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputText from "../InputText";

describe("InputText", () => {
  it("renders label associated with input via id/for", () => {
    render(<InputText label="Name" id="name-input" />);
    const label = screen.getByText("Name");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", "name-input");
    expect(input).toHaveAttribute("id", "name-input");
    expect(input).toHaveAttribute("name", "name-input");
  });

  it("renders placeholder when provided", () => {
    render(<InputText label="Email" id="email-input" placeholder="Search" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.placeholder).toBe("Search");
  });

  it("applies defaultValue", () => {
    render(
      <InputText label="Username" id="username-input" defaultValue="initial" />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("initial");
  });

  it("calls onFocus when input is focused", () => {
    const handleFocus = vi.fn();
    render(<InputText label="Focus" id="focus-input" onFocus={handleFocus} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("sets aria-disabled when disabled prop is true", () => {
    render(<InputText label="Disabled" id="disabled-input" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-disabled", "true");
  });
});
