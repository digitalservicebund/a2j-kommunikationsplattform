import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export function useParamsState() {
  const [searchParams, setSearchParams] = useSearchParams();
  type Key = string;

  const setParam = useCallback(
    (key: Key, value: string | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if (value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }

        return next;
      });
    },
    [setSearchParams],
  );
  const params = useMemo(() => {
    const entries: Record<Key, string | undefined> = {} as Record<
      Key,
      string | undefined
    >;

    searchParams.forEach((value, key) => {
      entries[key as Key] = value;
    });

    return entries;
  }, [searchParams]);

  return {
    params,
    setParam,
  } as const;
}
