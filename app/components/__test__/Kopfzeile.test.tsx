// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Kopfzeile from "~/components/Kopfzeile";

describe("Kopfzeile", () => {
  it("should render the Kopfzeile with default layout", () => {
    const { container } = render(<Kopfzeile isDefaultLayout={true} />);
    expect(container.querySelector(".kopfzeile-wrapper")).toBeInTheDocument();
    expect(
      container.querySelector(".kern-kopfzeile__content"),
    ).toBeInTheDocument();
  });
  it("should render the Kopfzeile with narrow layout", () => {
    const { container } = render(<Kopfzeile isDefaultLayout={false} />);
    expect(container.querySelector(".kopfzeile-wrapper")).toBeInTheDocument();
    expect(
      container.querySelector(".kern-kopfzeile__content"),
    ).toBeInTheDocument();
    expect(container.querySelector(".kern-row")).toBeInTheDocument();
    expect(container.querySelector(".kern-col-sm-10")).toBeInTheDocument();
  });
});
