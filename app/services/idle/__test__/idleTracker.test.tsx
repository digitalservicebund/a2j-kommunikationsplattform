// @vitest-environment jsdom

import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IdleTrackerProvider } from "../idleTracker";

const defaultMinutes = 1000 * 60 * 60;
const tenMinutes = 1000 * 60 * 10;

describe("IdleTrackerProvider", () => {
  let handler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handler = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses default minutes for idle timeout (60 minutes)", () => {
    render(
      <IdleTrackerProvider handler={handler}>
        <div>Test</div>
      </IdleTrackerProvider>,
    );

    act(() => {
      // fast-forward time by 60 mintes (default value)
      vi.advanceTimersByTime(defaultMinutes);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("uses 'minutes' property for custom idle timeout (10 minutes)", () => {
    render(
      <IdleTrackerProvider handler={handler} minutes={10}>
        <div>Test</div>
      </IdleTrackerProvider>,
    );

    act(() => {
      // fast-forward time by 10 minutes
      vi.advanceTimersByTime(tenMinutes);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("resets timer on activity", () => {
    render(
      <IdleTrackerProvider handler={handler} minutes={10}>
        <div>Test</div>
      </IdleTrackerProvider>,
    );

    act(() => {
      // fast-forward time by 5 minutes
      vi.advanceTimersByTime(1000 * 60 * 5);
      // simulate activity after 5 minutes
      window.dispatchEvent(new Event("mousemove"));
      // fast-forward time by 6 minutes
      vi.advanceTimersByTime(1000 * 60 * 6);
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
