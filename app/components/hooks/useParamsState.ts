import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { URLSearchParamsInit } from "react-router-dom";

export function useParamsState<T extends URLSearchParamsInit>(
  initialParams: T,
) {
  const [searchParams, setSearchParams] = useSearchParams(initialParams);

  const params = useMemo(
    (): Record<keyof T, string> =>
      Object.fromEntries(Array.from(searchParams.entries())) as Record<
        keyof T,
        string
      >,
    [searchParams],
  );

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return {
    params,
    setParam,
  } as const;
}
