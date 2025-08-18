// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import NarrowLayout from "../narrow-layout";

describe("NarrowLayout", () => {
  it("should render the expected layout with <main/> and <footer/> DOM elements", () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter>
        <NarrowLayout />
      </MemoryRouter>,
    );

    // check if correct class is present
    expect(getByTestId("narrow-layout")).toHaveClass(
      "kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xxl-4",
    );
    // check if main is rendered
    expect(getByRole("main")).toBeInTheDocument();
    // check if footer is rendered
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });
});
