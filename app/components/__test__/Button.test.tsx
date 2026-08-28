// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "../Button";

describe("Button", () => {
  it("renders the base and appearance classes", () => {
    render(<Button appearance="primary" label="Speichern" />);
    const button = screen.getByRole("button", { name: "Speichern" });
    expect(button.className).toContain("kern-btn");
    expect(button.className).toContain("kern-btn--primary");
  });

  it("merges a custom className instead of replacing the base classes", () => {
    render(
      <Button
        appearance="secondary"
        label="Entfernen"
        className="kern-btn--x-small"
      />,
    );
    const button = screen.getByRole("button", { name: "Entfernen" });
    expect(button.className).toContain("kern-btn--secondary");
    expect(button.className).toContain("kern-btn--x-small");
  });

  it("renders children before the label, matching the icon-then-label convention", () => {
    render(
      <Button appearance="secondary" label="Entfernen">
        <span data-testid="icon" />
      </Button>,
    );
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("icon");
    const label = screen.getByText("Entfernen");
    expect(icon).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button.children[0]).toBe(icon);
    expect(button.children[1]).toBe(label);
  });

  it("passes through standard button attributes and calls onClick", () => {
    const handleClick = vi.fn();
    render(
      <Button
        appearance="primary"
        label="Absenden"
        type="submit"
        onClick={handleClick}
      />,
    );
    const button = screen.getByRole("button", { name: "Absenden" });
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled is passed", () => {
    render(<Button appearance="primary" label="Absenden" disabled />);
    expect(screen.getByRole("button", { name: "Absenden" })).toBeDisabled();
  });
});
