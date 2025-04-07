import { useState } from "react";
import { Link } from "react-router";

// https://www.radix-ui.com/primitives/docs/components/checkbox
import { Checkbox } from "radix-ui";

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

      <Link className="ds-button ds-button-tertiary" to="/test/radix">
        Zurück
      </Link>

      <fieldset>
        <legend>Ansprechpartner</legend>
        <div className="flex mb-20">
          <Checkbox.Root
            asChild
            className="ds-checkbox"
            id="herr"
            checked={checked[0]}
            onCheckedChange={() => handleChange(0, !checked[0])}
          >
            <input type="checkbox" />
          </Checkbox.Root>
          <label htmlFor="herr">Herr</label>
        </div>
        <div className="flex mb-20">
          <Checkbox.Root
            asChild
            className="ds-checkbox"
            id="frau"
            checked={checked[1]}
            onCheckedChange={() => handleChange(0, !checked[1])}
          >
            <input type="checkbox" />
          </Checkbox.Root>
          <label htmlFor="frau">Frau</label>
        </div>
        <div className="flex mb-20">
          <Checkbox.Root
            asChild
            className="ds-checkbox"
            id="divers"
            checked={checked[2]}
            onCheckedChange={() => handleChange(0, !checked[2])}
          >
            <input type="checkbox" />
          </Checkbox.Root>
          <label htmlFor="divers">Divers</label>
        </div>
      </fieldset>
      <br></br>
      <code>CheckboxState: {JSON.stringify(checked)}</code>
    </main>
  );
}
