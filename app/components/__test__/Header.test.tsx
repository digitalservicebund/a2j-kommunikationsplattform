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

describe("Header", () => {
  let container: HTMLElement;

  describe("when user is not logged in", () => {
    beforeEach(() => {
      ({ container } = render(<Header userIsLoggedIn={false} />));
    });
    it("should render <header>", () => {
      expect(container.querySelector("header")).toBeInTheDocument();
    });
    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });
    it("should not render Logo, Navigation and UserProfile", () => {
      expect(container.querySelector(".logo")).not.toBeInTheDocument();
      expect(
        container.querySelector(".navigation-list"),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(".logo.kern-justify-content-end"),
      ).not.toBeInTheDocument();
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      ({ container } = render(<Header userIsLoggedIn={true} />));
    });
    it("should render <header>", () => {
      expect(container.querySelector("header")).toBeInTheDocument();
    });
    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });
    it("should render Logo, Navigation and UserProfile", () => {
      expect(container.querySelector(".logo")).toBeInTheDocument();
      expect(container.querySelector(".navigation-list")).toBeInTheDocument();
      expect(
        container.querySelector(".logo.kern-justify-content-end"),
      ).toBeInTheDocument();
    });
  });
});
