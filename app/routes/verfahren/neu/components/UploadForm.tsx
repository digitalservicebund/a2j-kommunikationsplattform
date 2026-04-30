import { Form, Link } from "react-router";

export function UploadForm({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="border-kern-layout-border gap-y-kern-space-default flex flex-col rounded-lg border p-8">
      <h2 className="kern-heading-small">Klageschrift hochladen</h2>
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
                : "Datei hochladen und weiter"}
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
}
