/* eslint-disable @typescript-eslint/no-unused-vars */

// Known API issues discovered during spike:
// - POST /verfahren returns an array [{...}] instead of a single object (potential bug or design choice)
// - POST /einreichungen: `erstellt_von` is always "" — not populated from token (would be useful if it contained user info)
// - GET /einreichungen/{id}/status: `validation_messages` always [] and `status` always ROT regardless of actual document content (SINC confirmed it's work in progress anf will be fixed when the feature is fully implemented)

import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import Alert from "~/components/Alert";
import { authContext } from "~/middleware/auth.server";
import createEinreichung from "~/services/verfahren/prototype.createEinreichung.server";
import createVerfahren from "~/services/verfahren/prototype.createVerfahren.server";
import getEinreichungStatus, {
  type EinreichungValidationStatus,
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
  validationStatus: EinreichungValidationStatus | null;
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

  try {
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

    let validationStatus: EinreichungValidationStatus | null = null;
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
  } catch (err) {
    // @TODO: refactor to show alert box
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
};

const statusLabels: Record<EinreichungValidationStatus["status"], string> = {
  GRUEN: "Gültig (GRÜN)",
  GELB: "Warnung (GELB)",
  ROT: "Ungültig (ROT)",
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

      {actionData && !actionData.success && (
        <Alert type="error" title="Fehler" message={actionData.error} />
      )}

      {actionData && actionData.success && (
        <Alert type="success" title="Einreichung erfolgreich erstellt" />
      )}

      {actionData && actionData.success && actionData.validationStatusError && (
        <Alert
          type="info"
          title="Validierungsstatus nicht verfügbar"
          message={actionData.validationStatusError}
        />
      )}

      {actionData && actionData.success && (
        <div className="gap-y-kern-space-default flex flex-col">
          <dl className="gap-y-kern-space-small flex flex-col">
            <div className="gap-x-kern-space-default flex">
              <dt className="kern-body min-w-48 font-semibold">Verfahren-ID</dt>
              <dd className="kern-body">{actionData.verfahrenId}</dd>
            </div>
            <div className="gap-x-kern-space-default flex">
              <dt className="kern-body min-w-48 font-semibold">
                Einreichung-ID
              </dt>
              <dd className="kern-body">{actionData.einreichungId}</dd>
            </div>
            <div className="gap-x-kern-space-default flex">
              <dt className="kern-body min-w-48 font-semibold">Dokument-ID</dt>
              <dd className="kern-body">{actionData.dokumentId}</dd>
            </div>
            <div className="gap-x-kern-space-default flex">
              <dt className="kern-body min-w-48 font-semibold">
                Dokumentstatus
              </dt>
              <dd className="kern-body">{actionData.dokumentStatus}</dd>
            </div>
            {actionData.validationStatus && (
              <div className="gap-x-kern-space-default flex">
                <dt className="kern-body min-w-48 font-semibold">
                  Validierungsstatus
                </dt>
                <dd className="kern-body">
                  {statusLabels[actionData.validationStatus.status]}
                </dd>
              </div>
            )}
          </dl>
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

      <div className="border-kern-layout-border gap-y-kern-space-default flex flex-col rounded-lg border p-8">
        <h2 className="kern-heading-small">xJustiz Datensatz hochladen</h2>
        <p className="kern-body">
          Laden Sie von Ihrem Computer eine gültige xJustiz Datei hoch. Hier
          steht dann noch maximale Größe und .xml und so – weiterführende
          Informationen halt.
        </p>
        <Form
          method="post"
          encType="multipart/form-data"
          className="gap-y-kern-space-default flex flex-col"
        >
          <input type="hidden" name="type" value="XJUSTIZ" />
          <div className="kern-form-input">
            <label className="kern-label" htmlFor="file">
              xJustiz-Datei (.xml)
            </label>
            <input
              className="kern-form-input__input"
              id="file"
              name="file"
              type="file"
              accept=".xml"
              required
            />
          </div>
          <div className="gap-kern-space-default flex flex-wrap">
            <Link to="/verfahren/neu" className="kern-btn kern-btn--secondary">
              <span className="kern-label">Zurück</span>
            </Link>
            <button
              type="submit"
              className="kern-btn kern-btn--primary"
              disabled={isSubmitting}
            >
              <span className="kern-label">
                {isSubmitting
                  ? "Wird hochgeladen…"
                  : "xJustiz Datensatz hochladen"}
              </span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
