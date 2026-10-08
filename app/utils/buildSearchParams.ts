/**
 * Like `new URLSearchParams(params)`, but additionally filters out keys
 * with undefined or empty values and auto-stringifies other non-string
 * values.
 */
export function buildSearchParams(
  options: Record<string, string | number | null | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  return params;
}
