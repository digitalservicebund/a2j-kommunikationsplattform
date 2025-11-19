import { useCallback, useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router";
import { Paginated } from "~/util/pagination";

export interface VerfahrenFilters {
  search?: string;
  gericht?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const parseFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): VerfahrenFilters => ({
  // Adding these here for now - we can refactor them later when we work on Search, Filtering and Sorting features
  search: searchParams.get("search") || undefined,
  gericht: searchParams.get("gericht") || undefined,
  sortBy: searchParams.get("sortBy") || undefined,
  sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
});

const getFormData = (
  offset: number,
  searchParams: URLSearchParams,
): FormData => {
  const formData = new FormData();
  formData.set("offset", String(offset));

  // Preserve all current search params
  for (const [key, value] of searchParams) {
    if (key !== "offset") {
      formData.set(key, value);
    }
  }

  return formData;
};

export const useVerfahrenState = <T>(initialData: Paginated<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher<Paginated<T>>();
  const [allItems, setAllItems] = useState<T[]>(initialData.items);
  const [hasMore, setHasMore] = useState<boolean>(initialData.hasMore);

  const filters = parseFiltersFromSearchParams(searchParams);

  // Reset items when filters change (initial data changes)

  useEffect(() => {
    setAllItems(initialData.items);
    setHasMore(initialData.hasMore);
  }, [initialData]);

  // Append fetched items
  useEffect(() => {
    if (!fetcher.data) return;
    setAllItems((prev) => [...prev, ...fetcher.data!.items]);
    setHasMore(fetcher.data.hasMore);
  }, [fetcher.data]);

  const updateFilters = useCallback(
    (updates: Partial<VerfahrenFilters>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("offset"); // Reset pagination

        for (const [key, value] of Object.entries(updates)) {
          if (value) {
            newParams.set(key, String(value));
          } else {
            newParams.delete(key);
          }
        }

        return newParams;
      });
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleLoadMore = useCallback(() => {
    const formData = getFormData(allItems.length, searchParams);
    fetcher.submit(formData, { method: "get" });
  }, [allItems.length, fetcher, searchParams]);

  return {
    filters,
    updateFilters,
    clearFilters,
    allItems,
    hasMore,
    isLoading: fetcher.state === "loading",
    handleLoadMore,
  };
};
