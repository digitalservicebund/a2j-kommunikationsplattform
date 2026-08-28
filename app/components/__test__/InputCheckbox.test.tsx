// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputCheckbox from "../InputCheckbox";

describe("InputCheckbox", () => {
  it("renders a checkbox labeled via id/for, defaulting name to id", () => {
    render(
      <InputCheckbox label="Vorabanalyse aktivieren" id="enable-analysis" />,
    );

    const checkbox = screen.getByLabelText(
      "Vorabanalyse aktivieren",
    ) as HTMLInputElement;
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox).toHaveAttribute("name", "enable-analysis");
  });

  it("overrides name when passed", () => {
    render(
      <InputCheckbox
        label="Anwalt vorhanden"
        id="has-lawyer"
        name="hasLawyer"
      />,
    );

    expect(screen.getByLabelText("Anwalt vorhanden")).toHaveAttribute(
      "name",
      "hasLawyer",
    );
  });

  it("supports controlled usage via checked/onChange", () => {
    const handleChange = vi.fn();
    render(
      <InputCheckbox
        label="Anwalt vorhanden"
        id="has-lawyer"
        checked={false}
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByLabelText("Anwalt vorhanden");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("merges an additional className onto the wrapper", () => {
    const { container } = render(
      <InputCheckbox
        label="Anwalt vorhanden"
        id="has-lawyer"
        className="my-kern-space-default"
      />,
    );

    expect(container.querySelector(".kern-form-check")).toHaveClass(
      "my-kern-space-default",
    );
  });
});
