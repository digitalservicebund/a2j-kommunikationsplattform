// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import { useFetcher, useSearchParams } from "react-router";
import { useLoadMore } from "~/components/hooks/useLoadMore";
import { VerfahrenLoaderData } from "~/routes/verfahren/_index";

vi.mock("react-router", () => ({
  useFetcher: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockUseFetcher = useFetcher as unknown as Mock;
const mockUseSearchParams = useSearchParams as unknown as Mock;

const mockVerfahrenItem1 = {
  id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
  aktenzeichen_gericht: "JBA-82746242",
  status: "Erstellt" as const,
  status_changed: "2025-03-08T05:00:29.659Z",
  eingereicht_am: "2024-12-29T22:46:29.329Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [],
};

const mockVerfahrenItem2 = {
  id: "3ab3cbc7-d00a-48bf-95a1-4d6f07406197",
  aktenzeichen_gericht: "JBA-82746243",
  status: "Eingereicht" as const,
  status_changed: "2025-04-08T05:00:29.659Z",
  eingereicht_am: "2024-11-29T22:46:29.329Z",
  gericht: {
    id: "c727131c-0c32-91ba-3eaa-f44405967b6e",
    wert: "Amtsgericht Berlin",
    code: "AG_BER",
  },
  beteiligungen: [],
};

const mockVerfahrenItem3 = {
  id: "4ab3cbc7-d00a-48bf-95a1-4d6f07406198",
  aktenzeichen_gericht: "JBA-82746244",
  status: "Erstellt" as const,
  status_changed: "2025-05-08T05:00:29.659Z",
  eingereicht_am: "2024-10-29T22:46:29.329Z",
  gericht: {
    id: "d727131c-0c32-91ba-3eaa-f44405967b6f",
    wert: "Oberlandesgericht München",
    code: "OLG_MUC",
  },
  beteiligungen: [],
};

const createInitialData = (
  data: Partial<VerfahrenLoaderData> = {},
): VerfahrenLoaderData => {
  return {
    items: [mockVerfahrenItem1, mockVerfahrenItem2],
    hasMoreItems: true,
    ...data,
  };
};

beforeEach(() => {
  mockUseFetcher.mockReset();
  mockUseSearchParams.mockReset();

  mockUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);

  mockUseFetcher.mockReturnValue({
    state: "idle",
    data: undefined,
    submit: vi.fn(),
  });
});

describe("useLoadMore", () => {
  it("initialises with initialData", () => {
    const initialData = createInitialData();

    const { result } = renderHook(() => useLoadMore(initialData));

    expect(result.current.allItems).toEqual(initialData.items);
    expect(result.current.hasMoreItems).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("resets when initialData changes (e.g. filters change)", () => {
    const initialData = createInitialData();
    const nextData = createInitialData({
      items: [mockVerfahrenItem3],
      hasMoreItems: false,
    });

    const { result, rerender } = renderHook((props) => useLoadMore(props), {
      initialProps: initialData,
    });

    expect(result.current.allItems).toHaveLength(2);
    expect(result.current.hasMoreItems).toBe(true);

    rerender(nextData);

    expect(result.current.allItems).toEqual(nextData.items);
    expect(result.current.allItems).toHaveLength(1);
    expect(result.current.hasMoreItems).toBe(false);
  });

  it("appends fetched items when fetcher has data", async () => {
    const initialData = createInitialData();
    const page = {
      items: [mockVerfahrenItem3],
      hasMoreItems: false,
    };

    const submit = vi.fn();

    mockUseFetcher.mockReturnValueOnce({
      state: "idle",
      data: undefined,
      submit,
    });

    mockUseFetcher.mockReturnValueOnce({
      state: "idle",
      data: { verfahren: page },
      submit,
    });

    const { result, rerender } = renderHook((props) => useLoadMore(props), {
      initialProps: initialData,
    });

    expect(result.current.allItems).toHaveLength(2);

    rerender(initialData);

    await waitFor(() => {
      expect(result.current.allItems).toHaveLength(3);
      expect(result.current.allItems).toEqual([
        ...initialData.items,
        ...page.items,
      ]);
      expect(result.current.hasMoreItems).toBe(false);
    });
  });

  it("handleLoadMore submits correct FormData with offset and search params", () => {
    const initialData = createInitialData();
    const searchParams = new URLSearchParams(
      "q=Frank%20Berlin&gericht=testGerichtId&offset=20",
    );

    const submit = vi.fn();

    mockUseSearchParams.mockReturnValue([searchParams, vi.fn()]);
    mockUseFetcher.mockReturnValue({
      state: "idle",
      data: undefined,
      submit,
    });

    const { result } = renderHook(() => useLoadMore(initialData));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(submit).toHaveBeenCalledTimes(1);

    const [formData, options] = submit.mock.calls[0];

    expect(options).toEqual({ method: "get" });
    expect(formData).toBeInstanceOf(FormData);

    const fd = formData as FormData;

    expect(fd.get("offset")).toBe(String(initialData.items.length));
    expect(fd.get("q")).toBe("Frank Berlin");
    expect(fd.get("gericht")).toBe("testGerichtId");
  });

  it("does not submit when hasMoreItems is false", () => {
    const initialData = createInitialData({
      hasMoreItems: false,
    });

    const submit = vi.fn();

    mockUseFetcher.mockReturnValue({
      state: "idle",
      data: undefined,
      submit,
    });

    const { result } = renderHook(() => useLoadMore(initialData));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(submit).not.toHaveBeenCalled();
  });

  it("does not submit when fetcher is not idle", () => {
    const initialData = createInitialData();
    const submit = vi.fn();

    mockUseFetcher.mockReturnValue({
      state: "submitting",
      data: undefined,
      submit,
    });

    const { result } = renderHook(() => useLoadMore(initialData));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(submit).not.toHaveBeenCalled();
  });

  it("isLoading reflects fetcher.state", () => {
    const initialData = createInitialData();

    // First: idle
    mockUseFetcher
      .mockReturnValueOnce({
        state: "idle",
        data: undefined,
        submit: vi.fn(),
      })
      // Second: loading-ish state
      .mockReturnValueOnce({
        state: "loading",
        data: undefined,
        submit: vi.fn(),
      });

    const { result, rerender } = renderHook((props) => useLoadMore(props), {
      initialProps: initialData,
    });

    expect(result.current.isLoading).toBe(false);

    rerender(initialData);

    expect(result.current.isLoading).toBe(true);
  });
});
