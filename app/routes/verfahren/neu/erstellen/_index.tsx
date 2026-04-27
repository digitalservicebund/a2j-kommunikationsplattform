import { ActionFunctionArgs, useActionData, useRouteError } from "react-router";
import Alert from "~/components/Alert";
import { KlageErstellenForm } from "~/routes/verfahren/neu/erstellen/components/KlageErstellenForm";

// TODO: Add an action below to handle form submission for creating a new Klage (when API is ready)

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("action request formData");
  const formData = await request.formData();
  return { status: "success", data: formData };
};

export default function KlageErstellen() {
  const data = useActionData();

  console.log(data);

  return (
    <div className="gap-y-kern-space-large flex flex-col">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />
      {data.status === "success" ? (
        <Alert type="success" title="Überprüfung ausstehend" />
      ) : (
        <KlageErstellenForm />
      )}
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
