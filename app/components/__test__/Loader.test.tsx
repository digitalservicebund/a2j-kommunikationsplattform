// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders a KERN loader with 'status' role and accessibility label", () => {
    render(<Loader accessibilityLabel="Loading" />);

    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("kern-loader");
    expect(loader).toHaveTextContent("Loading");
  });
});
