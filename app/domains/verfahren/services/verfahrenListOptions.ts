export const VERFAHREN_PAGE_LIMIT = 100;
export const TOO_MANY_RESULTS_THRESHOLD = 50;

export const SORT_VALUES = [
  "eingereichtAm",
  "-eingereichtAm",
  "aktenzeichenGericht",
  "-aktenzeichenGericht",
] as const;

export type SortValue = (typeof SORT_VALUES)[number];

// Maps the domain (camelCase) sort value to the API's snake_case query value.
const SORT_QUERY_VALUES: Record<SortValue, string> = {
  eingereichtAm: "eingereicht_am",
  "-eingereichtAm": "-eingereicht_am",
  aktenzeichenGericht: "aktenzeichen_gericht",
  "-aktenzeichenGericht": "-aktenzeichen_gericht",
};

export function toSortQueryValue(sort: SortValue): string {
  return SORT_QUERY_VALUES[sort];
}
