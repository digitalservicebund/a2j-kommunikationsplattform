import { Form, useActionData } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { resolveDokumentPresentation } from "~/components/verfahren/presentation/validierungPresentation";
import VerfahrenDokumentItem from "~/components/verfahren/VerfahrenDokumentItem";
import VerfahrenDokumentSichtbarkeitForm from "~/components/verfahren/VerfahrenDokumentSichtbarkeitForm";
import type { DokumentWithValidierungsstatus } from "~/domains/verfahren/application/loadDokumenteWithValidierungsstatus.server";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import canDeleteDokument from "~/domains/verfahren/services/canDeleteDokument";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

export type { DokumentWithValidierungsstatus };

type DeleteDokumentActionData = { formType?: string; dokumentId?: string };

type VerfahrenDokumenteListProps = {
  verfahrenId: string;
  dokumente: DokumentWithValidierungsstatus[];
  einreichung: Pick<Einreichung, "id" | "name">;
  // See canDeleteDokument
  allowSchriftstueck?: boolean;
  // Overrides the Schriftstück's type label, e.g. to call it the Klageschrift
  schriftstueckLabel?: string;
  // E.g. while an upload is running; uses aria-disabled to keep the
  // controls reachable, as KERN recommends
  disabled?: boolean;
};

/**
 * The Dokumente of a draft Einreichung: each can be opened, downloaded, have
 * its Sichtbarkeit changed and (unless protected) be deleted, and shows its
 * Validierungsstatus. The route's action handles the "delete" and
 * "sichtbarkeit" formTypes (see einreichungDokumentActions.server).
 */
export default function VerfahrenDokumenteList({
  verfahrenId,
  dokumente,
  einreichung,
  allowSchriftstueck = false,
  schriftstueckLabel,
  disabled = false,
}: Readonly<VerfahrenDokumenteListProps>) {
  const { routes, shared } = useTranslations();
  const actionData = useActionData<ActionResult<DeleteDokumentActionData>>();

  // Matched by Dokument id, since a page can render several lists.
  function findDeleteDokumentError(dokumentId: string) {
    return actionData?.status === "error" &&
      actionData.data?.formType === "delete" &&
      actionData.data.dokumentId === dokumentId
      ? actionData.error
      : null;
  }

  // The XJustiz Dokument is system-generated metadata, not a file the user
  // submitted — it's never shown in this list. The Schriftstück comes first.
  const visibleDokumente = dokumente
    .filter((dokument) => dokument.typ !== "XJUSTIZ")
    // sort() is safe here: filter() already returned a new array
    .sort(
      (a, b) =>
        Number(b.typ === "SCHRIFTSTUECK") - Number(a.typ === "SCHRIFTSTUECK"),
    );

  const getTypLabel = ({ typ }: DokumentWithValidierungsstatus) =>
    typ === "SCHRIFTSTUECK" && schriftstueckLabel
      ? schriftstueckLabel
      : shared.dokumentType[typ];

  if (visibleDokumente.length === 0) {
    return (
      <p className="kern-body kern-mt-md m-0">Keine Dokumente vorhanden.</p>
    );
  }

  return (
    <ul
      className="kern-mt-md kern-px-none kern-gap-md flex w-full flex-col"
      aria-label={shared.form.uploadedDokumenteListLabel}
    >
      {visibleDokumente.map((dokument) => {
        const deleteDokumentError = findDeleteDokumentError(dokument.id);
        const dokumentErgebnis = dokument.validierungsstatus.ergebnis;
        const dokumentHasValidationIssues =
          dokumentErgebnis === "ROT" || dokumentErgebnis === "GELB";

        return (
          <li key={dokument.id} className="kern-gap-sm flex w-full flex-col">
            <VerfahrenDokumentItem
              dokument={dokument}
              verfahrenId={verfahrenId}
              einreichungId={einreichung.id}
              typLabel={getTypLabel(dokument)}
              validierungsstatus={dokument.validierungsstatus}
              actions={
                // Anchored to the right edge with only the delete button (or
                // its placeholder) right of the Sichtbarkeit, so the selects
                // are aligned across all Dokumente
                <div className="kern-gap-sm flex items-end">
                  <VerfahrenDokumentSichtbarkeitForm
                    dokument={dokument}
                    einreichungId={einreichung.id}
                    disabled={disabled}
                  />
                  {canDeleteDokument(dokument, einreichung, {
                    allowSchriftstueck,
                  }) ? (
                    <Form
                      method="post"
                      preventScrollReset
                      // Deleting reloads the same page, so it shouldn't add
                      // another history entry
                      replace
                      className="flex items-center"
                    >
                      <input type="hidden" name="formType" value="delete" />
                      <input
                        type="hidden"
                        name="einreichungId"
                        value={einreichung.id}
                      />
                      <input
                        type="hidden"
                        name="dokumentId"
                        value={dokument.id}
                      />
                      <Button
                        appearance="secondary"
                        className="kern-btn--x-small border-feedback-danger"
                        type="submit"
                        // aria-disabled doesn't block the submit itself
                        aria-disabled={disabled}
                        onClick={(event) => disabled && event.preventDefault()}
                      >
                        <span
                          className="kern-icon kern-icon--delete bg-feedback-danger"
                          aria-hidden="true"
                        ></span>
                        <span className="kern-label kern-sr-only">
                          {shared.form.deleteDokument.labelForDokument.replace(
                            "{{name}}",
                            dokument.anzeigename,
                          )}
                        </span>
                      </Button>
                    </Form>
                  ) : (
                    // Takes the delete button's space, keeping the alignment
                    <span
                      className="kern-btn kern-btn--secondary kern-btn--x-small invisible"
                      aria-hidden="true"
                    >
                      <span className="kern-icon kern-icon--delete"></span>
                    </span>
                  )}
                </div>
              }
            />
            {deleteDokumentError && (
              <Alert type="error" title={deleteDokumentError} />
            )}
            {dokumentHasValidationIssues && (
              <Alert
                type={dokumentErgebnis === "ROT" ? "error" : "warning"}
                title={
                  resolveDokumentPresentation(
                    dokument.validierungsstatus,
                    routes.verfahrenId.draftKlageeinreichung.summary
                      .badgeLabels,
                  ).label
                }
                message={dokument.validierungsstatus.fehler.join("\n")}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
