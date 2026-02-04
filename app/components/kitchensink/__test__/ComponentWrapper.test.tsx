// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { ComponentWrapper } from "../ComponentWrapper";

describe("ComponentWrapper", () => {
  it("renders the label text", () => {
    render(
      <ComponentWrapper label="Test Label">
        <div>Child content</div>
      </ComponentWrapper>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <ComponentWrapper label="Test Label">
        <div>Child content</div>
      </ComponentWrapper>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies pointer-events-none to children wrapper", () => {
    const { container } = render(
      <ComponentWrapper label="Test Label">
        <div>Child content</div>
      </ComponentWrapper>,
    );

    const childWrapper = container.querySelector("section > div:nth-child(2)");
    expect(childWrapper).toHaveClass("pointer-events-none");
  });

  it("renders multiple children", () => {
    render(
      <ComponentWrapper label="Test Label">
        <div>First child</div>
        <div>Second child</div>
      </ComponentWrapper>,
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });

  it("renders with empty children", () => {
    render(<ComponentWrapper label="Test Label">{null}</ComponentWrapper>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });
});
