import { Outlet } from "react-router";

export const loader = async () => {
  return null;
};

export const handle = {
  breadcrumb: {
    title: "Verfahren",
    url: "/verfahren",
  },
};

export default function Verfahren() {
  return (
    <>
      <div>
        {/* TODO: For future reference, add new components here  */}
        <h1 className="kern-heading-large">Verfahren</h1>
        <hr className="kern-divider" aria-hidden="true" />
        <h1 className="kern-heading-large">Suche</h1>
        <h1 className="kern-heading-large">Verfahren lsit</h1>
        <Outlet />
      </div>
    </>
  );
}
