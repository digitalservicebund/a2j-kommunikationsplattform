/**
 * Picks the SAFE-ID to preselect: the user's own if they may act for it,
 * otherwise the first one they are authorized for.
 */
export default function preselectSafeId(
  safeId: string | null,
  authorizedForSafeIds: string[],
): string {
  return safeId && authorizedForSafeIds.includes(safeId)
    ? safeId
    : (authorizedForSafeIds[0] ?? "");
}
