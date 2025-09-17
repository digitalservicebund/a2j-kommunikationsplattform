// @vitest-environment jsdom
import { beforeEach, it, Mock, vi } from "vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useMatches: vi.fn(),
  };
});

import { render, within } from "@testing-library/react";
import { useMatches } from "react-router";
import { Breadcrumbs, CustomUIMatch } from "~/components/Breadcrumbs";

const mockedUseMatches = useMatches as unknown as Mock;

const match = (partial: Partial<CustomUIMatch>): CustomUIMatch => {
  return {
    id: partial.id,
    pathname: partial.pathname || "",
    params: partial.params || {},
    data: partial.data || {},
    handle: partial.handle,
  } as CustomUIMatch;
};

describe("Breadcrumbs", () => {
  beforeEach(() => {
    mockedUseMatches.mockReset();
  });
  it("should render nothing when there are no matches with a breadcrumb handle", () => {
    mockedUseMatches.mockReturnValue([
      match({ id: "root", pathname: "/uebersicht" }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    expect(within(nav).queryAllByRole("listitem")).toHaveLength(0);
  });
  it("should render breadcrumbs when there are matches with a breadcrumb handle (in order)", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/uebersicht",
        handle: { breadcrumb: { title: "Übersicht" } },
      }),
      match({
        id: "verfahren",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahren" } },
      }),
      match({
        id: "verfahren/$id",
        pathname: "/verfahren/123",
        handle: { breadcrumb: { title: "Verfahrendetails" } },
      }),
      match({
        id: "verfahren/$id/datei/$dateiId",
        pathname: "/verfahren/123/datei/456",
        handle: { breadcrumb: { title: "Dateiansicht" } },
      }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent("Übersicht");
    expect(items[1]).toHaveTextContent("Verfahren");
    expect(items[2]).toHaveTextContent("Verfahrendetails");
    expect(items[3]).toHaveTextContent("Dateiansicht");
    expect(items[3].querySelector("a")).not.toBeInTheDocument();
  });
  it("should have a right arrow icon unless it's a last breadcrumb", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/uebersicht",
        handle: { breadcrumb: { title: "Übersicht" } },
      }),
      match({
        id: "verfahren",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahren" } },
      }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(
      items[0].querySelector(".kern-icon--keyboard-double-arrow-right"),
    ).toBeInTheDocument();
    expect(
      items[1].querySelector(".kern-icon--keyboard-double-arrow-right"),
    ).not.toBeInTheDocument();
  });
  it("should disable the last breadcrumb item", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/uebersicht",
        handle: { breadcrumb: { title: "Übersicht" } },
      }),
      match({
        id: "verfahren",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahren" } },
      }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector("a")).toBeInTheDocument();
    expect(items[1].querySelector("a")).not.toBeInTheDocument();
  });
  it("should filter out matches with no breadcrumbs", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/uebersicht",
        handle: { breadcrumb: { title: "Übersicht" } },
      }),
      match({ id: "some/other/match", pathname: "/some/other/match" }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("Übersicht");
    expect(items[0].querySelector("a")).not.toBeInTheDocument();
  });
});
