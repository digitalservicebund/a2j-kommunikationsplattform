import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
  useRouteError,
} from "react-router";
import Alert from "~/components/Alert";
import { VerfahrenUploadForm } from "~/components/verfahren/VerfahrenUploadForm";
import createEinreichung from "~/domains/verfahren/prototype.createEinreichung.server";
import createVerfahren from "~/domains/verfahren/prototype.createVerfahren.server";
import uploadDokument, {
  type DokumentType,
} from "~/domains/verfahren/prototype.uploadDokument.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";

// this route requires users to be logged in
export const middleware = [authMiddleware];

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

  await uploadDokument(
    authData,
    verfahrenId,
    einreichungId,
    file,
    dokumentType,
  );

  return redirect(`/verfahren/${verfahrenId}/bearbeiten`);
};

export default function VerfahrenNeu() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="kern-heading-medium">Klageschrift hochladen</h1>
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
          <div className="gap-y-kern-space-large flex flex-col">
            <Alert
              type="info"
              title="Vorläufige Ansicht"
              message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
            />
            <p className="kern-body">
              Laden Sie Ihre Klageschrift als PDF oder Wodrd-Datei hoch. Wir
              extrahieren die wichtigsten Daten automatisch für Sie.
            </p>
            <Form
              method="post"
              encType="multipart/form-data"
              className="gap-y-kern-space-default flex flex-col"
            >
              <input type="hidden" name="type" value="XJUSTIZ" />
              <div className="kern-form-input">
                <label className="kern-label" htmlFor="file">
                  Datei hier hochladen (PDF, DOCX)
                </label>
                <input
                  className="kern-form-input__input"
                  id="file"
                  name="file"
                  type="file"
                  required
                />
              </div>
              <div className="kern-form-checkbox">
                <input
                  className="kern-form-checkbox__input"
                  id="enable-analysis"
                  name="enableAnalysis"
                  type="checkbox"
                />
                <label
                  className="kern-form-checkbox__label"
                  htmlFor="enable-analysis"
                >
                  Automatische Analyse der Klageschrift aktivieren
                </label>
              </div>
              <div className="gap-kern-space-default flex flex-wrap">
                <Link to="/verfahren" className="kern-btn kern-btn--secondary">
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
                      : "Datei hochladen und weiter"}
                  </span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
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
        title="Ein Fehler ist aufgetreten beim Hochladen der XJustitz Datei"
        message={error instanceof Error ? error.message : String(error)}
      />
      <VerfahrenUploadForm isSubmitting={isSubmitting} />
    </div>
  );
}
