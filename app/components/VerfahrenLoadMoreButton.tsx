export function VerfahrenLoadMoreButton({
  hasMore,
  loadMore,
}: {
  hasMore: boolean;
  loadMore: () => void;
}) {
  if (!hasMore) {
    return (
      <p className="kern-body kern-body--muted mt-kern-space-large">
        Keine weiteren Verfahren
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={loadMore}
      disabled={!hasMore}
      className="kern-button mt-kern-space-large"
    ></button>
  );
}
