import { useState } from "react";
import { Link } from "react-router";

import Checkbox from "~/components/a2j-components/inputs/Checkbox";

const initialCheckboxState = [false, false, false];

export default function TestRadixSettings() {
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
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>Radix Settings</h1>

      <Link className="ds-button ds-button-tertiary" to="/test/a2j">
        Zurück
      </Link>

      <fieldset>
        <legend>Ansprechpartner</legend>
        <div className="flex mb-20">
          <Checkbox name="herr" onChange={() => handleChange(0, !checked[0])} />
          <label htmlFor="herr">Herr</label>
        </div>
        <div className="flex mb-20">
          <Checkbox name="frau" onChange={() => handleChange(1, !checked[1])} />
          <label htmlFor="frau">Frau</label>
        </div>
        <div className="flex mb-20">
          <Checkbox
            name="divers"
            onChange={() => handleChange(2, !checked[2])}
          />
          <label htmlFor="divers">Divers</label>
        </div>
      </fieldset>

      <br></br>
      <code>CheckboxState: {JSON.stringify(checked)}</code>
    </main>
  );
}
