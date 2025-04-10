import { Link } from "react-router";

export default function Test() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        Component Library Tests
      </h1>
      <div className="text-center">
        <p className="ds-body-01-reg mb-20">Übersicht:</p>
        <Link className="ds-button mb-40" to="/test/kern-ux">
          KERN UX
        </Link>
        <br />
        <Link className="ds-button mb-40" to="/test/react-aria">
          React Aria
        </Link>
        <br />
        <Link className="ds-button mb-40" to="/test/radix">
          Radix
        </Link>
        <br />
        <Link className="ds-button mb-40" to="/test/a2j">
          A2J Components
        </Link>
      </div>
    </main>
  );
}
