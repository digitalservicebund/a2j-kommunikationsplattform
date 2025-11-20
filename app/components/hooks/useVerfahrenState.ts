import { useCallback, useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router";
import { Verfahren, VerfahrenLoaderData } from "~/routes/verfahren/_index";

// We could adjust it when we implement the filters
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

export const useVerfahrenState = (initialData: VerfahrenLoaderData) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher<VerfahrenLoaderData>();
  const [allItems, setAllItems] = useState<Verfahren[]>(initialData.items);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(
    initialData.hasMoreItems,
  );

  const filters = parseFiltersFromSearchParams(searchParams);

  // Reset items when filters change (initial data changes)

  useEffect(() => {
    setAllItems(initialData.items);
    setHasMoreItems(initialData.hasMoreItems);
  }, [initialData]);

  // Append fetched items
  useEffect(() => {
    if (!fetcher.data) return;
    setAllItems((prev) => [...prev, ...fetcher.data!.items]);
    setHasMoreItems(fetcher.data.hasMoreItems);
  }, [fetcher.data]);

  const updateFilters = useCallback(
    (values: Partial<VerfahrenFilters>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("offset"); // Reset pagination

        for (const [key, value] of Object.entries(values)) {
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
    hasMoreItems,
    isLoading: fetcher.state === "loading",
    handleLoadMore,
  };
};
