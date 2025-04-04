import { Link, useNavigate } from "react-router";
// https://react-spectrum.adobe.com/react-aria/Button.html
import { Button } from "react-aria-components";

export default function TestReactAriaDashboard() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    alert("logout...");
    navigate("/");
  };

  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        React Aria Dashboard
      </h1>

      <Link
        className="ds-button ds-button-tertiary mb-10"
        to="/test/react-aria/settings"
      >
        Zu den Einstellungen
      </Link>

      <Button className="ds-button" onPress={logoutHandler}>
        Ausloggen
      </Button>
    </main>
  );
}
