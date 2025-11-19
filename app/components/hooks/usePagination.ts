import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Paginated } from "~/util/pagination";

// Hook to manage pagination state - we could reuse it in the future with Dokumenten ect
export const usePagination = <T>(initialData: Paginated<T>) => {
  const fetcher = useFetcher<Paginated<T>>();
  const [allItems, setAllItems] = useState<T[]>(initialData.items);
  const [hasMore, setHasMore] = useState<boolean>(initialData.hasMore);

  useEffect(() => {
    if (!fetcher.data) return;

    setAllItems((prev) => [...prev, ...fetcher.data!.items]);
    setHasMore(fetcher.data.hasMore);
  }, [fetcher.data]);

  const handleLoadMore = useCallback(() => {
    const formData = new FormData();
    formData.set("offset", String(allItems.length));
    fetcher.submit(formData, { method: "get" });
  }, [allItems.length, fetcher]);

  return {
    allItems,
    hasMore,
    isLoading: fetcher.state === "loading",
    handleLoadMore,
  };
};
