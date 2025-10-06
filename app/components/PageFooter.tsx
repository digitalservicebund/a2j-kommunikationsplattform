import { Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function PageFooter() {
  const { labels, descriptions, contentLinkLabels } = useTranslations();
  return (
    <footer className="mt-kern-space-x-large">
      <nav
        className="gap-x-kern-space-default flex flex-row flex-wrap justify-center"
        aria-label={labels.FOOTER_ARIA_LABEL}
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
      <div className="mt-kern-space-default mb-kern-space-x-large text-center">
        <p className="kern-body kern-body--small kern-body--muted">
          {descriptions.PROJECT_DESCRIPTION}
        </p>
      </div>
    </footer>
  );
}
