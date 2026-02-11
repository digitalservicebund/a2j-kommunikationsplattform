import { useScrolledPastThreshold } from "~/components/hooks/useScrollPosition";
import { useTranslations } from "~/services/translations/context";

export default function ScrollToTopButton() {
  const isScrolled = useScrolledPastThreshold();
  const { buttons } = useTranslations();

  if (!isScrolled) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bottom-kern-space-large sticky z-40 flex justify-end">
      <button
        type="button"
        onClick={scrollToTop}
        className="kern-btn kern-btn--secondary bg-kern-layout-background-default"
        aria-label={buttons.SCROLL_TO_TOP_BUTTON}
        title={buttons.SCROLL_TO_TOP_BUTTON}
      >
        <span
          className="kern-icon kern-icon--arrow-up kern-icon--default"
          aria-hidden="true"
        />
        <span className="kern-label">{buttons.SCROLL_TO_TOP_BUTTON}</span>
      </button>
    </div>
  );
}
