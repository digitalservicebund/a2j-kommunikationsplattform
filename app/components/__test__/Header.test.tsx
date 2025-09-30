// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, it, vi } from "vitest";
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

  it("should render Kopfzeile", () => {
    ({ container } = render(
      <MemoryRouter>
        <Header userIsLoggedIn={false} isContentPage={true} />
      </MemoryRouter>,
    ));
    expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
  });

  it("should render <header>", () => {
    ({ container } = render(
      <MemoryRouter>
        <Header userIsLoggedIn={false} isContentPage={true} />
      </MemoryRouter>,
    ));
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  describe("when user is not logged in", () => {
    describe("and on a content page", () => {
      beforeEach(() => {
        ({ container } = render(
          <MemoryRouter>
            <Header userIsLoggedIn={false} isContentPage={true} />
          </MemoryRouter>,
        ));
      });
      it("should render only Logo ", () => {
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).toBeInTheDocument();
        expect(container).not.toHaveTextContent("Zurück");
      });
    });
    describe("and not on a content page", () => {
      beforeEach(() => {
        ({ container } = render(
          <MemoryRouter>
            <Header userIsLoggedIn={false} isContentPage={false} />
          </MemoryRouter>,
        ));
      });
      it("should not render UserProfile, Logo and Navigation", () => {
        expect(container).not.toHaveTextContent("Angemeldet als:");
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).not.toBeInTheDocument();
        expect(container.querySelector("nav")).not.toBeInTheDocument();
        expect(container.querySelector("ul")).not.toBeInTheDocument();
        expect(container.querySelector("li")).not.toBeInTheDocument();
      });
    });
  });

  describe("when user is logged in", () => {
    describe("and on a content page", () => {
      beforeEach(() => {
        ({ container } = render(
          <MemoryRouter>
            <Header userIsLoggedIn={true} isContentPage={true} />
          </MemoryRouter>,
        ));
      });
      it("should render Logo and Zurück button", () => {
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).toBeInTheDocument();
        expect(container).toHaveTextContent("Zurück");
      });
    });

    describe("and not on a content page", () => {
      beforeEach(() => {
        ({ container } = render(
          <MemoryRouter>
            <Header userIsLoggedIn={true} isContentPage={false} />
          </MemoryRouter>,
        ));
      });
      it("should render UserProfile, Logo and Navigation", () => {
        expect(container).toHaveTextContent("Angemeldet als:");
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).toBeInTheDocument();
        expect(container.querySelector("nav")).toBeInTheDocument();
        expect(container.querySelector("ul")).toBeInTheDocument();
        expect(container.querySelector("li")).toBeInTheDocument();
      });
    });
  });
});
