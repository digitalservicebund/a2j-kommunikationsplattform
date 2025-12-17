// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { useSearchParams } from "react-router";
import type { URLSearchParamsInit } from "react-router-dom";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { useParamsState } from "~/components/hooks/useParamsState";

vi.mock("react-router", () => {
  return {
    useSearchParams: vi.fn(),
  };
});

const mockedUseSearchParams = useSearchParams as unknown as Mock;

const getParamObject = (params: URLSearchParams) => {
  return Object.fromEntries(params.entries());
};
const setupSearchParamsMock = (initial: string | URLSearchParamsInit = "") => {
  let current = new URLSearchParams(initial as string);
  const setSearchParamsMock = vi.fn(
    (
      updater: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
    ) => {
      if (typeof updater === "function") {
        current = updater(current);
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
      useParamsState<{
        sort: "";
        gericht: "";
        search_text: "";
      }>(),
    );

    expect(getParamObject(result.current.searchParams)).toEqual({});
  });

  it("setParam adds a new param to searchParams", () => {
    const { getCurrent, setSearchParamsMock } = setupSearchParamsMock("");

    const { result } = renderHook(() => {
      return useParamsState<{
        gericht: "";
      }>();
    });

    act(() => {
      result.current.updateParam("gericht", "abcd-uuid");
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

    const { result } = renderHook(() => {
      return useParamsState<{
        gericht: "";
      }>();
    });

    act(() => {
      result.current.updateParam("gericht", "new");
    });

    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).not.toBe("old");
    expect(updated.get("gericht")).toBe("new");
  });

  it("setParam deletes a param when value is null", () => {
    const { getCurrent, setSearchParamsMock } =
      setupSearchParamsMock("gericht=to-delete");

    const { result } = renderHook(() => {
      return useParamsState<{
        gericht: "";
      }>();
    });

    act(() => {
      result.current.updateParam("gericht", null);
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

    const { result } = renderHook(() => {
      return useParamsState<{
        gericht: "";
      }>();
    });

    act(() => {
      result.current.updateParam("gericht", "");
    });

    const updater = setSearchParamsMock.mock.calls[0][0] as (
      prev: URLSearchParams,
    ) => URLSearchParams;
    const updated = updater(getCurrent());

    expect(updated.get("gericht")).toBeNull();
  });
  it("getParamValue retrieves the correct value", () => {
    setupSearchParamsMock("gericht=some-uuid&sort=-eingereicht_am");

    const { result } = renderHook(() => {
      return useParamsState<{
        sort: "";
        gericht: "";
      }>();
    });

    const gerichtValue = result.current.getParamValue("gericht");
    const sortValue = result.current.getParamValue("sort");

    expect(gerichtValue).toBe("some-uuid");
    expect(sortValue).toBe("-eingereicht_am");
  });
});
