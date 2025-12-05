import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export function useParamsState<T extends Record<string, string | undefined>>(
  initialParams: T,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  type Key = keyof T & string;

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
  const params: T = useMemo(() => {
    const mergedParams = { ...initialParams };

    (Object.keys(initialParams) as Key[]).forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        mergedParams[key] = value as T[Key];
      }
    });

    return mergedParams;
  }, [initialParams, searchParams]);

  return {
    params,
    setParam,
  } as const;
}
