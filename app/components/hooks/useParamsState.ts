import { useSearchParams } from "react-router";

export const useParamsState = <T extends Record<string, string | undefined>>(
  initialParams: T,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key: keyof T, value: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value === undefined) {
      newSearchParams.delete(key as string);
    } else {
      newSearchParams.set(key as string, value);
    }
    setSearchParams(newSearchParams);
  };

  const deleteParam = (key: keyof T) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key as string);
    setSearchParams(newSearchParams);
  };

  const getParam = (key: keyof T): string | undefined => {
    return searchParams.get(key as string) || undefined;
  };

  const clearAllParams = () => {
    setSearchParams(new URLSearchParams());
  };

  const params: T = { ...initialParams };
  for (const key in initialParams) {
    const paramValue = searchParams.get(key);
    if (paramValue !== null) {
      params[key] = paramValue as T[Extract<keyof T, string>];
    }
  }

  return {
    params,
    setParam,
    deleteParam,
    getParam,
    clearAllParams,
  } as const;
};
