// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { KitchensinkWrapper } from "../KitchensinkWrapper";

describe("KitchensinkWrapper", () => {
  it("renders the label text", () => {
    render(
      <KitchensinkWrapper label="Test Label">
        <div>Child content</div>
      </KitchensinkWrapper>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <KitchensinkWrapper label="Test Label">
        <div>Child content</div>
      </KitchensinkWrapper>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies pointer-events-none to children wrapper", () => {
    const { container } = render(
      <KitchensinkWrapper label="Test Label">
        <div>Child content</div>
      </KitchensinkWrapper>,
    );

    const childWrapper = container.querySelector("section > div:nth-child(2)");
    expect(childWrapper).toHaveClass("pointer-events-none");
  });

  it("renders multiple children", () => {
    render(
      <KitchensinkWrapper label="Test Label">
        <div>First child</div>
        <div>Second child</div>
      </KitchensinkWrapper>,
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });

  it("renders with empty children", () => {
    render(<KitchensinkWrapper label="Test Label">{null}</KitchensinkWrapper>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });
});
