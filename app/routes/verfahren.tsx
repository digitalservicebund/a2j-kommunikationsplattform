import { Breadcrumb } from "~/components/Breadcrumb";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const handle = {
  breadcrumb: () => <Breadcrumb title="verfahren" url="/verfahren" />,
};

export default function Verfahren() {
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        {/* TODO: For future reference, add new components here  */}
        <h1 className="kern-heading-large">Verfahren</h1>
        <hr className="kern-divider" aria-hidden="true" />
        <h1 className="kern-heading-large">Suche</h1>
        <h1 className="kern-heading-large">Verfahren lsit</h1>
      </div>
    </>
  );
}
