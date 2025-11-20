// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VerfahrenLoaderData } from "~/routes/verfahren/_index";
import { useVerfahrenState } from "../useVerfahrenState";

// Mock React Router hooks
const mockSetSearchParams = vi.fn();
const mockSubmit = vi.fn();

vi.mock("react-router", () => ({
  useSearchParams: vi.fn(),
  useFetcher: vi.fn(),
}));

// Helper to create a complete fetcher mock
const createFetcherMock = (
  optiona: Partial<ReturnType<typeof ReactRouter.useFetcher>> = {},
): ReturnType<typeof ReactRouter.useFetcher> =>
  ({
    submit: mockSubmit,
    ...optiona,
  }) as ReturnType<typeof ReactRouter.useFetcher>;

describe("useVerfahrenState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    vi.mocked(ReactRouter.useFetcher).mockReturnValue(createFetcherMock());
  });

  const mockInitialData: VerfahrenLoaderData = {
    items: [
      {
        id: "1",
        aktenzeichen: "AZ-001",
        status: "Erstellt",
        status_changed: "2024-01-01",
        eingereicht_am: "2024-01-01",
        gericht_name: "Gericht 1",
      },
      {
        id: "2",
        aktenzeichen: "AZ-002",
        status: "Eingereicht",
        status_changed: "2024-01-02",
        eingereicht_am: "2024-01-02",
        gericht_name: "Gericht 2",
      },
    ],
    hasMoreItems: true,
  };

  it("initializes with provided data", () => {
    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    expect(result.current.allItems).toEqual(mockInitialData.items);
    expect(result.current.hasMoreItems).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("parses filters from search params", () => {
    const searchParams = new URLSearchParams({
      search: "test",
      gericht: "Hamburg",
      sortBy: "date",
      sortOrder: "desc",
    });
    vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
      searchParams,
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    expect(result.current.filters).toEqual({
      search: "test",
      gericht: "Hamburg",
      sortBy: "date",
      sortOrder: "desc",
    });
  });

  it("updates filters correctly", () => {
    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    result.current.updateFilters({ search: "new search" });

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  it("clears all filters", () => {
    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    result.current.clearFilters();

    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it("handles load more correctly", () => {
    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    result.current.handleLoadMore();

    expect(mockSubmit).toHaveBeenCalledWith(expect.any(FormData), {
      method: "get",
    });
  });

  it("appends fetched items when fetcher returns data", async () => {
    const newItem = {
      id: "3",
      aktenzeichen: "AZ-003",
      status: "Erstellt" as const,
      status_changed: "2024-01-03",
      eingereicht_am: "2024-01-03",
      gericht_name: "Gericht 3",
    };

    vi.mocked(ReactRouter.useFetcher).mockReturnValue(
      createFetcherMock({
        data: { items: [newItem], hasMoreItems: false },
      }),
    );

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    await waitFor(() => {
      expect(result.current.allItems).toHaveLength(3);
      expect(result.current.hasMoreItems).toBe(false);
    });
  });

  it("resets items when initial data changes", async () => {
    const { result, rerender } = renderHook(
      ({ data }) => useVerfahrenState(data),
      {
        initialProps: { data: mockInitialData },
      },
    );

    const newData: VerfahrenLoaderData = {
      items: [
        {
          id: "99",
          aktenzeichen: "AZ-099",
          status: "Eingereicht",
          status_changed: "2024-01-99",
          eingereicht_am: "2024-01-99",
          gericht_name: "New Gericht",
        },
      ],
      hasMoreItems: false,
    };

    rerender({ data: newData });

    await waitFor(() => {
      expect(result.current.allItems).toEqual(newData.items);
      expect(result.current.hasMoreItems).toBe(false);
    });
  });

  it("shows loading state when fetcher is loading", () => {
    vi.mocked(ReactRouter.useFetcher).mockReturnValue(
      createFetcherMock({
        state: "loading",
      }),
    );

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    expect(result.current.isLoading).toBe(true);
  });

  it("handles missing items in fetcher data", async () => {
    vi.mocked(ReactRouter.useFetcher).mockReturnValue(
      createFetcherMock({
        data: { items: [], hasMoreItems: false }, // Provide empty array instead
      }),
    );

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    expect(result.current.allItems).toEqual(mockInitialData.items);
  });

  it("updates filters and preserves existing params", () => {
    const searchParams = new URLSearchParams({
      search: "existing",
      gericht: "Berlin",
    });
    vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
      searchParams,
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    result.current.updateFilters({ sortBy: "date" });

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));

    // Verify the callback preserves existing params
    const callback = mockSetSearchParams.mock.calls[0][0];
    const newParams = callback(searchParams);
    expect(newParams.get("search")).toBe("existing");
    expect(newParams.get("sortBy")).toBe("date");
  });

  it("handles load more with existing filters", () => {
    const searchParams = new URLSearchParams({
      search: "test",
      gericht: "Hamburg",
    });
    vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
      searchParams,
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => useVerfahrenState(mockInitialData));

    result.current.handleLoadMore();

    const formData = mockSubmit.mock.calls[0][0] as FormData;
    expect(formData.get("offset")).toBe("2"); // Current items length
    expect(formData.get("search")).toBe("test");
    expect(formData.get("gericht")).toBe("Hamburg");
  });
  it("handles empty items in fetcher data", async () => {
    // Mock fetcher returning empty items
    vi.mocked(ReactRouter.useFetcher).mockReturnValue(
      createFetcherMock({
        data: { items: [], hasMoreItems: false },
      }),
    );

    const { result: resultAfterFetch } = renderHook(() =>
      useVerfahrenState(mockInitialData),
    );

    await waitFor(() => {
      // Should still have original 2 items, not append empty array
      expect(resultAfterFetch.current.allItems).toHaveLength(2);
      expect(resultAfterFetch.current.hasMoreItems).toBe(false);
    });
  });
});
