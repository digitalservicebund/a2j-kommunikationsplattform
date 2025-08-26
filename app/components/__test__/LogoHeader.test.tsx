// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { it } from "vitest";
import LogoHeader from "~/components/LogoHeader";

describe("LogoHeader", () => {
  it("should render the logo header", () => {
    const { container } = render(<LogoHeader />);
    expect(
      container.querySelector(".kern-icon--network_node"),
    ).toBeInTheDocument();

    expect(container.querySelector("h1")).toHaveTextContent(
      "Kommunikationsplattform",
    );
  });
});
