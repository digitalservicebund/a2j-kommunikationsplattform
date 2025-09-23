import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
} from "react-router";
import Logo from "~/components/Logo.static";
import { PageMetadata } from "~/components/PageMetadata";
import { config } from "~/config/config";
import { getUserSession } from "~/services/prototype.session.server";
import { LoginError, LoginType } from "../action.login-user";
import { LogoutType } from "../action.logout-user";

// Alert state type
type AlertState =
  | ""
  | LogoutType.Automatic
  | LogoutType.ByUser
  | LoginError.BeA;

export async function loader({ request }: { request: Request }) {
  const userSession = await getUserSession(request);
  if (userSession) {
    throw redirect("/");
  }
  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const { environment } = useLoaderData<typeof loader>();
  const alertStatus = searchParams.get("status") as AlertState;
  const loginButtonLabel: string =
    environment === "development"
      ? "Login as Developer"
      : "Anmeldung Anwaltschaft (über beA Login)";

  return (
    <>
      <PageMetadata />

      {alertStatus === LogoutType.Automatic && (
        <div
          className="kern-alert kern-alert--warning my-kern-space-default"
          role="alert"
        >
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
        <div
          className="kern-alert kern-alert--success my-kern-space-default"
          role="alert"
        >
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
        <div
          className="kern-alert kern-alert--danger my-kern-space-default"
          role="alert"
        >
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

      <div className="pt-kern-space-default">
        <div className="text-center">
          <Logo />

          <hr className="kern-divider mt-kern-space-default" aria-hidden />

          <p className="kern-subline my-kern-space-default">
            Willkommen auf der Pilotplattform für den digitalen Austausch
            zwischen Gerichten und Verfahrensbeteiligten.
          </p>

          <Form method="post" action="/action/login-user">
            <div className="py-kern-space-large gap-kern-space-default flex flex-row flex-wrap items-start self-stretch">
              <input
                type="hidden"
                name="loginType"
                value={LoginType.Developer}
              />
              <button
                type="submit"
                className="kern-btn kern-btn--block kern-btn--primary"
              >
                <span className="kern-label">{loginButtonLabel}</span>
              </button>

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
          </Form>

          <hr className="kern-divider my-kern-space-default" aria-hidden />
        </div>
      </div>
    </>
  );
}
