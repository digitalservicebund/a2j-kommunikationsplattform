import { useCallback, useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router";
import type {
  LoaderData,
  Verfahren,
  VerfahrenLoaderData,
} from "~/routes/verfahren/_index";

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

export const useLoadMore = (initialData: VerfahrenLoaderData) => {
  const [searchParams] = useSearchParams();
  const fetcher = useFetcher<LoaderData>();

  const [allItems, setAllItems] = useState<Verfahren[]>(initialData.items);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(
    initialData.hasMoreItems,
  );

  // Reset when initialData changes (e.g. filter change)
  useEffect(() => {
    setAllItems(initialData.items);
    setHasMoreItems(initialData.hasMoreItems);
  }, [initialData.items, initialData.hasMoreItems]);

  // Append fetched items
  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data?.verfahren) return;

    let cancelled = false;

    const appendItems = async () => {
      const page = await fetcher.data!.verfahren;
      if (cancelled) return;

      setAllItems((prev) => [...prev, ...page.items]);
      setHasMoreItems(page.hasMoreItems);
    };

    void appendItems();

    return () => {
      cancelled = true;
    };
  }, [fetcher.state, fetcher.data]);

  const handleLoadMore = useCallback(() => {
    if (!hasMoreItems || fetcher.state !== "idle") return;

    const formData = getFormData(allItems.length, searchParams);
    fetcher.submit(formData, { method: "get" });
  }, [allItems.length, fetcher, hasMoreItems, searchParams, fetcher.state]);

  return {
    allItems,
    hasMoreItems,
    isLoading: fetcher.state !== "idle",
    handleLoadMore,
  };
};
