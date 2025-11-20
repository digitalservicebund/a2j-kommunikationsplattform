import { useTranslations } from "~/services/translations/context";

export function VerfahrenLoadMoreButton({
  loadMore,
}: Readonly<{
  loadMore: () => void;
}>) {
  const { buttons } = useTranslations();
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="kern-btn kern-btn--tertiary"
        onClick={loadMore}
      >
        <span
          className="kern-icon kern-icon--arrow-down kern-icon--default"
          aria-hidden="true"
        ></span>
        <span className="kern-label">{buttons.LOAD_MORE_VERFAHREN}</span>
      </button>
    </div>
  );
}
