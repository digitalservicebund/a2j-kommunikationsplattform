// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "../Badge";

describe("Badge", () => {
  it("renders the label with the tone's badge and icon classes", () => {
    const { container } = render(<Badge label="Eingegangen" tone="success" />);

    const badge = screen.getByText("Eingegangen").parentElement;
    expect(badge).toHaveClass("kern-badge", "kern-badge--success");
    expect(badge).not.toHaveClass("kern-badge--small");
    expect(container.querySelector(".kern-icon--success")).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });

  it("applies the small modifier and custom class names", () => {
    render(
      <Badge label="Wird geprüft" tone="info" small className="extra-class" />,
    );

    expect(screen.getByText("Wird geprüft").parentElement).toHaveClass(
      "kern-badge--small",
      "extra-class",
    );
  });

  it("replaces the icon with a decorative loader while loading", () => {
    const { container } = render(
      <Badge label="Wird geprüft" tone="info" loading />,
    );

    const loader = container.querySelector(".kern-loader");
    expect(loader).toHaveClass("kern-loader--visible");
    expect(loader).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".kern-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Wird geprüft")).toBeInTheDocument();
  });
});
