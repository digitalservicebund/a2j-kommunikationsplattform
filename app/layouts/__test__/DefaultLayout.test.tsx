// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { it } from "vitest";
import DefaultLayout from "../DefaultLayout";

describe("DefaultLayout", () => {
  it("should render the expected layout with <main/> and <footer/> DOM elements", () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter>
        <DefaultLayout />
      </MemoryRouter>,
    );

    // check if correct class is present
    expect(getByTestId("default-layout")).toHaveClass("kern-container");
    // check if main is rendered
    expect(getByRole("main")).toBeInTheDocument();
    // check if footer is rendered
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });
});
