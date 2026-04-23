import { useRouteError } from "react-router";
import Alert from "~/components/Alert";

// TODO: Add an action below to handle form submission for creating a new Klage (when API is ready)

export default function KlageErstellen() {
  return (
    <div className="gap-y-kern-space-large flex flex-col">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="space-y-kern-space-large">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />
      <Alert
        type="error"
        title="Ein Fehler ist aufgetreten bei der Erstellung der Klage"
        message={error instanceof Error ? error.message : String(error)}
      />
    </div>
  );
}
