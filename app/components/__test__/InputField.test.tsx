// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputField from "../InputField";

describe("InputField", () => {
  it("renders label associated with input via id/for", () => {
    render(<InputField label="Name" id="name-input" />);
    const label = screen.getByText("Name");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", "name-input");
    expect(input).toHaveAttribute("id", "name-input");
    expect(input).toHaveAttribute("name", "name-input");
  });

  it("renders placeholder when provided", () => {
    render(<InputField label="Email" id="email-input" placeholder="Search" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.placeholder).toBe("Search");
  });

  it("applies defaultValue", () => {
    render(
      <InputField
        label="Username"
        id="username-input"
        defaultValue="initial"
      />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("initial");
  });

  it("calls onFocus when input is focused", () => {
    const handleFocus = vi.fn();
    render(<InputField label="Focus" id="focus-input" onFocus={handleFocus} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("sets aria-disabled when disabled prop is true", () => {
    render(<InputField label="Disabled" id="disabled-input" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("renders an optional hint when optional prop is true", () => {
    render(<InputField label="Middlename" id="middlename-input" optional />);
    expect(screen.getByText("- Optional")).toBeInTheDocument();
  });

  it("does not render an optional hint when optional prop is omitted", () => {
    render(<InputField label="Name" id="name-input" />);
    expect(screen.queryByText("- Optional")).not.toBeInTheDocument();
  });

  it("defaults to type text", () => {
    render(<InputField label="Name" id="name-input" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.type).toBe("text");
  });

  it("overrides the type when passed, e.g. email", () => {
    render(<InputField label="Email" id="email-input" type="email" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.type).toBe("email");
  });

  it("renders a hint and wires it via aria-describedby", () => {
    render(<InputField label="Name" id="name-input" hint="Wie im Ausweis" />);
    const input = screen.getByRole("textbox");
    expect(screen.getByText("Wie im Ausweis")).toHaveAttribute(
      "id",
      "name-input-hint",
    );
    expect(input).toHaveAttribute("aria-describedby", "name-input-hint");
  });

  it("renders an error, applies the error classes, and wires it via aria-describedby", () => {
    render(<InputField label="Name" id="name-input" error="Pflichtfeld" />);
    const input = screen.getByRole("textbox");
    const wrapper = input.closest(".kern-form-input");

    expect(screen.getByText("Pflichtfeld")).toBeInTheDocument();
    expect(wrapper).toHaveClass("kern-form-input--error");
    expect(input).toHaveClass("kern-form-input__input--error");
    expect(input).toHaveAttribute("aria-describedby", "name-input-error");
  });

  it("joins hint and error ids in aria-describedby when both are present", () => {
    render(
      <InputField
        label="Name"
        id="name-input"
        hint="Wie im Ausweis"
        error="Pflichtfeld"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "name-input-hint name-input-error",
    );
  });
});
