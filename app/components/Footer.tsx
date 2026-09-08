import { Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function Footer() {
  const { shared, descriptions, contentLinkLabels } = useTranslations();
  return (
    <footer className="kern-container mt-(--kern-metric-dimension-5x-large)">
      <div className="kern-py-lg">
        <hr className="kern-divider" aria-hidden="true" />
      </div>
      <nav
        className="kern-gap-x-md flex flex-row flex-wrap justify-between"
        aria-label={shared.FOOTER_ARIA_LABEL}
      >
        <Link to="/datenschutz" className="kern-link">
          {contentLinkLabels.DATENSCHUTZ_LINK_LABEL}
        </Link>
        <Link to="/weitere-informationen" className="kern-link">
          {contentLinkLabels.WEITERE_INFORMATIONEN_LINK_LABEL}
        </Link>
        <Link to="/barrierefreiheit" className="kern-link">
          {contentLinkLabels.BARRIEREFREIHEIT_LINK_LABEL}
        </Link>
        <Link to="/hilfe-und-kontakt" className="kern-link">
          {contentLinkLabels.HILFE_UND_KONTAKT_LINK_LABEL}
        </Link>
        <Link to="/open-source" className="kern-link">
          {contentLinkLabels.OPEN_SOURCE_CODE_LINK_LABEL}
        </Link>
        <Link to="/impressum" className="kern-link">
          {contentLinkLabels.IMPRESSUM_LINK_LABEL}
        </Link>
      </nav>
      <div className="kern-mt-md kern-mb-xl text-center">
        <p className="kern-body kern-body--small kern-body--muted">
          {descriptions.PROJECT_DESCRIPTION}
        </p>
      </div>
    </footer>
  );
}
