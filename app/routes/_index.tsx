import { Link } from "react-router-dom";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export default function DashboardPage() {
  const { labels, alerts } = useTranslations();
  return (
    <>
      <h1 className="kern-heading-medium">{labels.UEBERSICHT_LABEL}</h1>
      <div className="kern-row">
        <div className="kern-col-xl-4 kern-col-sm-12">
          <article className="kern-card kern-card--interactive">
            <div className="kern-card__container">
              <header className="kern-card__header">
                <hgroup>
                  <p className="kern-preline">
                    <span
                      className="kern-icon kern-icon--warning kern-icon--default bg-kern-feedback-warning"
                      aria-hidden="true"
                    ></span>
                  </p>
                  <h2 className="kern-title">
                    {alerts.WORK_IN_PROGRESS_TITLE}
                  </h2>
                </hgroup>
              </header>
              <section className="kern-card__body">
                <p className="kern-body">{alerts.WORK_IN_PROGRESS_MESSAGE}</p>
              </section>
            </div>
          </article>
        </div>
        <div className="kern-col-xl-4 kern-col-sm-12">
          <article className="kern-card kern-card--interactive">
            <div className="kern-card__container">
              <header className="kern-card__header">
                <hgroup>
                  <p className="kern-preline">
                    <span
                      className="kern-icon kern-icon--icon--storage kern-icon--default bg-kern-feedback-info"
                      aria-hidden="true"
                    ></span>
                  </p>
                  <h2 className="kern-title">Verfahren</h2>
                </hgroup>
              </header>
              <section className="kern-card__body">
                <p className="kern-body">
                  Alles rund um das Thema Verfahren: Sehen Sie alle Verfahren in
                  der Übersicht oder erstellen Sie eine neue Klageschrift.
                </p>
              </section>
              <footer className="kern-card__footer">
                <Link to="/verfahren" className="kern-btn kern-btn--primary">
                  <span className="kern-label">Übersichtsseite Verfahren</span>
                </Link>
                <Link
                  to="/verfahren/neu"
                  className="kern-btn kern-btn--secondary"
                >
                  <span className="kern-label">Neues Verfahren anlegen</span>
                </Link>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
