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
      match({ id: "root", pathname: "/verfahren" }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    expect(within(nav).queryAllByRole("listitem")).toHaveLength(0);
  });
  it("should render breadcrumbs when there are matches with a breadcrumb handle (in order)", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahrensübersicht" } },
      }),
      match({
        id: "verfahren/$id",
        pathname: "/verfahren/123",
        handle: { breadcrumb: { title: "verfahrendetails" } },
      }),
      match({
        id: "verfahren/$id/datei/$dateiId",
        pathname: "/verfahren/123/datei/456",
        handle: { breadcrumb: { title: "dateiansicht" } },
      }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Verfahrensübersicht");
    expect(items[1]).toHaveTextContent("verfahrendetails");
    expect(items[2]).toHaveTextContent("dateiansicht");
    expect(items[2].querySelector("a")).not.toBeInTheDocument();
  });
  it("should use default icon when none is provided in the breadcrumb handle", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahrensübersicht" } },
      }),
      match({
        id: "verfahren/$id",
        pathname: "/verfahren/123",
        handle: {
          breadcrumb: { title: "verfahrendetails", icon: "custom-icon" },
        },
      }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(
      items[0].querySelector(".kern-icon--keyboard-double-arrow-right"),
    ).toBeInTheDocument();
    expect(items[1].querySelector(".custom-icon")).toBeInTheDocument();
  });
  it("should disable the last breadcrumb item", () => {
    mockedUseMatches.mockReturnValue([
      match({
        id: "root",
        pathname: "/verfahren",
        handle: { breadcrumb: { title: "Verfahrensübersicht" } },
      }),
      match({
        id: "verfahren/$id",
        pathname: "/verfahren/123",
        handle: { breadcrumb: { title: "verfahrendetails" } },
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
      match({ id: "root", pathname: "/verfahren" }),
      match({
        id: "verfahren/$id",
        pathname: "/verfahren/123",
        handle: { breadcrumb: { title: "verfahrendetails" } },
      }),
      match({ id: "some/other/match", pathname: "/some/other/match" }),
    ]);
    render(<Breadcrumbs />);
    const nav = document.querySelector("nav") as HTMLElement;
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("verfahrendetails");
    expect(items[0].querySelector("a")).not.toBeInTheDocument();
  });
});
