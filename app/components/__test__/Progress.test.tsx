// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Progress from "../Progress";

describe("Progress", () => {
  it("renders a label associated with the progress element via id/for", () => {
    render(
      <Progress id="progress-2" label="Schritt 2 von 3" value={2} max={3} />,
    );

    const label = screen.getByText("Schritt 2 von 3");
    const progress = screen.getByRole("progressbar");
    expect(label).toHaveAttribute("for", "progress-2");
    expect(progress).toHaveAttribute("id", "progress-2");
  });

  it("sets value and max on the progress element", () => {
    render(
      <Progress id="progress-1" label="Schritt 1 von 3" value={1} max={3} />,
    );

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "1");
    expect(progress).toHaveAttribute("max", "3");
  });
});
