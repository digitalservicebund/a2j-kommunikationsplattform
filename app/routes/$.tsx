import { data, Link } from "react-router";

/**
 * @see https://reactrouter.com/how-to/file-route-conventions#catch-all-route
 */

export const loader = async () => {
  return data({}, 404);
};

export default function CatchAllRoutePage() {
  return (
    <div className="kern-container">
      <div className="kern-col-12 kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xl-6 kern-col-xxl-4 kern-col-sm-offset-1 kern-col-md-offset-2 kern-col-lg-offset-3 kern-col-xl-offset-3 kern-col-xxl-offset-4">
        <main>
          <h1 className="kern-heading-large">404</h1>
          <p className="kern-text">Die Seite konnte nicht gefunden werden.</p>
          <p>
            Zurück zur{" "}
            <Link to="/" className="kern-link">
              Startseite
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
