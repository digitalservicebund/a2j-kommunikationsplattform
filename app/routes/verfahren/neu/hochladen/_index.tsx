/* eslint-disable @typescript-eslint/no-unused-vars */

// Known API issues discovered during spike:
// - POST /verfahren returns an array [{...}] instead of a single object (potential bug or design choice)
// - POST /einreichungen: `erstellt_von` is always "" — not populated from token (would be useful if it contained user info)
// - GET /einreichungen/{id}/status: `validation_messages` always [] and `status` always ROT regardless of actual document content (SINC confirmed it's work in progress anf will be fixed when the feature is fully implemented)

import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useNavigation,
  useRouteError,
} from "react-router";
import Alert from "~/components/Alert";
import { authContext } from "~/middleware/auth.server";
import { UploadForm } from "~/routes/verfahren/neu/hochladen/components/UploadForm";
import createEinreichung from "~/services/verfahren/prototype.createEinreichung.server";
import createVerfahren from "~/services/verfahren/prototype.createVerfahren.server";
import getEinreichungStatus, {
  ValidationStatus,
} from "~/services/verfahren/prototype.getEinreichungStatus.server";
import uploadDokument, {
  type DokumentType,
} from "~/services/verfahren/prototype.uploadDokument.server";

type ActionSuccess = {
  success: true;
  verfahrenId: string;
  einreichungId: string;
  dokumentId: string;
  dokumentStatus: string;
  validationStatus: ValidationStatus | null;
  validationStatusError: string | null;
};

type ActionError = {
  success: false;
  error: string;
};

type ActionResult = ActionSuccess | ActionError;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    return {
      success: false,
      error: "Keine Authentifizierungsdaten verfügbar.",
    };
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const type = formData.get("type");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Bitte eine Datei auswählen." };
  }

  if (typeof type !== "string" || !type) {
    return { success: false, error: "Bitte einen Dokumenttyp auswählen." };
  }

  const dokumentType = type as DokumentType;

  const verfahren = await createVerfahren(authData);
  const verfahrenId = verfahren.id;

  const einreichung = await createEinreichung(authData, verfahrenId);
  const einreichungId = einreichung.id;

  const dokument = await uploadDokument(
    authData,
    verfahrenId,
    einreichungId,
    file,
    dokumentType,
  );
  const dokumentId = dokument.id;
  const dokumentStatus = dokument.status;

  let validationStatus: ValidationStatus | null = null;
  let validationStatusError: string | null = null;

  // @TODO: add a possibility to show a Virus check within the UI
  // - where?
  // - goal: show off, that this may take a lot of time, but user can continue
  // - we may add a loading spinner!?
  // - maybe we add a banner "XJustiz file is being processed (validated)"
  // - we want to show off the validierungsstatus somehow

  try {
    validationStatus = await getEinreichungStatus(
      authData,
      verfahrenId,
      einreichungId,
    );
  } catch (err) {
    // Status endpoint is WIP — not yet available on all environments
    validationStatusError = err instanceof Error ? err.message : String(err);
  }

  return redirect(`/verfahren/${verfahrenId}`); // Redirect to the new verfahren page on success
};

export default function XJustitzHochladen() {
  const actionData = useActionData<ActionResult>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="gap-y-kern-space-large flex flex-col">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />

      {actionData && actionData.success && (
        <div className="gap-y-kern-space-default flex flex-col">
          {actionData.validationStatus &&
            actionData.validationStatus.validation_messages.length > 0 && (
              <ul className="gap-y-kern-space-small flex flex-col">
                {actionData.validationStatus.validation_messages.map(
                  (msg, i) => (
                    <li key={i} className="kern-body">
                      {msg}
                    </li>
                  ),
                )}
              </ul>
            )}
        </div>
      )}
      <UploadForm isSubmitting={isSubmitting} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-kern-space-large">
      <Alert
        type="info"
        title="Vorläufige Ansicht"
        message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
      />
      <Alert
        type="error"
        title="Ein Fehler ist aufgetreten"
        message={error instanceof Error ? error.message : String(error)}
      />
      <UploadForm isSubmitting={isSubmitting} />
    </div>
  );
}
