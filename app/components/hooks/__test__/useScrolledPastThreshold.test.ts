// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { RefObject } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useScrolledPastThreshold } from "../useScrolledPastThreshold";

describe("useScrolledPastThreshold", () => {
  let mockObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
  };
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };

    global.IntersectionObserver = vi.fn((callback) => {
      observerCallback = callback;
      return mockObserver as unknown as IntersectionObserver;
    }) as unknown as typeof IntersectionObserver;
  });

  it("should return false initially", () => {
    const mockRef: RefObject<HTMLHeadingElement> = {
      current: document.createElement("h1"),
    };

    const { result } = renderHook(() => useScrolledPastThreshold(mockRef));

    expect(result.current).toBe(false);
  });

  it("should observe the element when ref is provided", () => {
    const element = document.createElement("h1");
    const mockRef: RefObject<HTMLHeadingElement> = {
      current: element,
    };

    renderHook(() => useScrolledPastThreshold(mockRef));

    expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0,
    });
    expect(mockObserver.observe).toHaveBeenCalledWith(element);
  });

  it("should not observe when element is null", () => {
    const mockRef: RefObject<HTMLHeadingElement | null> = {
      current: null,
    };

    renderHook(() => useScrolledPastThreshold(mockRef));

    expect(mockObserver.observe).not.toHaveBeenCalled();
  });

  it("should return true when element is not intersecting", async () => {
    const mockRef: RefObject<HTMLHeadingElement> = {
      current: document.createElement("h1"),
    };

    const { result } = renderHook(() => useScrolledPastThreshold(mockRef));

    // Simulate element not intersecting (scrolled past)
    observerCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      mockObserver as unknown as IntersectionObserver,
    );

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("should return false when element is intersecting", async () => {
    const mockRef: RefObject<HTMLHeadingElement> = {
      current: document.createElement("h1"),
    };

    const { result } = renderHook(() => useScrolledPastThreshold(mockRef));

    // First, set to not intersecting
    observerCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      mockObserver as unknown as IntersectionObserver,
    );

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Then, simulate scrolling back up (intersecting again)
    observerCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      mockObserver as unknown as IntersectionObserver,
    );

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("should disconnect observer on unmount", () => {
    const mockRef: RefObject<HTMLHeadingElement> = {
      current: document.createElement("h1"),
    };

    const { unmount } = renderHook(() => useScrolledPastThreshold(mockRef));

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it("should handle ref changes", () => {
    const element1 = document.createElement("h1");
    const element2 = document.createElement("h1");
    let mockRef: RefObject<HTMLHeadingElement> = {
      current: element1,
    };

    const { rerender } = renderHook(
      ({ ref }) => useScrolledPastThreshold(ref),
      { initialProps: { ref: mockRef } },
    );

    expect(mockObserver.observe).toHaveBeenCalledWith(element1);

    // Create a new ref object (changing ref.current alone won't trigger useEffect)
    mockRef = { current: element2 };
    rerender({ ref: mockRef });

    // Should disconnect and observe the new element
    expect(mockObserver.disconnect).toHaveBeenCalled();
    expect(mockObserver.observe).toHaveBeenCalledWith(element2);
  });
});
