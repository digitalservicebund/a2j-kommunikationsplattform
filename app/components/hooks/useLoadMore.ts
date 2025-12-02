import { useCallback, useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router";
import { Verfahren, VerfahrenLoaderData } from "~/routes/verfahren/_index";

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
  const fetcher = useFetcher<VerfahrenLoaderData>();
  const [allItems, setAllItems] = useState<Verfahren[]>(initialData.items);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(
    initialData.hasMoreItems,
  );

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

  const handleLoadMore = useCallback(() => {
    const formData = getFormData(allItems.length, searchParams);
    console.log("formdata", formData.values());
    fetcher.submit(formData, { method: "get" });
  }, [allItems.length, fetcher, searchParams]);

  return {
    allItems,
    hasMoreItems,
    isLoading: fetcher.state === "loading",
    handleLoadMore,
  };
};
