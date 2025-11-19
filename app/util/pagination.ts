export type Paginated<T> = { items: T[]; hasMore: boolean };
export function paginateWithPeek<T>(items: T[], limit: number): Paginated<T> {
  const hasMore = items.length > limit;
  const paginatedItems = hasMore ? items.slice(0, limit) : items;
  return { items: paginatedItems, hasMore };
}
