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
        icon="arrow-down"
      />
    </div>
  );
}
