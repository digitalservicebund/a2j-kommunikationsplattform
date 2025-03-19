import { useState } from "react";
import { Link } from "react-router";

export default function TestKernUXSettings() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>KERN UX Settings</h1>

      <Link
        className="kern-btn kern-btn--secondary"
        to="/test/kern-ux/dashboard"
      >
        <span className="kern-btn__title">Zum Dashboard</span>
      </Link>

      <fieldset className="kern-fieldset">
        <legend className="kern-fieldset__legend">Ansprechpartner</legend>
        <div className="kern-fieldset__content">
          <div className="kern-form-check">
            <input
              className="kern-form-check__checkbox"
              id="herr"
              name="geschlecht"
              type="checkbox"
              onChange={handleChange}
            />
            <label className="kern-form-check__label" htmlFor="herr">
              Herr
            </label>
          </div>
          <div className="kern-form-check">
            <input
              className="kern-form-check__checkbox"
              id="frau"
              name="geschlecht"
              type="checkbox"
            />
            <label className="kern-form-check__label" htmlFor="frau">
              Frau
            </label>
          </div>
          <div className="kern-form-check">
            <input
              className="kern-form-check__checkbox"
              id="divers"
              name="geschlecht"
              type="checkbox"
            />
            <label className="kern-form-check__label" htmlFor="divers">
              Divers
            </label>
          </div>
        </div>
      </fieldset>

      <p>Herr is {checked ? "checked" : "not checked"}</p>
    </main>
  );
}
