import { useState } from "react";
import { Link } from "react-router";

// https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html
import { Checkbox } from "~/components/react-aria/Checkbox";

const initialCheckboxState = [false, false, false];

export default function TestReactAriaSettings() {
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
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        React Aria Settings
      </h1>

      <Link className="ds-button ds-button-tertiary" to="/test/react-aria">
        Zurück
      </Link>

      <fieldset>
        <legend>Ansprechpartner</legend>
        <div className="flex mb-20">
          <Checkbox
            className={"ds-checkbox"}
            isSelected={checked[0]}
            onChange={(isSelected) => handleChange(0, isSelected)}
          >
            Herr
          </Checkbox>
        </div>
        <div className="flex mb-20">
          <Checkbox
            className={"ds-checkbox"}
            isSelected={checked[1]}
            onChange={(isSelected) => handleChange(1, isSelected)}
          >
            Frau
          </Checkbox>
        </div>
        <div className="flex mb-20">
          <Checkbox
            className={"ds-checkbox"}
            isSelected={checked[2]}
            onChange={(isSelected) => handleChange(2, isSelected)}
          >
            Divers
          </Checkbox>
        </div>
      </fieldset>
      <br></br>
      <code>CheckboxState: {JSON.stringify(checked)}</code>
    </main>
  );
}
