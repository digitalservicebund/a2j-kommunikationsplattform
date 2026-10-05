// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { beforeEach, it, vi, expect, describe } from "vitest";
import Header from "~/components/layout/Header";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Form: ({ children, ...props }: React.ComponentProps<"form">) => (
      <form {...props}>{children}</form>
    ),
  };
});

function expectHeaderToBePresent(container: HTMLElement) {
  expect(container.querySelector("header")).toBeInTheDocument();
}

describe("Header", () => {
  let container: HTMLElement;
  const t = getTestTranslations();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when user is NOT logged in", () => {
    describe("and is NOT on content page", () => {
      beforeEach(() => {
        ({ container } = renderWithTestTranslations(
          <MemoryRouter>
            <Header userIsLoggedIn={false} isContentPage={false} />,
          </MemoryRouter>,
        ));
      });

      it("should render <header>", () => {
        expectHeaderToBePresent(container);
      });

      it("should render Kopfzeile", () => {
        expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
      });

      it("should not render header's Logo, UserProfile or Navigation ", () => {
        expect(container).not.toHaveTextContent(
          t.layout.userProfile.loggedInAs,
        );
      });
    });

    describe("and IS on content page", () => {
      beforeEach(() => {
        ({ container } = renderWithTestTranslations(
          <MemoryRouter>
            <Header userIsLoggedIn={false} isContentPage={true} />,
          </MemoryRouter>,
        ));
      });
      it("should render <header>", () => {
        expectHeaderToBePresent(container);
      });
      it("should render only Logo and Anmelden button, but no Navigation or UserProfile", () => {
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).toBeInTheDocument();
        expect(container).toHaveTextContent(t.layout.header.login);
        expect(container).not.toHaveTextContent(
          t.layout.userProfile.loggedInAs,
        );
      });
      it('should render Anmelden button and, when clicked, navigate to "/login" ', () => {
        const link = screen.getByRole("link", { name: t.layout.header.login });
        expect(link).toHaveAttribute("href", "/login");
      });
    });
  });

  describe("when user IS logged in", () => {
    describe("and is NOT on content page", () => {
      beforeEach(() => {
        ({ container } = renderWithTestTranslations(
          <MemoryRouter>
            <Header userIsLoggedIn={true} isContentPage={false} />,
          </MemoryRouter>,
        ));
      });
      it("should render <header>", () => {
        expectHeaderToBePresent(container);
      });
      it("should render Kopfzeile", () => {
        expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
      });
      it("should render header's Logo, UserProfile or Navigation ", () => {
        expect(container).toHaveTextContent(t.layout.userProfile.loggedInAs);
      });
    });

    describe("and IS on content page", () => {
      beforeEach(() => {
        ({ container } = renderWithTestTranslations(
          <MemoryRouter>
            <Header userIsLoggedIn={true} isContentPage={true} />,
          </MemoryRouter>,
        ));
      });

      it("should render <header>", () => {
        expectHeaderToBePresent(container);
      });

      it("should render Logo and UserProfile", () => {
        expect(
          container.querySelector(".kern-icon--network_node"),
        ).toBeInTheDocument();
        expect(container).toHaveTextContent(t.layout.userProfile.loggedInAs);
      });
    });
  });
});
