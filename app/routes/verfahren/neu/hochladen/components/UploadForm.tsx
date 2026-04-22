import { Form, Link } from "react-router";

export function UploadForm({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="border-kern-layout-border gap-y-kern-space-default flex flex-col rounded-lg border p-8">
      <h2 className="kern-heading-small">xJustiz Datensatz hochladen</h2>
      <p className="kern-body">
        Laden Sie von Ihrem Computer eine gültige xJustiz Datei hoch. Hier steht
        dann noch maximale Größe und .xml und so – weiterführende Informationen
        halt.
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
  );
}
