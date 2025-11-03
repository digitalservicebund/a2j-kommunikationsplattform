import { Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function ErrorPage() {
  const { labels, errorMessages } = useTranslations();
  return (
    <main>
      <h1 className="kern-heading-display">
        {errorMessages.TRY_LATER_MESSAGE}
      </h1>
      <Link to="/" className="kern-btn kern-btn--primary">
        <span className="kern-label">{labels.TO_START_PAGE_LABEL}</span>
      </Link>
    </main>
  );
}
