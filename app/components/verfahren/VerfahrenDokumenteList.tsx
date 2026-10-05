import { Form, useActionData } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { resolveReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import VerfahrenDokumentItem from "~/components/verfahren/VerfahrenDokumentItem";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import canDeleteDokument from "~/domains/verfahren/services/canDeleteDokument";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

type DeleteDokumentActionData = { formType?: string; dokumentId?: string };

export type DokumentWithValidierungsstatus = Dokument & {
  validierungsstatus: Validierungsstatus;
};

type VerfahrenDokumenteListProps = {
  dokumente: DokumentWithValidierungsstatus[];
  einreichung: Pick<Einreichung, "id" | "name">;
};

export default function VerfahrenDokumenteList({
  dokumente,
  einreichung,
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
  // submitted — it's never shown in this list.
  const visibleDokumente = dokumente.filter(
    (dokument) => dokument.typ !== "XJUSTIZ",
  );

  if (visibleDokumente.length === 0) {
    return (
      <p className="kern-body kern-mt-md m-0">Keine Dokumente vorhanden.</p>
    );
  }

  return (
    <div className="kern-mt-md kern-gap-md flex w-full flex-col">
      {visibleDokumente.map((dokument) => {
        const deleteDokumentError = findDeleteDokumentError(dokument.id);
        const dokumentErgebnis = dokument.validierungsstatus.ergebnis;
        const dokumentHasValidationIssues =
          dokumentErgebnis === "ROT" || dokumentErgebnis === "GELB";
        const {
          readinessLabel: dokumentStatusLabel,
          readinessBadgeClass: dokumentStatusBadgeClass,
        } = resolveReadinessPresentation(dokument.validierungsstatus, {
          ...routes.verfahrenNeu.step3.summary.badgeLabels,
          ready: routes.verfahrenNeu.step3.summary.badgeLabels.checkedClean,
        });

        return (
          <div key={dokument.id} className="kern-gap-sm flex w-full flex-col">
            <VerfahrenDokumentItem dokument={dokument}>
              {canDeleteDokument(dokument, einreichung) ? (
                <Form method="post" className="kern-gap-sm flex items-center">
                  <input type="hidden" name="formType" value="delete" />
                  <input
                    type="hidden"
                    name="einreichungId"
                    value={einreichung.id}
                  />
                  <input type="hidden" name="dokumentId" value={dokument.id} />
                  <Button
                    appearance="secondary"
                    className="kern-btn--x-small"
                    type="submit"
                  >
                    <span
                      className="kern-icon kern-icon--delete"
                      aria-hidden="true"
                    ></span>
                    <span className="kern-label kern-sr-only">
                      {shared.form.deleteDokument.label}
                    </span>
                  </Button>
                  <VerfahrenStatusBadge
                    tone={dokumentStatusBadgeClass}
                    label={dokumentStatusLabel}
                  />
                </Form>
              ) : (
                <div className="flex items-center">
                  <VerfahrenStatusBadge
                    tone={dokumentStatusBadgeClass}
                    label={dokumentStatusLabel}
                  />
                </div>
              )}
            </VerfahrenDokumentItem>
            {deleteDokumentError && (
              <Alert type="error" title={deleteDokumentError} />
            )}
            {dokumentHasValidationIssues && (
              <Alert
                type={dokumentErgebnis === "ROT" ? "error" : "warning"}
                title={dokumentStatusLabel}
                message={dokument.validierungsstatus.fehler.join("\n")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
