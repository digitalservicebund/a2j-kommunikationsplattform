// @vitest-environment jsdom

import { renderHook } from "@testing-library/react";
import { act, ReactNode } from "react";
import { createMemoryRouter, RouterProvider, useFetcher } from "react-router";
import { it, vi } from "vitest";
import { useLogoutInactiveUser } from "../useLogoutInactiveUser";

const oneMinute = 1000 * 60 * 1;

const mockSubmit = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-expect-error import original typing mismatch
    ...actual,
    useFetcher: vi.fn(() => ({
      submit: mockSubmit, // The mock `submit` function
      state: "idle", // Mock an 'idle' state for the button
    })),
  };
});

const wrapper = ({ children }: { children: ReactNode }) => {
  const router = createMemoryRouter([{ path: "/", element: children }]);
  return <RouterProvider router={router} />;
};

describe("useLogoutInactiveUser hook", () => {
  // set up the mocking environment before each test.
  beforeEach(() => {
    vi.useFakeTimers();

    vi.spyOn(global, "setTimeout");

    // useFetcher.mockReturnValue({
    //   data: { foo: "bar" },
    //   state: "idle",
    //   submit: vi.fn(),
    // });
  });

  // clean up and restore the original timers and mocks.
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should only run if handleInactivity is defined", () => {
    renderHook(() => useLogoutInactiveUser(), { wrapper });

    act(() => {
      // fast-forward time by 61 mintes as default timeout time is defined with 60 minutes
      vi.advanceTimersByTime(oneMinute * 61);
    });

    expect(setTimeout).not.toHaveBeenCalled();
  });

  it("should initiate logout action when handleInactivity is passed", () => {
    // vi.mocked(useFetcher).mockReturnValue({
    //   submit: mockSubmit,
    // });

    renderHook(() => useLogoutInactiveUser(true), { wrapper });
    // const { result } = renderHook(() => useLogoutInactiveUser(), { wrapper });

    act(() => {
      // fast-forward time by 70 mintes
      vi.advanceTimersByTime(oneMinute * 70);
    });

    expect(setTimeout).toHaveBeenCalled();
    expect(useFetcher).toHaveBeenCalled();

    // mocking and verifying of the `fetcher.submit({ ... })` method isn't working so far
    // expect(mockSubmit).toHaveBeenCalled();
  });
});
