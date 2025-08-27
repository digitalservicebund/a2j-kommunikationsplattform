// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { it } from "vitest";
import Logo from "~/components/Logo";

describe("Logo", () => {
  it("should render the logo header", () => {
    const { container } = render(<Logo />);
    expect(
      container.querySelector(".kern-icon--network_node"),
    ).toBeInTheDocument();

    expect(container.querySelector("h1")).toHaveTextContent(
      "Kommunikationsplattform",
    );
  });
});
