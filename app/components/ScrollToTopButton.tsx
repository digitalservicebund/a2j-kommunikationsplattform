import { useEffect, useState } from "react";
import { useTranslations } from "~/services/translations/context";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { buttons } = useTranslations();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bottom-kern-space-large sticky z-40 flex justify-end">
      <button
        type="button"
        onClick={scrollToTop}
        className="kern-btn kern-btn--secondary"
      >
        <span
          className="kern-icon kern-icon--arrow-up kern-icon--default"
          aria-hidden="true"
        ></span>
        <span className="kern-label">{buttons.SCROLL_TO_TOP_BUTTON}</span>
      </button>
    </div>
  );
}
