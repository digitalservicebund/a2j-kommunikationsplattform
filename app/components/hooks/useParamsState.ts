import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { URLSearchParamsInit } from "react-router-dom";

export function useParamsState<T extends URLSearchParamsInit>(
  initialParams: T,
) {
  const [searchParams, setSearchParams] = useSearchParams(initialParams);

  const getParamValue = useCallback(
    (key: keyof T) => {
      return searchParams.get(String(key));
    },
    [searchParams],
  );

  const updateParam = useCallback(
    (key: keyof T, value: string | null) => {
      setSearchParams((prev) => {
        const newParam = new URLSearchParams(prev);

        if (value === null || value === "") {
          newParam.delete(String(key));
        } else {
          newParam.set(String(key), value);
        }

        return newParam;
      });
    },
    [setSearchParams],
  );

  return {
    searchParams,
    getParamValue,
    updateParam,
  } as const;
}
