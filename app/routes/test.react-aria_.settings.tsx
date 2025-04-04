// import { useState } from "react";
import { Link } from "react-router";
// https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html
import { Checkbox } from "~/components/react-aria/Checkbox";

export default function TestReactAriaSettings() {
  // const [selected, setSelected] = useState([""]);

  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        React Aria Settings
      </h1>

      <Link
        className="ds-button ds-button-tertiary"
        to="/test/react-aria/dashboard"
      >
        Zum Dashboard
      </Link>

      <fieldset>
        <legend>Ansprechpartner</legend>
        <div>
          <Checkbox className={"ds-checkbox"}>Herr</Checkbox>
        </div>
        <div>
          <Checkbox className={"ds-checkbox"}>Frau</Checkbox>
        </div>
        <div>
          <Checkbox className={"ds-checkbox"}>Divers</Checkbox>
        </div>
      </fieldset>
      {/* <p>Currently selected is/are: {JSON.stringify(selected)}</p> */}
    </main>
  );
}
