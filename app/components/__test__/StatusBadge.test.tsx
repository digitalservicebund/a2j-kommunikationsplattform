// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  it.each([
    ["pending", "kern-icon--info"],
    ["done", "kern-icon--success"],
    ["attention", "kern-icon--warning"],
    ["failed", "kern-icon--danger"],
  ] as const)("renders the label with the %s state's icon", (state, icon) => {
    const { container } = render(
      <StatusBadge label="Eingegangen" state={state} />,
    );

    expect(screen.getByText("Eingegangen")).toBeInTheDocument();
    expect(container.querySelector(`.${icon}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });

  it.each(["draft", "closed"] as const)(
    "renders the neutral %s state without an icon",
    (state) => {
      const { container } = render(
        <StatusBadge label="Erstellt" state={state} />,
      );

      expect(screen.getByText("Erstellt")).toBeInTheDocument();
      expect(container.querySelector(".kern-icon")).not.toBeInTheDocument();
    },
  );

  it("applies custom class names", () => {
    render(
      <StatusBadge
        label="Wird geprüft"
        state="pending"
        small
        className="extra-class"
      />,
    );

    expect(screen.getByText("Wird geprüft").parentElement).toHaveClass(
      "extra-class",
    );
  });

  it("never uses class names containing kern-col", () => {
    // KERN's grid adds 1rem padding to any element whose class attribute
    // contains "kern-col" (e.g. via "--kern-color-…").
    const { container } = render(
      <StatusBadge label="Wird geprüft" state="done" />,
    );

    expect(container.querySelector("[class*=kern-col]")).toBeNull();
  });

  it("replaces the icon with a decorative loader while loading", () => {
    const { container } = render(
      <StatusBadge label="Wird geprüft" state="pending" loading />,
    );

    const loader = container.querySelector(".kern-loader");
    expect(loader).toHaveClass("kern-loader--visible");
    expect(loader).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".kern-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Wird geprüft")).toBeInTheDocument();
  });
});
