import { Link, useLoaderData, useSearchParams } from "react-router";
import { PageMetadata } from "~/components/PageMetadata";
import { config } from "~/config/config";
import { LogoutType } from "./action.logout-user";
import { LoginError } from "./login";

type AlertState =
  | ""
  | LogoutType.Automatic
  | LogoutType.ByUser
  | LoginError.BeA;

export async function loader() {
  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function IndexPage() {
  const { environment } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const alertStatus = searchParams.get("status") as AlertState;
  const loginButtonLabel: string =
    environment === "development"
      ? "Login as Developer"
      : "Anmeldung Anwaltschaft (über beA Login)";

  return (
    <>
      <PageMetadata />

      {alertStatus === LogoutType.Automatic && (
        <div className="kern-alert kern-alert--warning" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--warning kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">Automatisch abgemeldet</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">
              Aus Sicherheitsgründen wurden Sie nach 60 Minuten Inaktivität
              automatisch abgemeldet. Bitte melden Sie sich erneut an.
            </p>
          </div>
        </div>
      )}

      {alertStatus === LogoutType.ByUser && (
        <div className="kern-alert kern-alert--success" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--success kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">Erfolgreich abgemeldet</span>
          </div>
        </div>
      )}

      {alertStatus === LoginError.BeA && (
        <div className="kern-alert kern-alert--danger" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--danger kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">Fehler bei der Anmeldung</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">
              Die Anmeldung über beA-Zugangsdaten war nicht erfolgreich. Bitte
              versuchen Sie es erneut.
            </p>
          </div>
        </div>
      )}

      <div className="login">
        <div className="login__container">
          <div className="logo">
            <span
              className="kern-icon kern-icon--network_node kern-icon--large"
              aria-hidden
            />
            <h1 className="kern-heading-large">Kommunikationsplattform</h1>
          </div>

          <hr className="kern-divider" aria-hidden />

          <p className="kern-subline">
            Willkommen auf der Pilotplattform für den digitalen Austausch
            zwischen Gerichten und Verfahrensbeteiligten.
          </p>

          <div className="login__buttons">
            <Link
              to="/login"
              className="kern-btn kern-btn--block kern-btn--primary"
            >
              <span className="kern-label">{loginButtonLabel}</span>
            </Link>

            <button
              className="kern-btn kern-btn--primary kern-btn--block"
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
                data-testid="demo-button"
              >
                <span className="kern-label">Testzugang</span>
              </Link>
            )}
          </div>

          <hr className="kern-divider" aria-hidden />
        </div>
      </div>
    </>
  );
}
