// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { beforeEach, it } from "vitest";
import PageNavigation from "~/components/PageNavigation";

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    Form: ({ children, ...props }: React.ComponentProps<"form">) => (
      <form {...props}>{children}</form>
    ),
  };
});

describe("HeaderNavigation", () => {
  let container: HTMLElement;

  beforeEach(() => {
    ({ container } = render(<PageNavigation />));
  });

  it("should all rows and columns", () => {
    expect(container.querySelectorAll(".row-container").length).toBe(2);
    expect(container.querySelectorAll(".flex-1-0-0").length).toBe(3);
  });

  it("should render LogoHeader, HeaderNavigation and UserProfileCell", () => {
    expect(container.querySelector(".logo")).toBeInTheDocument();
    expect(
      container.querySelector(".kern-task-list__list"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".logo.kern-justify-content-end"),
    ).toBeInTheDocument();
  });
});
