import { Link, useNavigate } from "react-router";

export default function TestKernUXDashboard() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    alert("logout...");
    navigate("/");
  };

  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        KERN UX Dashboard
      </h1>

      <Link
        className="kern-btn kern-btn--secondary mb-10"
        to="/test/kern-ux/settings"
      >
        <span className="kern-btn__title">Zu den Einstellungen</span>
      </Link>

      <button className="kern-btn kern-btn--primary" onClick={logoutHandler}>
        <span className="kern-btn__title">Ausloggen</span>
      </button>
    </main>
  );
}
