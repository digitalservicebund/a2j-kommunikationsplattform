// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import PageHeader from "~/components/PageHeader";

describe("PageHeader", () => {
  it("should render a <header /> with all its contents", () => {
    const { container } = render(<PageHeader />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
