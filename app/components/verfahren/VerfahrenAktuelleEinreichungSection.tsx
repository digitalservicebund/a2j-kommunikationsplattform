import { RefObject, SyntheticEvent } from "react";
import { Form, Link } from "react-router";
import Button from "~/components/Button";
import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import { buildInitialEinreichungTimelineSteps } from "~/components/verfahren/presentation/buildInitialEinreichungTimelineSteps";
import type { ReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/components/verfahren/presentation/placeholders";
import VerfahrenDokumenteList, {
  DokumentWithValidierungsstatus,
} from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenEinreichungStatusBadge from "~/components/verfahren/VerfahrenEinreichungStatusBadge";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import type {
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import {
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import { useTranslations } from "~/services/translations/context";

export type InitialEinreichungData = {
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

type VerfahrenAktuelleEinreichungSectionProps = {
  initialEinreichung: InitialEinreichungData;
  verfahren: Verfahren;
  readinessPresentation: ReadinessPresentation | null;
  hasValidationIssues: boolean;
  isValidating: boolean;
  isSubmitting: "idle" | "submitting";
  formRef: RefObject<HTMLFormElement | null>;
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
};

export default function VerfahrenAktuelleEinreichungSection({
  initialEinreichung,
  verfahren,
  readinessPresentation,
  hasValidationIssues,
  isValidating,
  isSubmitting,
  formRef,
  handleSubmit,
}: Readonly<VerfahrenAktuelleEinreichungSectionProps>) {
  const translations = useTranslations();

  const beleg = initialEinreichung.beleg;
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";

  const klaegerinnenSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const initialEinreichungTimelineSteps = buildInitialEinreichungTimelineSteps({
    verfahrenId: verfahren.id,
    verfahrenStatusGeaendertAm: verfahren.statusGeaendertAm,
    einreichungId: initialEinreichung.einreichung.id,
    einreichungStatus: initialEinreichung.einreichung.status,
    einreichungDokumente: initialEinreichung.dokumente,
    detailsCompleted: {
      klaeger: klaegerinnenSummary.length > 0,
      beklagter: beklagteSummary.length > 0,
      rubrum: Boolean(verfahren.kurzrubrum),
      gericht: Boolean(verfahren.gericht),
    },
    translations,
  });

  return (
    <>
      {/* Aktuelle Einreichung */}
      <div className="kern-gap-md flex items-stretch">
        {/* Status Text */}
        <div className="w-20 flex-[0_0_auto]">
          <span className="kern-body kern-body--small kern-body--muted">
            {isBelegReady && beleg
              ? new Date(beleg.erstelltAm).toLocaleDateString()
              : translations.routes.verfahrenNeu.step3.proceduralSteps
                  .einreichung.draft}
          </span>
        </div>

        {/* Status Icon */}
        <div className="flex flex-[0_0_auto] flex-col items-center">
          <span
            className={`kern-icon ${isBelegReady ? "kern-icon--check" : "kern-icon--edit"} kern-icon--default`}
            aria-hidden="true"
          ></span>
          <div className="kern-mt-sm min-h-4 w-0.5 flex-1 bg-(--kern-color-decorative-border-default) p-0"></div>
        </div>

        {/* Einreichung Summary */}
        <div className="kern-pb-md flex-1">
          <article
            className="kern-card"
            key={initialEinreichung.einreichung.id}
          >
            <div className="kern-card__container">
              {/* Einreichung Header */}
              <header className="kern-card__header">
                <hgroup className="kern-hgroup">
                  <h4
                    className="kern-title"
                    id="card-current-einreichung-heading"
                  >
                    {
                      translations.routes.verfahrenNeu.step3.proceduralSteps
                        .einreichung.basisdaten.title
                    }{" "}
                    -{" "}
                    {initialEinreichung.einreichung.name ?? NOT_AVAILABLE_LABEL}
                  </h4>
                  <VerfahrenEinreichungStatusBadge
                    beleg={beleg}
                    readinessPresentation={readinessPresentation}
                    hasValidationIssues={hasValidationIssues}
                    belegBadgeLabels={
                      translations.routes.verfahrenNeu.step3.belegStatus
                        .badgeLabels
                    }
                  />
                </hgroup>
              </header>

              <section className="kern-card__body">
                {/* Basic Data */}
                <div className="w-full">
                  <h5 className="kern-preline">
                    {
                      translations.routes.verfahrenNeu.step3.proceduralSteps
                        .einreichung.basisdaten.label
                    }
                  </h5>

                  <div className="kern-mt-md kern-gap-md grid grid-cols-1 rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual) md:grid-cols-2">
                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            translations.routes.verfahrenNeu.step3
                              .proceduralSteps.einreichung.basisdaten.art
                          }
                        </dt>
                        <dd className="kern-description-list-item__value bg-(--kern-color-feedback-info-background)">
                          {PROTOTYPE_EINREICHUNG_ART}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            translations.routes.verfahrenNeu.step3
                              .proceduralSteps.einreichung.basisdaten.gz
                          }
                        </dt>
                        <dd className="kern-description-list-item__value bg-(--kern-color-feedback-info-background)">
                          {PROTOTYPE_EINREICHUNG_GZ}
                        </dd>
                      </div>
                    </dl>

                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {translations.shared.gericht.briefSummaryTitle}
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {verfahren.gericht?.wert ?? NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            translations.routes.verfahrenNeu.step3
                              .proceduralSteps.einreichung.basisdaten.erstelltAm
                          }
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {initialEinreichung.einreichung.erstelltAm
                            ? new Date(
                                initialEinreichung.einreichung.erstelltAm,
                              ).toLocaleDateString()
                            : NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Additional Data */}
                <div className="w-full">
                  <h5 className="kern-preline">
                    {
                      translations.routes.verfahrenNeu.step3.proceduralSteps
                        .einreichung.additionalData.label
                    }
                  </h5>
                  <div className="kern-mt-md kern-gap-md grid grid-cols-1 rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            translations.routes.verfahrenNeu.step3
                              .proceduralSteps.einreichung.additionalData
                              .rubrumLabel
                          }
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {verfahren.kurzrubrum ?? NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            translations.routes.verfahrenNeu.step3
                              .proceduralSteps.einreichung.additionalData
                              .verfahrensgegenstandLabel
                          }
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {verfahren.verfahrensgegenstand ??
                            NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Documents */}
                <div className="w-full">
                  <h5 className="kern-preline">Dokumente</h5>
                  <VerfahrenDokumenteList
                    dokumente={initialEinreichung.dokumente}
                    einreichungId={initialEinreichung.einreichung.id}
                  />
                </div>
              </section>

              {/* Actions */}
              {beleg === null && (
                <footer className="kern-card__footer">
                  {/* Edit */}
                  <Link
                    to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">
                      {translations.shared.form.labels.edit}
                    </span>
                  </Link>

                  {/* Einreichen (Submit) */}
                  <Form
                    ref={formRef}
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="formType" value="einreichen" />
                    <input
                      type="hidden"
                      name="einreichungId"
                      value={initialEinreichung.einreichung.id}
                    />
                    <Button
                      appearance="primary"
                      type="submit"
                      aria-describedby="card-current-einreichung-heading"
                      disabled={isSubmitting === "submitting" || isValidating}
                      label={
                        translations.routes.verfahrenNeu.step3.proceduralSteps
                          .einreichung.submit
                      }
                    />
                  </Form>
                </footer>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Timeline */}
      {initialEinreichungTimelineSteps.map((step) => (
        <VerfahrenTimelineStepCard
          {...step}
          key={`${step.title}-${step.timelineLabel}`}
        />
      ))}
    </>
  );
}
