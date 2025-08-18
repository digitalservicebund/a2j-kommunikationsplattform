import { Link } from "react-router";

export default function PageFooter() {
  return (
    <footer>
      <nav
        className="footer__nav"
        aria-label="Rechtliche und weiterführende Informationen"
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
      <div className="footer__info">
        <p className="kern-body kern-body--small kern-body--muted">
          Ein Onlineprojekt der DigitalService GmbH des Bundes in Zusammenarbeit
          mit der BRAK, SINC und im Auftrag des BMJV.
        </p>
      </div>
    </footer>
  );
}
