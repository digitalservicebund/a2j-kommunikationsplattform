import { RefObject } from "react";
import Button from "~/components/Button";
import { useScrolledPastThreshold } from "~/components/hooks/useScrolledPastThreshold";
import { useTranslations } from "~/services/translations/context";

export default function ScrollToTopButton({
  refElement,
}: Readonly<{
  refElement: RefObject<HTMLHeadingElement | null>;
}>) {
  const isScrolled = useScrolledPastThreshold(refElement);
  const { buttons } = useTranslations();

  if (!isScrolled) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bottom-kern-space-large sticky z-40 flex justify-end">
      <Button
        appearance="secondary"
        type="button"
        onClick={scrollToTop}
        className="bg-kern-layout-background-default"
        aria-label={buttons.SCROLL_TO_TOP_BUTTON}
        title={buttons.SCROLL_TO_TOP_BUTTON}
        label={buttons.SCROLL_TO_TOP_BUTTON}
      >
        <span
          className="kern-icon kern-icon--arrow-up kern-icon--default"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
