import { Link } from "react-router";

export default function TestKernUX() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>KERN UX</h1>
      <div className="text-center">
        <h2 className="kern-heading">Kommunikationsplattform</h2>
        <hr className="kern-divider mb-20" aria-hidden="true" />
        <p className="kern-text mb-40">
          Willkommen auf der Pilotplattform für den digitalen Austausch zwischen
          Gerichten und Verfahrensbeteiligten.
        </p>
        <p className="kern-text mb-20">Bitte wählen Sie Ihren Login:</p>
        <Link
          className="kern-btn kern-btn--secondary mb-40"
          to="/test/kern-ux/settings"
        >
          <span className="kern-btn__title">Login</span>
        </Link>
        <br />
        <a href="#" className="kern-link">
          Probleme beim Login
        </a>
      </div>
    </main>
  );
}
