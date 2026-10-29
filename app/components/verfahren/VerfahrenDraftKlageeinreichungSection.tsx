import { RefObject, SyntheticEvent } from "react";
import { Form, Link } from "react-router";
import Button from "~/components/Button";
import type { StatusBadgePresentation } from "~/components/StatusBadge";
import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import { buildKlageeinreichungTimelineSteps } from "~/components/verfahren/presentation/buildKlageeinreichungTimelineSteps";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/components/verfahren/presentation/placeholders";
import VerfahrenDokumenteList, {
  DokumentWithValidierungsstatus,
} from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenEinreichungStatusBadge from "~/components/verfahren/VerfahrenEinreichungStatusBadge";
import VerfahrenTimelineStep from "~/components/verfahren/VerfahrenTimelineStep";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
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

export type EinreichungDetails = {
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

type VerfahrenDraftKlageeinreichungSectionProps = {
  draftKlageeinreichung: EinreichungDetails;
  verfahren: Verfahren;
  validierungPresentation: StatusBadgePresentation | null;
  hasValidationIssues: boolean;
  isValidating: boolean;
  isSubmitting: "idle" | "submitting";
  formRef: RefObject<HTMLFormElement | null>;
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
};

export default function VerfahrenDraftKlageeinreichungSection({
  draftKlageeinreichung,
  verfahren,
  validierungPresentation,
  hasValidationIssues,
  isValidating,
  isSubmitting,
  formRef,
  handleSubmit,
}: Readonly<VerfahrenDraftKlageeinreichungSectionProps>) {
  const translations = useTranslations();

  const beleg = draftKlageeinreichung.beleg;
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";

  const klaegerinnenSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const klageeinreichungTimelineSteps = buildKlageeinreichungTimelineSteps({
    verfahrenId: verfahren.id,
    verfahrenStatusGeaendertAm: verfahren.statusGeaendertAm,
    einreichungStatus: draftKlageeinreichung.einreichung.status,
    einreichungDokumente: draftKlageeinreichung.dokumente,
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
      <VerfahrenTimelineStep
        data-testid="klageeinreichung-timeline-step"
        timelineLabel={
          isBelegReady && beleg
            ? new Date(beleg.erstelltAm).toLocaleDateString()
            : translations.routes.verfahrenId.draftKlageeinreichung
                .proceduralSteps.einreichung.draft
        }
        iconClassName={isBelegReady ? "kern-icon--check" : "kern-icon--edit"}
      >
        <div className="kern-card" key={draftKlageeinreichung.einreichung.id}>
          <div className="kern-card__container">
            {/* Einreichung Header */}
            <header className="kern-card__header">
              <hgroup className="kern-hgroup">
                <h3
                  className="kern-title"
                  id="card-current-einreichung-heading"
                >
                  {
                    translations.routes.verfahrenId.draftKlageeinreichung
                      .proceduralSteps.einreichung.basisdaten.title
                  }{" "}
                  -{" "}
                  {draftKlageeinreichung.einreichung.name ??
                    NOT_AVAILABLE_LABEL}
                </h3>
                <VerfahrenEinreichungStatusBadge
                  beleg={beleg}
                  validierungPresentation={validierungPresentation}
                  hasValidationIssues={hasValidationIssues}
                  belegBadgeLabels={
                    translations.routes.verfahrenId.draftKlageeinreichung
                      .belegStatus.badgeLabels
                  }
                />
              </hgroup>
            </header>

            <section className="kern-card__body">
              {/* Basic Data */}
              <div className="w-full">
                <h5 className="kern-preline">
                  {
                    translations.routes.verfahrenId.draftKlageeinreichung
                      .proceduralSteps.einreichung.basisdaten.label
                  }
                </h5>

                <div className="kern-mt-md kern-gap-md grid grid-cols-1 rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual) md:grid-cols-2">
                  <dl className="kern-description-list kern-description-list--col">
                    <div className="kern-description-list-item">
                      <dt className="kern-description-list-item__key">
                        {
                          translations.routes.verfahrenId.draftKlageeinreichung
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
                          translations.routes.verfahrenId.draftKlageeinreichung
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
                          translations.routes.verfahrenId.draftKlageeinreichung
                            .proceduralSteps.einreichung.basisdaten.erstelltAm
                        }
                      </dt>
                      <dd className="kern-description-list-item__value">
                        {draftKlageeinreichung.einreichung.erstelltAm
                          ? new Date(
                              draftKlageeinreichung.einreichung.erstelltAm,
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
                    translations.routes.verfahrenId.draftKlageeinreichung
                      .proceduralSteps.einreichung.additionalData.label
                  }
                </h5>
                <div className="kern-mt-md kern-gap-md grid grid-cols-1 rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
                  <dl className="kern-description-list kern-description-list--col">
                    <div className="kern-description-list-item">
                      <dt className="kern-description-list-item__key">
                        {
                          translations.routes.verfahrenId.draftKlageeinreichung
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
                          translations.routes.verfahrenId.draftKlageeinreichung
                            .proceduralSteps.einreichung.additionalData
                            .verfahrensgegenstandLabel
                        }
                      </dt>
                      <dd className="kern-description-list-item__value">
                        {verfahren.verfahrensgegenstand ?? NOT_AVAILABLE_LABEL}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Documents */}
              <div className="w-full">
                <h5 className="kern-preline">Dokumente</h5>
                <VerfahrenDokumenteList
                  verfahrenId={verfahren.id}
                  dokumente={draftKlageeinreichung.dokumente}
                  einreichung={draftKlageeinreichung.einreichung}
                />
              </div>
            </section>

            {/* Actions */}
            {beleg === null && (
              <footer className="kern-card__footer">
                {/* Edit */}
                <Link
                  to={buildKlageeinreichungPath("dokumente", {
                    verfahren: verfahren.id,
                  })}
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
                  preventScrollReset
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="formType" value="einreichen" />
                  <input
                    type="hidden"
                    name="einreichungId"
                    value={draftKlageeinreichung.einreichung.id}
                  />
                  <Button
                    appearance="primary"
                    type="submit"
                    aria-describedby="card-current-einreichung-heading"
                    disabled={isSubmitting === "submitting" || isValidating}
                    label={
                      translations.routes.verfahrenId.draftKlageeinreichung
                        .proceduralSteps.einreichung.submit
                    }
                  />
                </Form>
              </footer>
            )}
          </div>
        </div>
      </VerfahrenTimelineStep>

      {/* Timeline */}
      {klageeinreichungTimelineSteps.map((step) => (
        <VerfahrenTimelineStepCard
          {...step}
          key={`${step.title}-${step.timelineLabel}`}
        />
      ))}
    </>
  );
}
