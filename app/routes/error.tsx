import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main>
      <h1 className="kern-heading-display">
        Bitte versuchen Sie es später erneut.
      </h1>
      <Link to="/" className="kern-btn kern-btn--primary">
        <span className="kern-label">Startseite</span>
      </Link>
    </main>
  );
}
