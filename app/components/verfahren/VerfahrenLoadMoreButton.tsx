import { useTranslations } from "~/services/translations/context";

export function VerfahrenLoadMoreButton({
  loadMore,
}: Readonly<{
  loadMore: () => void;
}>) {
  const { buttons } = useTranslations();
  return (
    <div className="flex justify-center">
      <button type="button" className="kern-btn kern-btn--tertiary">
        <span
          className="kern-icon kern-icon--arrow-down kern-icon--default"
          aria-hidden="true"
        ></span>
        <span className="kern-label" onClick={loadMore}>
          {buttons.LOAD_MORE_VERFAHREN}
        </span>
      </button>
    </div>
  );
}
