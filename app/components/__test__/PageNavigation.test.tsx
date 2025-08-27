// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { beforeEach, it } from "vitest";
import Header from "~/components/Header";

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

describe("Navigation", () => {
  let container: HTMLElement;

  beforeEach(() => {
    ({ container } = render(<Header />));
  });

  it("should all rows and columns", () => {
    expect(container.querySelectorAll(".row-container").length).toBe(2);
    expect(container.querySelectorAll(".flex-1-0-0").length).toBe(3);
  });

  it("should render Logo, Navigation and UserProfile", () => {
    expect(container.querySelector(".logo")).toBeInTheDocument();
    expect(
      container.querySelector(".kern-task-list__list"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".logo.kern-justify-content-end"),
    ).toBeInTheDocument();
  });
});
