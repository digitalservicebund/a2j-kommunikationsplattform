import { useState } from "react";
import { Link } from "react-router";

const initialCheckboxState = [false, false, false];

export default function TestKernUXSettings() {
  const [checked, setChecked] = useState(initialCheckboxState);

  const handleChange = (index: number, value: boolean) => {
    const nextCheckboxState = checked.map((c, i) => {
      if (i === index) {
        return value;
      } else {
        return c;
      }
    });
    setChecked(nextCheckboxState);
  };

  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>KERN UX Settings</h1>

      <Link className="kern-btn kern-btn--secondary" to="/test/kern-ux">
        <span className="kern-btn__title">Zurück</span>
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
              checked={checked[0]}
              onChange={(e) => handleChange(0, e.target.checked)}
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
              checked={checked[1]}
              onChange={(e) => handleChange(1, e.target.checked)}
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
              checked={checked[2]}
              onChange={(e) => handleChange(2, e.target.checked)}
            />
            <label className="kern-form-check__label" htmlFor="divers">
              Divers
            </label>
          </div>
        </div>
      </fieldset>
      <br></br>
      <code>CheckboxState: {JSON.stringify(checked)}</code>
    </main>
  );
}
