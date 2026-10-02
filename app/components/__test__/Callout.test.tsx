// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import Callout from "../Callout";

describe("Callout component", () => {
  it("renders the title and content", () => {
    render(
      <Callout type="info" title="Heads up">
        Here is something noteworthy.
      </Callout>,
    );

    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(
      screen.getByText("Here is something noteworthy."),
    ).toBeInTheDocument();
  });

  it.each(["info", "warning"] as const)(
    "uses expected KERN UX colors for callout type '%s'",
    (type) => {
      const { container } = render(<Callout type={type} title="Title" />);
      const callout = container.firstElementChild!;

      const expectedForegroundColor = `--kern-color-feedback-${type}-contextual`;
      const expectedBackgroundColor = `--kern-color-feedback-${type}-background-contextual`;

      expect(callout.classList).toContain(`bg-(${expectedBackgroundColor})`);
      expect(callout.classList).toContain(
        `border-s-(${expectedForegroundColor})`,
      );

      const titleElement = screen.getByText("Title");
      expect([...titleElement.classList]).toContain(
        `text-(${expectedForegroundColor})`,
      );
    },
  );
});
