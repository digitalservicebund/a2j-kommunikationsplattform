export function paginateWithPeek<T>(
  items: T[],
  limit: number,
): { items: T[]; hasMore: boolean } {
  const hasMore = items.length > limit;
  const paginatedItems = hasMore ? items.slice(0, limit) : items;
  return { items: paginatedItems, hasMore };
}
