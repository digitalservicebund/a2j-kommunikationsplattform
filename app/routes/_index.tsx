import {
  KernButton,
  KernColumn,
  KernContainer,
  KernDivider,
  KernHeading,
  KernIcon,
  KernText,
} from "@kern-ux-annex/kern-react-kit";
import { Link, useLoaderData } from "react-router";
import { config } from "~/config/config";

export async function loader() {
  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function IndexPage() {
  const { environment } = useLoaderData<typeof loader>();

  return (
    <KernContainer>
      <KernColumn
        sizes={{
          sm: 10,
          md: 8,
          lg: 6,
          xl: 6,
          xxl: 4,
        }}
        offsets={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
      >
        <main>
          <div className="login">
            <div className="login__container">
              <div className="logo">
                <KernIcon icon="network_node" size="large" />
                <KernHeading size="large" level={1}>
                  Kommunikationsplattform
                </KernHeading>
              </div>

              <KernDivider />

              <KernText type="subline">
                Willkommen auf der Pilotplattform für den digitalen Austausch
                zwischen Gerichten und Verfahrensbeteiligten.
              </KernText>

              <div className="login__buttons">
                <Link
                  to="/login"
                  className="kern-btn kern-btn--block kern-btn--primary"
                >
                  <span className="kern-label">Anmeldung Anwaltschaft</span>
                </Link>

                <KernButton
                  text="Anmeldung Gerichte"
                  variant="primary"
                  disabled
                  className="kern-btn--block"
                />

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

              <KernDivider />
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
      </KernColumn>
    </KernContainer>
  );
}
