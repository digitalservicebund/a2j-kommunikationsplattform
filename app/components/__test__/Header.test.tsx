// @vitest-environment jsdom

import { beforeEach, it, vi } from "vitest";
import Header from "~/components/Header";
import {
  getTranslationsForTests,
  renderWithTranslations,
} from "~/util/test/testUtils";

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
  const { labels } = getTranslationsForTests();
  describe("when user is not logged in", () => {
    beforeEach(() => {
      ({ container } = renderWithTranslations(
        <Header userIsLoggedIn={false} />,
      ));
    });
    it("should render <header>", () => {
      expect(container.querySelector("header")).toBeInTheDocument();
    });
    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });
    it("should not render UserProfile, Logo and Navigation", () => {
      expect(container).not.toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).not.toBeInTheDocument();
      expect(container.querySelector("nav")).not.toBeInTheDocument();
      expect(container.querySelector("ul")).not.toBeInTheDocument();
      expect(container.querySelector("li")).not.toBeInTheDocument();
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      ({ container } = renderWithTranslations(
        <Header userIsLoggedIn={true} />,
      ));
    });

    it("should render <header>", () => {
      expect(container.querySelector("header")).toBeInTheDocument();
    });

    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });

    it("should render UserProfile, Logo and Navigation", () => {
      expect(container).toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).toBeInTheDocument();
      expect(container.querySelector("nav")).toBeInTheDocument();
      expect(container.querySelector("ul")).toBeInTheDocument();
      expect(container.querySelector("li")).toBeInTheDocument();
    });
  });
});
