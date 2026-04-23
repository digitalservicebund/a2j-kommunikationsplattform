import { Link } from "react-router";
import Alert from "~/components/Alert";

export default function NeuesVerfahren() {
  return (
    <div className="gap-y-kern-space-large flex flex-col">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />

      <div className="border-kern-layout-border gap-y-kern-space-default flex flex-col rounded-lg border p-8">
        <h2 className="kern-heading-small">Verfahren anlegen</h2>
        <p className="kern-body">
          Hier haben Sie die Möglichkeit ein neues Verfahren in der KomPla
          anzulegen – über zwei Wege entweder Upload oder manuelle Eingabe:
        </p>
        <div className="gap-kern-space-default flex flex-wrap">
          <Link
            to="/verfahren/neu/hochladen"
            className="kern-btn kern-btn--primary my-2.5"
          >
            <span className="kern-label">xJustiz Datensatz hochladen</span>
          </Link>
          <Link
            to="/verfahren/neu/erstellen"
            className="kern-btn kern-btn--secondary my-2.5"
            aria-disabled={true}
          >
            <span className="kern-label">Klage manuell erstellen</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
