// @vitest-environment jsdom

import { MemoryRouter } from "react-router";
import { beforeEach, it, vi } from "vitest";
import Header from "~/components/Header";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~/util/testUtils";

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

describe("Header", () => {
  let container: HTMLElement;
  const { labels } = getTestTranslations();
  const { buttons } = getTestTranslations();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when user is NOT logged in and is NOT on content page", () => {
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={false} isContentPage={false} />,
        </MemoryRouter>,
      ));
    });
    it("should not render <header>", () => {
      expect(container.querySelector("header")).not.toBeInTheDocument();
    });
    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });
    it("should not render header's Logo, UserProfile or Navigation ", () => {
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).not.toBeInTheDocument();
      expect(container.querySelector("nav")).not.toBeInTheDocument();
      expect(container).not.toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
    });
  });

  describe("when user is NOT logged in and IS on content page", () => {
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={false} isContentPage={true} />,
        </MemoryRouter>,
      ));
    });
    it("should render only Logo and Anmelden button and no Navigation or UserProfile", () => {
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).toBeInTheDocument();
      expect(container).toHaveTextContent(buttons.ANMELDEN_BUTTON);
      expect(container.querySelector("nav")).not.toBeInTheDocument();
      expect(container).not.toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
    });
    it('should render Anmelden button and, when clicked, navigate to "/login" ', () => {
      const button = container.querySelector("button") as HTMLButtonElement;
      expect(container.querySelector("button")).toHaveTextContent(
        buttons.ANMELDEN_BUTTON,
      );
      button.click();
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  describe("when user IS logged in and is NOT on content page", () => {
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={true} isContentPage={false} />,
        </MemoryRouter>,
      ));
    });
    it("should render <header>", () => {
      expect(container.querySelector("header")).toBeInTheDocument();
    });
    it("should render Kopfzeile", () => {
      expect(container.querySelector(".kern-kopfzeile")).toBeInTheDocument();
    });
    it("should not render header's Logo, UserProfile or Navigation ", () => {
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).toBeInTheDocument();
      expect(container.querySelector("nav")).toBeInTheDocument();
      expect(container).toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
    });
  });

  describe("when user IS logged in and IS on content page", () => {
    beforeEach(() => {
      ({ container } = renderWithTestTranslations(
        <MemoryRouter>
          <Header userIsLoggedIn={true} isContentPage={true} />,
        </MemoryRouter>,
      ));
    });
    it("should render Logo and back button, but not Navigation or UserProfile", () => {
      expect(
        container.querySelector(".kern-icon--arrow-back"),
      ).toBeInTheDocument();
      expect(container).toHaveTextContent(buttons.BACK_BUTTON);
      expect(
        container.querySelector(".kern-icon--network_node"),
      ).toBeInTheDocument();
      expect(container.querySelector("nav")).not.toBeInTheDocument();
      expect(container).not.toHaveTextContent(labels.LOGGED_IN_AS_LABEL);
    });
    it("should render Zurück button and, when clicked, navigate back one step in history", () => {
      const button = container.querySelector("button") as HTMLButtonElement;
      expect(container.querySelector("button")).toHaveTextContent(
        buttons.BACK_BUTTON,
      );
      button.click();
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
