/**
 * Like `new URLSearchParams(params)`, but additionally filters out keys
 * with undefined or empty values and auto-stringifies other non-string
 * values.
 */
export type SearchParamsOptions = Record<
  string,
  string | number | null | undefined
>;

export function buildSearchParams(
  options: SearchParamsOptions,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  return params;
}
