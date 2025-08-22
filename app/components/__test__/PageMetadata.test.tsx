// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { it } from "vitest";
import { PageMetadata } from "../PageMetadata";

describe("PageMetadata", () => {
  it("should add a title and description to a rendered page", () => {
    render(
      <PageMetadata
        title="I'm a test title"
        description="This is a description to be tested"
      />,
    );

    console.log(screen.debug());

    // check if title is present
    expect(document.title).toBe(
      "I'm a test title | Kommunikationsplattform | Justiz-Services",
    );

    // check if description is present
    const meta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    expect(meta).not.toBeNull();
    expect(meta?.content).toBe("This is a description to be tested");
  });

  it("should add a default title if no title prop is defined", () => {
    render(<PageMetadata />);

    // check if default title is present
    expect(document.title).toBe("Kommunikationsplattform | Justiz-Services");
  });
});
