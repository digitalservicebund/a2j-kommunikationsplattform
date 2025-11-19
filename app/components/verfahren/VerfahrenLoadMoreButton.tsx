export function VerfahrenLoadMoreButton({
  loadMore,
}: Readonly<{
  loadMore: () => void;
}>) {
  return (
    <div className="flex justify-center">
      <button type="button" className="kern-btn kern-btn--tertiary">
        <span
          className="kern-icon kern-icon--arrow-down kern-icon--default"
          aria-hidden="true"
        ></span>
        <span className="kern-label" onClick={loadMore}>
          Weitere Verfahren laden
        </span>
      </button>
    </div>
  );
}
