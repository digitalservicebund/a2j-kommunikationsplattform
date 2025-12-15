import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { URLSearchParamsInit } from "react-router-dom";

export function useParamsState<T extends URLSearchParamsInit>(
  initialParams: T,
) {
  const [searchParams, setSearchParams] = useSearchParams(initialParams);

  const getParamValue = useCallback(
    (key: keyof T) => {
      return searchParams.get(String(key)) ?? null;
    },
    [searchParams],
  );

  const updateParams = (
    updates: Record<string, string | null>,
    replace = false,
  ) => {
    setSearchParams(
      (searchParams) => {
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== null) {
            searchParams.set(key, value);
          } else {
            searchParams.delete(key);
          }
        });
        return searchParams;
      },
      { replace },
    );
  };

  return {
    searchParams,
    getParamValue,
    updateParams,
  } as const;
}
