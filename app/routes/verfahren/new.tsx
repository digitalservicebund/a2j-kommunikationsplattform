// SPIKE: Minimal UI to validate Verfahren → Einreichung → Dokument API integration.
// This UI is a placeholder — design TBD. Layout and components will change.
//
// Known API quirks discovered during spike:
// - POST /verfahren returns an array [{...}] instead of a single object (bug)
// - POST /einreichungen: `erstellt_von` is always "" — not populated from token (bug)
// - GET /einreichungen/{id}/status: `validation_messages` always [] even when ROT (bug)

import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigation,
} from "react-router";
import Alert from "~/components/Alert";
import { authContext } from "~/middleware/auth.server";
import createEinreichung from "~/services/verfahren/createEinreichung.server";
import createVerfahren from "~/services/verfahren/createVerfahren.server";
import getEinreichungStatus, {
  type EinreichungValidationStatus,
} from "~/services/verfahren/getEinreichungStatus.server";
import uploadDokument from "~/services/verfahren/uploadDokument.server";

type ActionSuccess = {
  success: true;
  verfahrenId: string;
  einreichungId: string;
  dokumentId: string;
  validationStatus: EinreichungValidationStatus;
};

type ActionError = {
  success: false;
  error: string;
};

type ActionResult = ActionSuccess | ActionError;

export const action = async ({
  request,
  context,
}: ActionFunctionArgs): Promise<ActionResult> => {
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

  try {
    const verfahren = await createVerfahren(authData);
    const verfahrenId: string = verfahren.id;

    const einreichung = await createEinreichung(authData, verfahrenId);
    const einreichungId: string = einreichung.id;

    const dokument = await uploadDokument(
      authData,
      verfahrenId,
      einreichungId,
      file,
      type,
    );
    const dokumentId: string = dokument.id;

    const validationStatus = await getEinreichungStatus(
      authData,
      verfahrenId,
      einreichungId,
    );

    return {
      success: true,
      verfahrenId,
      einreichungId,
      dokumentId,
      validationStatus,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
};

const statusLabels: Record<EinreichungValidationStatus["status"], string> = {
  GRUEN: "Gültig (GRÜN)",
  GELB: "Warnung (GELB)",
  ROT: "Ungültig (ROT)",
};

export default function NeuesVerfahren() {
  const actionData = useActionData<ActionResult>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="gap-y-kern-space-large flex flex-col">
      <h1 className="kern-heading-medium">Neues Verfahren einreichen</h1>

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
                Validierungsstatus
              </dt>
              <dd className="kern-body">
                {statusLabels[actionData.validationStatus.status]}
              </dd>
            </div>
          </dl>

          {actionData.validationStatus.validation_messages.length > 0 && (
            <ul className="gap-y-kern-space-small flex flex-col">
              {actionData.validationStatus.validation_messages.map((msg, i) => (
                <li key={i} className="kern-body">
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Form
        method="post"
        encType="multipart/form-data"
        className="gap-y-kern-space-default flex flex-col"
      >
        <div className="kern-form-input">
          <label className="kern-label" htmlFor="file">
            XJustiz-Dokument (.xml)
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

        <div className="kern-form-input">
          <label className="kern-label" htmlFor="type">
            Dokumenttyp
          </label>
          <div className="kern-form-input__select-wrapper">
            <select
              className="kern-form-input__select"
              id="type"
              name="type"
              defaultValue="XJUSTIZ"
            >
              <option value="XJUSTIZ">XJUSTIZ</option>
              <option value="ANHANG">ANHANG</option>
              <option value="SCHRIFTSTUECK">SCHRIFTSTÜCK</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="kern-btn kern-btn--primary"
            disabled={isSubmitting}
          >
            <span className="kern-label">
              {isSubmitting ? "Wird eingereicht…" : "Verfahren einreichen"}
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
}
