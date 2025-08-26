import PageNavigation from "~/components/PageNavigation";

export default function VerfahrensUebersicht() {
  return (
    <div className="container">
      <PageNavigation />
      <hr className="kern-divider" aria-hidden="true" />
      <h1 className="kern-heading-large">Verfahren</h1>
      <h1 className="kern-heading-large">Suche</h1>
      <h1 className="kern-heading-large">Verfahren lsit</h1>
    </div>
  );
}
