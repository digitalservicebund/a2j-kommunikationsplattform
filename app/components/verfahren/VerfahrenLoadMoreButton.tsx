import Button from "~/components/Button";
import { useTranslations } from "~/services/translations/context";

export function VerfahrenLoadMoreButton({
  loadMore,
}: Readonly<{
  loadMore: () => void;
}>) {
  const { buttons } = useTranslations();
  return (
    <div className="flex justify-center">
      <Button
        appearance="tertiary"
        type="button"
        onClick={loadMore}
        label={buttons.LOAD_MORE_VERFAHREN}
      >
        <span
          className="kern-icon kern-icon--arrow-down kern-icon--default"
          aria-hidden="true"
        ></span>
      </Button>
    </div>
  );
}
