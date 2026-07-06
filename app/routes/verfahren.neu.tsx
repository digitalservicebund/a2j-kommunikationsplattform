import { useRef, useState } from "react";
import { ActionFunctionArgs, Form, Link, redirect } from "react-router";
import Alert from "~/components/Alert";
import createEinreichung from "~/domains/verfahren/createEinreichung.server";
import createVerfahren from "~/domains/verfahren/createVerfahren.server";
import uploadDokument, {
  type DokumentType,
} from "~/domains/verfahren/uploadDokument.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

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

  return redirect(`/verfahren/neu/${verfahrenId}/bearbeiten`);
};

export default function VerfahrenNeu() {
  const { routes } = useTranslations();

  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting("submitting");
    formRef.current?.submit();
  };

  return (
    <div
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2">
          <h1 className="kern-heading-large">{routes.verfahrenNeu.headline}</h1>
          <div className="kern-progress">
            <label className="kern-label" htmlFor="progress1">
              Schritt 1 von 3
            </label>
            <progress id="progress-1" value="1" max="3"></progress>
          </div>
          <div className="pt-kern-space-default kern-gap-xl flex flex-col">
            <h2 className="kern-heading-medium">
              {routes.verfahrenNeu.subline}
            </h2>
            <p className="kern-body">
              Laden Sie Ihre Klageschrift als PDF oder Wodrd-Datei hoch. Wir
              extrahieren die wichtigsten Daten automatisch für Sie.
            </p>
            <Form
              ref={formRef}
              method="post"
              encType="multipart/form-data"
              className="relative"
              onSubmit={handleSubmit}
            >
              <div className="kern-gap-xl flex flex-col">
                <input type="hidden" name="type" value="SCHRIFTSTUECK" />
                <div className="kern-form-input">
                  <label className="kern-label" htmlFor="file">
                    Datei hier hochladen (PDF, DOCX)
                  </label>
                  <input
                    className={`${isSubmitting === "submitting" ? "pointer-events-none" : ""} kern-form-input__input`}
                    id="file"
                    name="file"
                    type="file"
                    required
                  />
                </div>
                <div
                  className={`${isSubmitting === "submitting" ? "pointer-events-none" : ""} kern-form-checkbox`}
                >
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
                  <Link
                    to="/verfahren"
                    className={`${isSubmitting === "submitting" ? "pointer-events-none" : ""} kern-btn kern-btn--secondary`}
                  >
                    <span className="kern-label">Zurück</span>
                  </Link>
                  <button
                    type="submit"
                    className="kern-btn kern-btn--primary"
                    disabled={isSubmitting === "submitting"}
                  >
                    <span className="kern-label">
                      Datei hochladen und weiter
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {isSubmitting === "submitting" && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
          <div className="kern-loader kern-loader--visible">
            <span className="kern-sr-only">Wird geladen...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="kern-row">
      <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
        <div className="kern-gap-xl flex flex-col">
          <Alert
            type="info"
            title="Vorläufige Ansicht"
            message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
          />
          <Alert
            type="error"
            title="Ein Fehler ist aufgetreten"
            message="Bitte versuchen Sie es später erneut."
            redirectUrl="/verfahren"
            redirectText="Zurück zur Übersicht"
          />
        </div>
      </div>
    </div>
  );
}
