// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { act } from "react";
import { it, vi } from "vitest";

const oneMinute = 1000 * 60 * 1;

// mock custom hook
vi.mock("../hooks/useLogoutInactiveUser", () => ({
  useLogoutInactiveUser: vi.fn(),
}));

import { LogoutInactiveUserWrapper } from "../LogoutInactiveUserWrapper";

describe("LogoutInactiveUserWrapper", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render its children without listening for user inactivity", () => {
    const { queryByText } = render(
      <LogoutInactiveUserWrapper handleInactivity={false}>
        <div>Some child content</div>
      </LogoutInactiveUserWrapper>,
    );

    act(() => {
      // fast-forward time by 61 mintes (default timeout time is defined as 60 minutes)
      vi.advanceTimersByTime(oneMinute * 61);
    });

    expect(queryByText("Some child content")).toBeInTheDocument();
    expect(setTimeout).not.toHaveBeenCalled();
  });
});
