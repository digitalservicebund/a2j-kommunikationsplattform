// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { it } from "vitest";
import Column from "~/components/Column";

describe("Column", () => {
  it("should render its children", () => {
    const { getByText } = render(
      <Column>
        <div>Child Content</div>
      </Column>,
    );
    expect(getByText("Child Content")).toBeInTheDocument();
  });
  it('has the class "flex-1-0-0"', () => {
    const { container } = render(
      <Column>
        <div>Child Content</div>
      </Column>,
    );
    expect(container.firstChild).toHaveClass("flex-1-0-0");
  });
});
