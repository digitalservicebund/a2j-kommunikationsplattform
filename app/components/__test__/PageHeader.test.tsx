// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe } from "vitest";
import PageHeader from "~/components/PageHeader";

describe("PageHeader", () => {
  it("should render the PageHeader all its contents", () => {
    const { container } = render(<PageHeader isDefaultLayout={true} />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
