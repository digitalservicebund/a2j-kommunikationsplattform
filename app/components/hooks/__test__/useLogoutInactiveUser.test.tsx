// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import reactRouterConfig from "~/react-router.config";
import { LogoutType } from "~/routes/action.logout-user";
import { useLogoutInactiveUser } from "../useLogoutInactiveUser";

const oneMinute = 1000 * 60 * 1;

// mock useFetcher().submit() functionality
const mockSubmit = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof reactRouterConfig>();
  return {
    ...actual,
    useFetcher: () => ({
      submit: mockSubmit,
    }),
  };
});

// wrapper for hook testing
const wrapper = ({ children }: { children: ReactNode }) => {
  const router = createMemoryRouter([{ path: "/", element: children }]);
  return <RouterProvider router={router} />;
};

describe("useLogoutInactiveUser", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(global, "setTimeout");
    mockSubmit.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should only run if handleInactivity parameter is passed to hook", () => {
    renderHook(() => useLogoutInactiveUser(), { wrapper });
    act(() => {
      // fast-forward time by 61 mintes (default timeout time is defined as 60 minutes)
      vi.advanceTimersByTime(oneMinute * 61);
    });

    expect(setTimeout).not.toHaveBeenCalled();
  });

  it("removes event listeners on unmount", () => {
    const spy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useLogoutInactiveUser(true), {
      wrapper,
    });
    unmount();

    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });

  it("should reset lastActivity on user activity", () => {
    // Date.now() needs to be mocked for the start and the end of the countdown
    // otherwise Date.now() has the same value when running Vitest.
    // Vitest uses https://github.com/sinonjs/fake-timers for timer mocking.
    const startTime = 0;
    vi.spyOn(Date, "now").mockImplementation(() => startTime);
    // Render the hook with handleInactivity=true and a short timeout
    renderHook(() => useLogoutInactiveUser(true, 1000), {
      wrapper,
    });
    // Simulate time passing: advance timers and mock Date.now() to a later time
    const endTime = startTime + 500;
    vi.spyOn(Date, "now").mockImplementation(() => endTime);

    act(() => {
      window.dispatchEvent(new Event("mousemove"));
      // fast forward until the countdown is over
      vi.advanceTimersByTime(1000);
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("should initiate logout action when the countdown has ended", () => {
    // Date.now() needs to be mocked, see test above for further infos
    const startTime = 0;
    vi.spyOn(Date, "now").mockImplementation(() => startTime);
    renderHook(() => useLogoutInactiveUser(true, 1000), { wrapper });
    const endTime = 1001; // timeout 1000 ms + 1 ms
    const after = startTime + endTime;
    vi.spyOn(Date, "now").mockImplementation(() => after);

    act(() => {
      // fast forward until the countdown is over
      vi.advanceTimersByTime(endTime);
    });

    expect(setTimeout).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith(
      {
        logoutType: LogoutType.Automatic,
      },
      {
        method: "post",
        action: "/action/logout-user",
      },
    );
  });
});
