// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { vi } from "vitest";
import { Breadcrumb } from "../Breadcrumb";

// Mock react-router hooks
const mockUseLocation = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    useParams: () => mockUseParams(),
  };
});

describe("Breadcrumb component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when no matching breadcrumb pattern is found", () => {
    mockUseLocation.mockReturnValue({ pathname: "/unknown-route" });
    mockUseParams.mockReturnValue({});

    const { container } = renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders breadcrumb for root path", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
    mockUseParams.mockReturnValue({});

    renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("renders breadcrumb chain for /verfahren", () => {
    mockUseLocation.mockReturnValue({ pathname: "/verfahren" });
    mockUseParams.mockReturnValue({});

    renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();

    // Should have Start -> Verfahren
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Start");

    expect(screen.getByText("Übersichtsseite Verfahren")).toBeInTheDocument();
  });

  it("renders breadcrumb chain for /verfahren/neu", () => {
    mockUseLocation.mockReturnValue({ pathname: "/verfahren/neu" });
    mockUseParams.mockReturnValue({});

    renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();

    // Should have Start -> Verfahren -> Klageschrift erstellen
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Start");
    expect(links[1]).toHaveAttribute("href", "/verfahren");
    expect(links[1]).toHaveTextContent("Verfahren");

    expect(screen.getByText("Klageschrift erstellen")).toBeInTheDocument();
  });

  it("renders breadcrumb for dynamic route /verfahren/:id", () => {
    mockUseLocation.mockReturnValue({ pathname: "/verfahren/123" });
    mockUseParams.mockReturnValue({ id: "123" });

    renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();

    // Should have Start -> Verfahren -> Details
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Start");
    expect(links[1]).toHaveAttribute("href", "/verfahren");
    expect(links[1]).toHaveTextContent("Verfahren");

    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("renders breadcrumb for nested dynamic route /verfahren/:id/bearbeiten", () => {
    mockUseLocation.mockReturnValue({ pathname: "/verfahren/123/bearbeiten" });
    mockUseParams.mockReturnValue({ id: "123" });

    renderWithTestTranslations(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();

    // Should have Start -> Verfahren -> Details -> Verfahren bearbeiten
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Start");
    expect(links[1]).toHaveAttribute("href", "/verfahren");
    expect(links[1]).toHaveTextContent("Verfahren");
    expect(links[2]).toHaveAttribute("href", "/verfahren/123");
    expect(links[2]).toHaveTextContent("Details");

    expect(screen.getByText("Verfahren bearbeiten")).toBeInTheDocument();
  });
});
