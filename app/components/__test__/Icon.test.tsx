// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Icon from "../Icon";

describe("Icon", () => {
  it("renders a decorative KERN icon in the default size", () => {
    const { container } = render(<Icon name="check" />);
    const icon = container.firstElementChild;
    expect(icon).toHaveClass("kern-icon", "kern-icon--check");
    expect(icon).toHaveClass("kern-icon--default");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("applies only the requested size class", () => {
    const { container } = render(<Icon name="warning" size="small" />);
    const icon = container.firstElementChild;
    expect(icon).toHaveClass("kern-icon--small");
    // kern-icon--default would override kern-icon--small in KERN's CSS
    expect(icon).not.toHaveClass("kern-icon--default");
  });

  it("merges a custom className", () => {
    const { container } = render(
      <Icon name="delete" className="bg-feedback-danger" />,
    );
    expect(container.firstElementChild).toHaveClass(
      "kern-icon--delete",
      "bg-feedback-danger",
    );
  });
});
