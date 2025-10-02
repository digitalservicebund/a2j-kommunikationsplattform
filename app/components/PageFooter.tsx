import { Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function PageFooter() {
  const { labels, descriptions } = useTranslations();
  return (
    <footer className="mt-kern-space-x-large">
      <nav
        className="gap-x-kern-space-default flex flex-row flex-wrap justify-center"
        aria-label={labels.FOOTER_ARIA_LABEL}
      >
        <Link to="/datenschutz" className="kern-link">
          Datenschutz
        </Link>
        <Link to="/weitere-informationen" className="kern-link">
          Weitere Informationen
        </Link>
        <Link to="/barrierefreiheit" className="kern-link">
          Barrierefreiheit
        </Link>
        <Link to="/hilfe-und-kontakt" className="kern-link">
          Hilfe und Kontakt
        </Link>
        <Link to="/open-source" className="kern-link">
          Open Source Code
        </Link>
        <Link to="/impressum" className="kern-link">
          Impressum
        </Link>
      </nav>
      <div className="mt-kern-space-default mb-kern-space-x-large text-center">
        <p className="kern-body kern-body--small kern-body--muted">
          {descriptions.PROJECT_DESCRIPTION}
        </p>
      </div>
    </footer>
  );
}
