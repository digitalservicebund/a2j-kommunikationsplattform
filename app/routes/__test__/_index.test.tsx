// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { MockInstance, vi } from "vitest";
import IndexPage, { loader } from "../_index";

const mockLoaderDataNonProduction = { environment: "testing" };
const mockLoaderDataProduction = { environment: "production" };

// setup and render routes for all necessary test cases with createMemoryRouter
const renderIndexPageWithRouter = (loader = mockLoaderDataNonProduction) => {
  const routes = [
    {
      path: "/",
      element: <IndexPage />,
      loader: () => loader,
    },
    {
      path: "/prototype/verfahren",
      element: <div />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    hydrationData: { loaderData: { "0": loader } },
  });

  render(<RouterProvider router={router} />);
};

describe("Index route", () => {
  let setCookieSpy: MockInstance<(arg: string) => void>;

  beforeEach(() => {
    // mock the document.cookie setter
    // we use a spy to observe calls to document.cookie's setter
    setCookieSpy = vi.spyOn(document, "cookie", "set");
  });

  afterEach(() => {
    // restore the original document.cookie setter after each test
    setCookieSpy.mockRestore();
  });

  it("should return an environment on page load", async () => {
    // set env to testing
    process.env = { ENVIRONMENT: "testing" };

    const result = await loader();
    expect(result).toEqual({ environment: "testing" });
  });

  it('renders "Testzugang" button for non production environments', () => {
    renderIndexPageWithRouter();

    // headline
    expect(screen.getByText("Kommunikationsplattform")).toBeInTheDocument();

    const demoButtonElement = screen.queryByText("Testzugang");
    expect(demoButtonElement).toBeInTheDocument();
  });

  it('renders without "Testzugang" button when environment is production', () => {
    renderIndexPageWithRouter(mockLoaderDataProduction);

    // data privacy link within footer
    expect(screen.getByText("Datenschutz")).toBeInTheDocument();

    const demoButtonElement = screen.queryByText("Testzugang");
    expect(demoButtonElement).not.toBeInTheDocument();
  });

  it('activates demoMode for 1 hour on user interaction with "Testzugang" button', async () => {
    renderIndexPageWithRouter();

    const demoButtonElement = screen.getByTestId("demoBtn");
    await userEvent.click(demoButtonElement);

    // assert that the document.cookie setter was called with the expected value
    expect(setCookieSpy).toHaveBeenCalledTimes(1);
    expect(setCookieSpy).toHaveBeenCalledWith(
      "demoMode=true; path=/; max-age=3600",
    );
  });
});
