import { useState } from "react";
import { Link } from "react-router";
// https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html
import { CheckboxGroup, Checkbox, Label } from "react-aria-components";

export default function TestReactAriaSettings() {
  const [selected, setSelected] = useState([""]);

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

      <CheckboxGroup value={selected} onChange={setSelected}>
        <Label>Favorite sports</Label>
        <Checkbox value="soccer" className="ds-checkbox">
          Soccer
        </Checkbox>
        <Checkbox value="baseball" className="ds-checkbox">
          Baseball
        </Checkbox>
        <Checkbox value="basketball" className="ds-checkbox">
          Basketball
        </Checkbox>
      </CheckboxGroup>

      <p>Currently selected is/are: {JSON.stringify(selected)}</p>
    </main>
  );
}
