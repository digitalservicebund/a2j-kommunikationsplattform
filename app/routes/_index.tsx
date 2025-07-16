import { Link, useLoaderData } from "react-router";
import { config } from "~/config/config";

export async function loader() {
  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function IndexPage() {
  const { environment } = useLoaderData<typeof loader>();

  return (
    <div className="kern-container">
      <div className="kern-col-12 kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xl-6 kern-col-xxl-4 kern-col-sm-offset-1 kern-col-md-offset-2 kern-col-lg-offset-3 kern-col-xl-offset-3 kern-col-xxl-offset-4">
        <main>
          <div className="login">
            <div className="login__container">
              <div className="logo">
                <span
                  className="kern-icon icon--network_node kern-icon--large"
                  aria-hidden="true"
                ></span>
                <h1 className="kern-heading-large">Kommunikationsplattform</h1>
              </div>

              <hr className="kern-divider" aria-hidden="true" />

              <p className="kern-subline">
                Willkommen auf der Pilotplattform für den digitalen Austausch
                zwischen Gerichten und Verfahrensbeteiligten.
              </p>

              <div className="login__buttons">
                <Link
                  to="/login"
                  className="kern-btn kern-btn--block kern-btn--primary"
                >
                  <span className="kern-label">Anmeldung Anwaltschaft</span>
                </Link>

                <button
                  className="kern-btn kern-btn--block kern-btn--primary"
                  aria-disabled="true"
                  disabled
                >
                  <span className="kern-label">Anmeldung Gerichte</span>
                </button>

                {/* only render "Testzugang" demo link for non production environments */}
                {environment !== "production" && (
                  <Link
                    to="/prototype/verfahren"
                    className="kern-btn kern-btn--block kern-btn--secondary"
                    onClick={() => {
                      document.cookie = "demoMode=true; path=/; max-age=3600"; // 1 hour
                    }}
                    data-testid="demoBtn"
                  >
                    <span className="kern-label">Testzugang</span>
                  </Link>
                )}
              </div>

              <hr className="kern-divider" aria-hidden="true" />
            </div>
          </div>
        </main>

        <footer>
          <nav
            className="footer__nav"
            aria-label="Rechtliche und weiterführende Informationen"
          >
            <Link to={"/datenschutz"} className={"kern-link"}>
              Datenschutz
            </Link>
            <Link to={"/weitere-informationen"} className={"kern-link"}>
              Weitere Informationen
            </Link>
            <Link to={"/barrierefreiheit"} className={"kern-link"}>
              Barrierefreiheit
            </Link>
            <Link to={"/hilfe-und-kontakt"} className={"kern-link"}>
              Hilfe und Kontakt
            </Link>
            <Link to={"/opensource"} className={"kern-link"}>
              Open Source Code
            </Link>
            <Link to={"/impressum"} className={"kern-link"}>
              Impressum
            </Link>
          </nav>
          <div className="footer__info">
            <p className="kern-body--small">
              Ein Onlineprojekt der DigitalService GmbH des Bundes in
              Zusammenarbeit mit der BRAK, SINC und im Auftrag des BMJV.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
