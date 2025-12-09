export function buildSearchParams<T extends Record<string, unknown>>(
  options: T,
): URLSearchParams {
  const params = new URLSearchParams();

  (Object.entries(options) as [keyof T, T[keyof T]][]).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        typeof value !== "object"
      ) {
        params.set(String(key), String(value));
      }
    },
  );

  return params;
}
