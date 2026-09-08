// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import InputFile from "../InputFile";

describe("InputFile", () => {
  it("renders a file input labeled via id/for", () => {
    render(<InputFile label="Datei hochladen" id="file" />);
    const label = screen.getByText("Datei hochladen");
    const input = screen.getByLabelText("Datei hochladen") as HTMLInputElement;
    expect(label).toHaveAttribute("for", "file");
    expect(input).toHaveAttribute("id", "file");
    expect(input).toHaveAttribute("name", "file");
    expect(input.type).toBe("file");
  });

  it("renders a hint and wires it via aria-describedby", () => {
    render(<InputFile label="Datei hochladen" id="file" hint="Max. 100 MB" />);
    const input = screen.getByLabelText("Datei hochladen");
    expect(screen.getByText("Max. 100 MB")).toHaveAttribute("id", "file-hint");
    expect(input).toHaveAttribute("aria-describedby", "file-hint");
  });

  it("renders an error, applies the error classes, and wires it via aria-describedby", () => {
    render(<InputFile label="Datei hochladen" id="file" error="Pflichtfeld" />);
    const input = screen.getByLabelText("Datei hochladen");
    const wrapper = input.closest(".kern-form-input");

    expect(screen.getByText("Pflichtfeld")).toBeInTheDocument();
    expect(wrapper).toHaveClass("kern-form-input--error");
    expect(input).toHaveClass("kern-form-input__input--error");
    expect(input).toHaveAttribute("aria-describedby", "file-error");
  });

  it("joins hint and error ids in aria-describedby when both are present", () => {
    render(
      <InputFile
        label="Datei hochladen"
        id="file"
        hint="Max. 100 MB"
        error="Pflichtfeld"
      />,
    );
    const input = screen.getByLabelText("Datei hochladen");
    expect(input).toHaveAttribute("aria-describedby", "file-hint file-error");
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputFile label="Datei hochladen" id="file" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("calls onChange when a file is selected", () => {
    const handleChange = vi.fn();
    render(
      <InputFile label="Datei hochladen" id="file" onChange={handleChange} />,
    );
    const input = screen.getByLabelText("Datei hochladen") as HTMLInputElement;
    const file = new File(["content"], "klage.pdf", {
      type: "application/pdf",
    });
    Object.defineProperty(input, "files", { value: [file] });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
