// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { it } from "vitest";
import ContentPage from "../ContentPage";

describe("ContentPage", () => {
  it("should render it's passed children and an <h1/> tag, title should be forward to PageMetadata", () => {
    const { getByRole } = render(
      <ContentPage title="I'm a title">
        <div>Some child content on this page</div>
      </ContentPage>,
    );

    // check if child content is in the document
    expect(
      screen.getByText("Some child content on this page"),
    ).toBeInTheDocument();
    // check if h1 is being rendered
    expect(getByRole("heading", { level: 1 })).toBeInTheDocument();
    // check if title is present
    expect(document.title).toBe(
      "I'm a title | Kommunikationsplattform | Justiz-Services",
    );
  });
});
