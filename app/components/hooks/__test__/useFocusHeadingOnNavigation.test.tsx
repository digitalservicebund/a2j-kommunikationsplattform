// @vitest-environment jsdom

import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { useFocusHeadingOnNavigation } from "../useFocusHeadingOnNavigation";

function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  useFocusHeadingOnNavigation(mainRef);
  return (
    <main ref={mainRef}>
      <Outlet />
    </main>
  );
}

function renderRouter() {
  const router = createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          { path: "/a", element: <h1>Page A</h1> },
          { path: "/b", element: <h1>Page B</h1> },
          { path: "/no-heading", element: <p>No heading</p> },
          {
            path: "/focusable-heading",
            // A non-default tabindex is needed to verify it is not overwritten.
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            element: <h1 tabIndex={0}>Focusable heading</h1>,
          },
        ],
      },
    ],
    { initialEntries: ["/a"] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe("useFocusHeadingOnNavigation", () => {
  it("does not move focus on the initial render", () => {
    renderRouter();

    expect(screen.getByRole("heading", { name: "Page A" })).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it("focuses the <h1> of the new page after navigating", async () => {
    const router = renderRouter();

    await act(() => router.navigate("/b"));

    const heading = screen.getByRole("heading", { name: "Page B" });
    expect(heading).toHaveFocus();
    expect(heading).toHaveAttribute("tabindex", "-1");
  });

  it("does not move focus when only search params change", async () => {
    const router = renderRouter();

    await act(() => router.navigate("/a?filter=x"));

    expect(screen.getByRole("heading", { name: "Page A" })).not.toHaveFocus();
  });

  it("focuses the container if the new page has no <h1>", async () => {
    const router = renderRouter();

    await act(() => router.navigate("/no-heading"));

    const main = screen.getByRole("main");
    expect(main).toHaveFocus();
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("keeps an existing tabindex on the <h1>", async () => {
    const router = renderRouter();

    await act(() => router.navigate("/focusable-heading"));

    const heading = screen.getByRole("heading", { name: "Focusable heading" });
    expect(heading).toHaveFocus();
    expect(heading).toHaveAttribute("tabindex", "0");
  });
});
