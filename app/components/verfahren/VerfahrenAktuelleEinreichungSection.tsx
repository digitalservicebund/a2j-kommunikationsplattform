import { RefObject, SyntheticEvent } from "react";
import { Form, Link } from "react-router";
import Button from "~/components/Button";
import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import {
  buildInitialTimelineStepData,
  getInitialEinreichungTimelineSteps,
} from "~/components/verfahren/presentation/buildInitialEinreichungTimelineSteps";
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
  const { routes, shared } = useTranslations();

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

  const initialTimelineStepData = buildInitialTimelineStepData(
    getInitialEinreichungTimelineSteps(initialEinreichung.dokumente),
    verfahren.statusGeaendertAm,
    {
      klaeger: klaegerinnenSummary.length > 0,
      beklagter: beklagteSummary.length > 0,
      rubrum: Boolean(verfahren.kurzrubrum),
      gericht: Boolean(verfahren.gericht),
    },
    {
      assetsTitle: routes.verfahrenNeu.step3.proceduralSteps.assets.title,
      filesAddedLabel:
        routes.verfahrenNeu.step3.proceduralSteps.assets.filesAddedLabel,
      addDetailsTitle:
        routes.verfahrenNeu.step3.proceduralSteps.addDetails.title,
      klageschriftUploadTitle:
        routes.verfahrenNeu.step3.proceduralSteps.klageschriftUpload.title,
      klaegerLabel:
        routes.verfahrenNeu.step3.proceduralSteps.addDetails.klaegerLabel,
      beklagterLabel:
        routes.verfahrenNeu.step3.proceduralSteps.addDetails.beklagterLabel,
      rubrumLabel:
        routes.verfahrenNeu.step3.proceduralSteps.addDetails.rubrumLabel,
      gerichtLabel:
        routes.verfahrenNeu.step3.proceduralSteps.addDetails.gerichtLabel,
    },
  );

  return (
    <>
      <div className="gap-kern-space-default flex items-stretch">
        <div className="w-80 flex-[0_0_auto]">
          <span className="kern-body kern-body--small kern-body--muted">
            {isBelegReady && beleg
              ? new Date(beleg.erstelltAm).toLocaleDateString()
              : routes.verfahrenNeu.step3.proceduralSteps.einreichung
                  .timelineLabel}
          </span>
        </div>
        <div className="flex flex-[0_0_auto] flex-col items-center">
          <span
            className={`kern-icon ${isBelegReady ? "kern-icon--check" : "kern-icon--edit"} kern-icon--default`}
            aria-hidden="true"
          ></span>
          <div className="mt-kern-space-small min-h-16 w-2 flex-1 bg-(--kern-color-decorative-border-default) p-0"></div>
        </div>
        <div className="pb-kern-space-default flex-1">
          <article
            className="kern-card"
            key={initialEinreichung.einreichung.id}
          >
            <div className="kern-card__container">
              <header className="kern-card__header">
                <hgroup className="kern-hgroup">
                  <h4
                    className="kern-title"
                    id="card-current-einreichung-heading"
                  >
                    {
                      routes.verfahrenNeu.step3.proceduralSteps.einreichung
                        .basisdaten.titleLabel
                    }{" "}
                    -{" "}
                    {initialEinreichung.einreichung.name ?? NOT_AVAILABLE_LABEL}
                  </h4>
                  <VerfahrenEinreichungStatusBadge
                    beleg={beleg}
                    readinessPresentation={readinessPresentation}
                    hasValidationIssues={hasValidationIssues}
                    belegBadgeLabels={
                      routes.verfahrenNeu.step3.belegStatus.badgeLabels
                    }
                  />
                </hgroup>
              </header>
              <section className="kern-card__body">
                <div className="w-full">
                  <h5 className="kern-preline">
                    {
                      routes.verfahrenNeu.step3.proceduralSteps.einreichung
                        .basisdaten.label
                    }
                  </h5>
                  <div className="mt-kern-space-default gap-kern-space-default rounded-kern-default grid grid-cols-1 border border-(--kern-color-decorative-border-contextual) md:grid-cols-2">
                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.basisdaten.artLabel
                          }
                        </dt>
                        <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                          {PROTOTYPE_EINREICHUNG_ART}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.basisdaten.gzLabel
                          }
                        </dt>
                        <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                          {PROTOTYPE_EINREICHUNG_GZ}
                        </dd>
                      </div>
                    </dl>
                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {shared.gericht.briefSummaryTitle}
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {verfahren.gericht?.wert ?? NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.basisdaten.createdLabel
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
                <div className="w-full">
                  <h5 className="kern-preline">
                    {
                      routes.verfahrenNeu.step3.proceduralSteps.einreichung
                        .additionalData.label
                    }
                  </h5>
                  <div className="mt-kern-space-default gap-kern-space-default rounded-kern-default grid grid-cols-1 border border-(--kern-color-decorative-border-contextual)">
                    <dl className="kern-description-list kern-description-list--col">
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.additionalData.rubrumLabel
                          }
                        </dt>
                        <dd className="kern-description-list-item__value">
                          {verfahren.kurzrubrum ?? NOT_AVAILABLE_LABEL}
                        </dd>
                      </div>
                      <div className="kern-description-list-item">
                        <dt className="kern-description-list-item__key">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.additionalData
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
                <div className="w-full">
                  <h5 className="kern-preline">Dokumente</h5>
                  <VerfahrenDokumenteList
                    dokumente={initialEinreichung.dokumente}
                    einreichungId={initialEinreichung.einreichung.id}
                  />
                </div>
              </section>
              {beleg === null && (
                <footer className="kern-card__footer">
                  <Link
                    to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">
                      {shared.form.labels.edit}
                    </span>
                  </Link>

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
                        routes.verfahrenNeu.step3.proceduralSteps.einreichung
                          .submit
                      }
                    />
                  </Form>
                </footer>
              )}
            </div>
          </article>
        </div>
      </div>
      {initialTimelineStepData.map((timelineStep, index) => {
        const isLastStep = index === initialTimelineStepData.length - 1;
        const editTo = isLastStep
          ? `/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${initialEinreichung.einreichung.id}`
          : `/verfahren/neu/${verfahren.id}/bearbeiten`;

        return (
          <VerfahrenTimelineStepCard
            key={`${timelineStep.title}-${timelineStep.timelineLabel}`}
            timelineLabel={timelineStep.timelineLabel}
            title={timelineStep.title}
            body={timelineStep.body}
            editTo={beleg === null ? editTo : undefined}
            editLabel={beleg === null ? shared.form.labels.edit : undefined}
            showConnector={timelineStep.showConnector}
          />
        );
      })}
    </>
  );
}
