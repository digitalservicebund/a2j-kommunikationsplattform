// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import type { URLSearchParamsInit } from "react-router-dom"; // optional, ignore if not in your deps
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
vi.mock("react-router", () => {
  return {
    useSearchParams: vi.fn(),
  };
});

import { useSearchParams } from "react-router";
import { useParamsState } from "~/components/hooks/useParamsState";

const mockedUseSearchParams = useSearchParams as unknown as Mock;
const setupSearchParamsMock = (initial: string | URLSearchParamsInit = "") => {
  let current = new URLSearchParams(initial as string);
  const setSearchParamsMock = vi.fn(
    (
      updater: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
    ) => {
      if (typeof updater === "function") {
        const next = updater(current);
        current = next;
      } else {
        current = new URLSearchParams(updater);
      }
    },
  );

  mockedUseSearchParams.mockReturnValue([current, setSearchParamsMock]);

  return { getCurrent: () => current, setSearchParamsMock };
};

describe("useParamsState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initialParams when search params are empty", () => {
    setupSearchParamsMock(""); // no query params

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
        someParam: "test-param",
      }),
    );

    expect(result.current.params).toEqual({
      gericht: "",
      someParam: "test-param",
    });
  });

  it("overrides initialParams with values from searchParams", () => {
    setupSearchParamsMock("gericht=123&foo=baz");

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
        someParam: "test-param",
      }),
    );

    expect(result.current.params).toEqual({
      gericht: "123",
      someParam: "test-param",
    });
  });

  it("setParam adds a new param to searchParams", () => {
    const { getCurrent, setSearchParamsMock } = setupSearchParamsMock("");

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
      }),
    );

    act(() => {
      result.current.setParam("gericht", "abcd-uuid");
    });

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);

    // simulate what React Router does internally: call updater with prev
    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).toBe("abcd-uuid");
  });

  it("setParam updates an existing param", () => {
    const { getCurrent, setSearchParamsMock } =
      setupSearchParamsMock("gericht=old");

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
      }),
    );

    act(() => {
      result.current.setParam("gericht", "new");
    });

    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).toBe("new");
  });

  it("setParam deletes a param when value is undefined", () => {
    const { getCurrent, setSearchParamsMock } =
      setupSearchParamsMock("gericht=to-delete");

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
      }),
    );

    act(() => {
      result.current.setParam("gericht", undefined);
    });

    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).toBeNull();
  });

  it("setParam deletes a param when value is empty string", () => {
    const { getCurrent, setSearchParamsMock } =
      setupSearchParamsMock("gericht=to-delete");

    const { result } = renderHook(() =>
      useParamsState({
        gericht: "",
      }),
    );

    act(() => {
      result.current.setParam("gericht", "");
    });

    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).toBeNull();
  });
});
