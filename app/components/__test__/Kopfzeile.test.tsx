// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Kopfzeile from "~/components/Kopfzeile";

describe("Kopfzeile", () => {
  it("should render the Kopfzeile", () => {
    const { container } = render(<Kopfzeile />);
    expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    expect(
      container.querySelector(".kern-kopfzeile__content"),
    ).toBeInTheDocument();
  });
});
