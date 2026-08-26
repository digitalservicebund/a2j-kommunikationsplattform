import { Form } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import canDeleteDokument from "~/domains/verfahren/canDeleteDokument";
import { resolveReadinessPresentation } from "~/domains/verfahren/einreichungReadiness";
import formatDokumentSize from "~/domains/verfahren/formatDokumentSize";
import type { Dokument } from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import type { Validierungsstatus } from "~/domains/verfahren/schemas/validierungsStatusSchema";
import { useTranslations } from "~/services/translations/context";

export type DokumentWithValidierungsstatus = Dokument & {
  validierungsstatus: Validierungsstatus;
};

type VerfahrenDokumenteListProps = {
  dokumente: DokumentWithValidierungsstatus[];
  einreichungId: string;
};

export default function VerfahrenDokumenteList({
  dokumente,
  einreichungId,
}: Readonly<VerfahrenDokumenteListProps>) {
  const { routes, shared } = useTranslations();

  if (dokumente.length === 0) {
    return (
      <p className="kern-body mt-kern-space-default m-0">
        Keine Dokumente vorhanden.
      </p>
    );
  }

  return (
    <div className="mt-kern-space-default gap-kern-space-default flex w-full flex-col">
      {dokumente.map((dokument) => {
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
          <div
            key={dokument.id}
            className="gap-kern-space-small flex w-full flex-col"
          >
            <div className="rounded-kern-default p-kern-space-default align-center gap-kern-space-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)">
              <div className="flex-1">
                <div className="kern-body kern-body--bold">
                  {dokument.anzeigename}
                </div>
                <div className="kern-body kern-body--small kern-body--muted">
                  {formatDokumentSize(dokument.size_in_bytes)}
                  {" · "}
                  {
                    routes.verfahrenNeu.step3.proceduralSteps.einreichung
                      .dokumente.uploadedAtLabel
                  }{" "}
                  {new Date(dokument.erstellt_am).toLocaleDateString()}
                </div>
              </div>
              {canDeleteDokument(dokument) ? (
                <Form
                  method="post"
                  className="gap-kern-space-small flex items-center"
                >
                  <input type="hidden" name="formType" value="delete" />
                  <input
                    type="hidden"
                    name="einreichungId"
                    value={einreichungId}
                  />
                  <input type="hidden" name="dokumentId" value={dokument.id} />
                  <button
                    className="kern-btn kern-btn--secondary kern-btn--x-small"
                    type="submit"
                  >
                    <span
                      className="kern-icon kern-icon--delete"
                      aria-hidden="true"
                    ></span>
                    <span className="kern-label kern-sr-only">
                      {shared.form.deleteDokument.label}
                    </span>
                  </button>
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
            </div>
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
