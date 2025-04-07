import { Link } from "react-router";

export default function TestReactAria() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>React Aria</h1>
      <div className="text-center">
        <h2 className="ds-heading-01-reg">Kommunikationsplattform</h2>
        <hr className="mb-20" aria-hidden="true" />
        <p className="ds-body-01-reg mb-40">
          Willkommen auf der Pilotplattform für den digitalen Austausch zwischen
          Gerichten und Verfahrensbeteiligten.
        </p>
        <p className="ds-body-01-reg mb-20">Bitte wählen Sie Ihren Login:</p>
        <Link className="ds-button mb-40" to="/test/react-aria/settings">
          Login
        </Link>
        <br />
        <a href="#" className="ds-link-01-reg">
          Probleme beim Login
        </a>
      </div>
    </main>
  );
}
