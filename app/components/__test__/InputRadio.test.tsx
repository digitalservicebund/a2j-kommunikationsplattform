// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputRadio from "../InputRadio";

describe("InputRadio", () => {
  it("renders a KERN radio labeled via id/for", () => {
    render(<InputRadio label="Anlage" id="typ-anhang" name="typ" />);

    const radio = screen.getByRole("radio", { name: "Anlage" });
    expect(radio).toHaveAttribute("id", "typ-anhang");
    expect(radio).toHaveAttribute("name", "typ");
    expect(radio).toHaveClass("kern-form-check__radio");
    expect(radio.parentElement).toHaveClass("kern-form-check");
  });

  it("groups radios by their shared name", () => {
    render(
      <>
        <InputRadio label="Anlage" id="typ-anhang" name="typ" value="ANHANG" />
        <InputRadio
          label="Signaturdatei"
          id="typ-signaturdatei"
          name="typ"
          value="SIGNATURDATEI"
          defaultChecked
        />
      </>,
    );

    fireEvent.click(screen.getByRole("radio", { name: "Anlage" }));

    expect(screen.getByRole("radio", { name: "Anlage" })).toBeChecked();
    expect(
      screen.getByRole("radio", { name: "Signaturdatei" }),
    ).not.toBeChecked();
  });

  it("forwards input props", () => {
    const handleChange = vi.fn();
    render(
      <InputRadio
        label="Anlage"
        id="typ-anhang"
        name="typ"
        value="ANHANG"
        onChange={handleChange}
        aria-disabled
      />,
    );

    const radio = screen.getByRole("radio", { name: "Anlage" });
    expect(radio).toHaveAttribute("value", "ANHANG");
    expect(radio).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it("appends extra classes to the wrapper", () => {
    const { container } = render(
      <InputRadio
        label="Anlage"
        id="typ-anhang"
        name="typ"
        className="kern-mt-md"
      />,
    );

    expect(container.querySelector(".kern-form-check")).toHaveClass(
      "kern-mt-md",
    );
  });
});
