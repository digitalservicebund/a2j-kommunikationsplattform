import { Link } from "react-router";

export const PROJECT_DESCRIPTION =
  "Ein Onlineprojekt der DigitalService GmbH des Bundes in Zusammenarbeit mit der BRAK, SINC und im Auftrag des BMJV.";
export const FOOTER_ARIA_LABEL = "Rechtliche und weiterführende Informationen";

export default function PageFooter() {
  return (
    <footer className="mt-kern-space-x-large">
      <nav
        className="gap-x-kern-space-default flex flex-row flex-wrap justify-center"
        aria-label={FOOTER_ARIA_LABEL}
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
          {PROJECT_DESCRIPTION}
        </p>
      </div>
    </footer>
  );
}
