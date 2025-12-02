// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VerfahrenLoaderData } from "~/routes/verfahren/_index";
import { useLoadMore } from "../useLoadMore";

const mockSetSearchParams = vi.fn();
const mockSubmit = vi.fn();

vi.mock("react-router", () => ({
  useSearchParams: vi.fn(),
  useFetcher: vi.fn(),
}));

// Helper to create a complete fetcher mock
const createFetcherMock = (
  options: Partial<ReturnType<typeof ReactRouter.useFetcher>> = {},
): ReturnType<typeof ReactRouter.useFetcher> =>
  ({
    submit: mockSubmit,
    ...options,
  }) as ReturnType<typeof ReactRouter.useFetcher>;

describe("useLoadMore", () => {
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

  describe("initialization", () => {
    it("initializes with provided data", () => {
      const { result } = renderHook(() => useLoadMore(mockInitialData));

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

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      expect(result.current.filters).toEqual({
        search: "test",
        gericht: "Hamburg",
        sortBy: "date",
        sortOrder: "desc",
      });
    });
  });

  describe("filter management", () => {
    it("updates filters and resets pagination", () => {
      const searchParams = new URLSearchParams({
        search: "Berlin",
        gericht: "Berlin",
      });
      vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
        searchParams,
        mockSetSearchParams,
      ]);

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      result.current.updateFilters({ sortBy: "gericht" });

      const callback = mockSetSearchParams.mock.calls[0][0];
      const newParams = callback(searchParams);

      expect(newParams.get("search")).toBe("Berlin");
      expect(newParams.get("sortBy")).toBe("gericht");
      expect(newParams.has("offset")).toBe(false);
    });

    it("removes filter when value is empty", () => {
      const searchParams = new URLSearchParams({
        search: "test",
        gericht: "AG-Berlin",
      });
      vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
        searchParams,
        mockSetSearchParams,
      ]);

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      result.current.updateFilters({ search: "" });

      const callback = mockSetSearchParams.mock.calls[0][0];
      const newParams = callback(searchParams);

      expect(newParams.has("search")).toBe(false);
      expect(newParams.get("gericht")).toBe("AG-Berlin");
    });

    it("clears all filters", () => {
      const { result } = renderHook(() => useLoadMore(mockInitialData));

      result.current.clearFilters();

      expect(mockSetSearchParams).toHaveBeenCalledWith({});
    });
  });

  describe("pagination", () => {
    it("loads more items with current offset and filters", () => {
      const searchParams = new URLSearchParams({
        search: "test",
        gericht: "Hamburg",
        offset: "20", // Should be ignored
      });
      vi.mocked(ReactRouter.useSearchParams).mockReturnValue([
        searchParams,
        mockSetSearchParams,
      ]);

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      result.current.handleLoadMore();

      const formData = mockSubmit.mock.calls[0][0] as FormData;
      expect(formData.get("offset")).toBe("2"); // Based on allItems.length
      expect(formData.get("search")).toBe("test");
      expect(formData.get("gericht")).toBe("Hamburg");
    });

    it("appends newly fetched items", async () => {
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

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      await waitFor(() => {
        expect(result.current.allItems).toHaveLength(3);
        expect(result.current.hasMoreItems).toBe(false);
      });
    });

    it("handles empty fetcher response", async () => {
      vi.mocked(ReactRouter.useFetcher).mockReturnValue(
        createFetcherMock({
          data: { items: [], hasMoreItems: false },
        }),
      );

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      await waitFor(() => {
        expect(result.current.allItems).toHaveLength(2);
        expect(result.current.hasMoreItems).toBe(false);
      });
    });
  });

  describe("data updates", () => {
    it("resets items when initial data changes", async () => {
      const { result, rerender } = renderHook(({ data }) => useLoadMore(data), {
        initialProps: { data: mockInitialData },
      });

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

      const { result } = renderHook(() => useLoadMore(mockInitialData));

      expect(result.current.isLoading).toBe(true);
    });
  });
});
