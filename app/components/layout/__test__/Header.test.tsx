// @vitest-environment jsdom

import { MemoryRouter } from "react-router";
import { beforeEach, it, vi, expect, describe } from "vitest";
import Header from "~/components/layout/Header";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";

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
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={false} userName={undefined} />,
        </MemoryRouter>,
      ));
    });

    it("should render <header>", () => {
      expectHeaderToBePresent(container);
    });

    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });

    it("should not render current user's name", () => {
      expect(container).not.toHaveTextContent(t.layout.userProfile.loggedInAs);
    });
  });

  describe("when user IS logged in", () => {
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={true} userName="Maria Musterfrau" />,
        </MemoryRouter>,
      ));
    });

    it("should render <header>", () => {
      expectHeaderToBePresent(container);
    });

    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });

    it("should render the current user's name", () => {
      expect(container).toHaveTextContent(t.layout.userProfile.loggedInAs);
      expect(container).toHaveTextContent("Maria Musterfrau");
    });
  });
});
