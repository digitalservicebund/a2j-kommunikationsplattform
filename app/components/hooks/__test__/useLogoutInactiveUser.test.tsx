// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { act, ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";
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

    mockSubmit.mockClear();
  });

  // clean up and restore the original timers and mocks.
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("sets up and cleans up event listeners", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useLogoutInactiveUser(true), {
      wrapper,
    });
    expect(addSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
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
    const start = 1_000_000_000_000;
    vi.spyOn(Date, "now").mockImplementation(() => start);

    renderHook(() => useLogoutInactiveUser(true), { wrapper });

    // Simulate time passing: advance timers and mock Date.now() to a later time
    const after = start + 6000; // 6 seconds later
    vi.spyOn(Date, "now").mockImplementation(() => after);

    act(() => {
      vi.advanceTimersByTime(6000); // advance past timeout
    });

    expect(setTimeout).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith(null, {
      method: "post",
      action: "/action/logout-user",
    });
  });

  it("should reset lastActivity on user activity events", () => {
    const start = 1_000_000_000_000;
    vi.spyOn(Date, "now").mockImplementation(() => start);
    renderHook(() => useLogoutInactiveUser(true), {
      wrapper,
    });
    const after = start + 1000;
    vi.spyOn(Date, "now").mockImplementation(() => after);

    act(() => {
      window.dispatchEvent(new Event("mousemove"));
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
