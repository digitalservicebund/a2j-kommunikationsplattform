// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { useRevalidator } from "react-router";
import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRevalidateWhilePending } from "~/components/hooks/useRevalidateWhilePending";

vi.mock("react-router", () => ({
  useRevalidator: vi.fn(),
}));

const mockUseRevalidator = useRevalidator as unknown as Mock;

describe("useRevalidateWhilePending", () => {
  const revalidate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockUseRevalidator.mockReturnValue({ state: "idle", revalidate });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("revalidates every 5s by default", () => {
    renderHook(() => useRevalidateWhilePending(true));

    act(() => {
      vi.advanceTimersByTime(4_999);
    });
    expect(revalidate).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(revalidate).toHaveBeenCalledTimes(1);
  });

  it("revalidates at the given interval", () => {
    renderHook(() => useRevalidateWhilePending(true, 1_000));

    act(() => {
      vi.advanceTimersByTime(3_000);
    });

    expect(revalidate).toHaveBeenCalledTimes(3);
  });

  it("doesn't revalidate while not pending", () => {
    renderHook(() => useRevalidateWhilePending(false, 1_000));

    act(() => {
      vi.advanceTimersByTime(3_000);
    });

    expect(revalidate).not.toHaveBeenCalled();
  });
});
