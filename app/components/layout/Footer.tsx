import { Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="kern-container mt-(--kern-metric-dimension-5x-large)">
      <div className="kern-py-lg">
        <hr className="kern-divider" aria-hidden="true" />
      </div>
      <nav
        className="kern-gap-x-md flex flex-row flex-wrap justify-between"
        aria-label={t.layout.footer.ariaLabel}
      >
        <Link to="/datenschutz" className="kern-link">
          {t.layout.footer.links.dataProtection}
        </Link>
        <Link to="/weitere-informationen" className="kern-link">
          {t.layout.footer.links.moreInfo}
        </Link>
        <Link to="/barrierefreiheit" className="kern-link">
          {t.layout.footer.links.accessibility}
        </Link>
        <Link to="/hilfe-und-kontakt" className="kern-link">
          {t.layout.footer.links.help}
        </Link>
        <Link to="/open-source" className="kern-link">
          {t.layout.footer.links.openSource}
        </Link>
        <Link to="/impressum" className="kern-link">
          {t.layout.footer.links.impressum}
        </Link>
      </nav>
      <div className="kern-mt-md kern-mb-xl text-center">
        <p className="kern-body kern-body--small kern-body--muted">
          {t.layout.footer.projectDescription}
        </p>
      </div>
    </footer>
  );
}
