import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
import VerfahrenDokumenteList, {
  DokumentWithValidierungsstatus,
} from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenEinreichungOutcomeAlert from "~/components/verfahren/VerfahrenEinreichungOutcomeAlert";
import VerfahrenEinreichungStatusBadge from "~/components/verfahren/VerfahrenEinreichungStatusBadge";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import {
  getBeteiligteNamesByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/beteiligteByRole";
import { buildBeteiligteSummaryItems } from "~/domains/verfahren/buildBeteiligteSummaryItems";
import {
  buildInitialTimelineStepData,
  getInitialEinreichungTimelineSteps,
} from "~/domains/verfahren/buildInitialEinreichungTimelineSteps";
import deleteDokumentFromEinreichung from "~/domains/verfahren/deleteDokumentFromEinreichung.server";
import { resolveReadinessPresentation } from "~/domains/verfahren/einreichungReadiness";
import fetchBelegDownloadLink from "~/domains/verfahren/fetchBelegDownloadLink.server";
import fetchDokumentValidierungsstatus from "~/domains/verfahren/fetchDokumentValidierungsstatus.server";
import fetchLatestBelegForEinreichung from "~/domains/verfahren/fetchLatestBelegForEinreichung.server";
import type {
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import loadVerfahrenEinreichungenOverview, {
  EinreichungSummary,
} from "~/domains/verfahren/loadVerfahrenEinreichungenOverview.server";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/domains/verfahren/presentationPlaceholders";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/routeContext.server";
import type { Beleg } from "~/domains/verfahren/schemas/belegSchema";
import {
  getDokumentStatusPresentation,
  getVerfahrenStatusPresentation,
} from "~/domains/verfahren/statusPresentation";
import submitEinreichungIfNeeded from "~/domains/verfahren/submitEinreichungIfNeeded.server";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type InitialEinreichungData = {
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

type LoaderData = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
  initialEinreichung: InitialEinreichungData | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  );

  const initialEinreichungData = einreichungen[0];
  // Only show the "current draft" card while there's exactly one Einreichung
  // and neither it nor the Verfahren have been submitted yet — otherwise the
  // page falls back to a plain history list further down.
  const showInitialEinreichungDetails =
    Boolean(initialEinreichungData) &&
    einreichungen.length === 1 &&
    verfahren.status !== "EINGEREICHT" &&
    initialEinreichungData?.einreichung.status !== "EINGEREICHT";

  if (!initialEinreichungData || !showInitialEinreichungDetails) {
    return { verfahren, einreichungen, initialEinreichung: null };
  }

  const { einreichung, dokumente } = initialEinreichungData;

  const dokumenteWithValidierungsstatus = await Promise.all(
    dokumente.map(async (dokument) => {
      const validierungsstatus = await fetchDokumentValidierungsstatus(
        authData,
        {
          verfahrenId,
          einreichungId: einreichung.id,
          id: dokument.id,
        },
      );

      return { ...dokument, validierungsstatus };
    }),
  );

  const beleg = await fetchLatestBelegForEinreichung(authData, {
    verfahrenId,
    einreichungId: einreichung.id,
  });

  return {
    verfahren,
    einreichungen,
    initialEinreichung: {
      einreichung,
      dokumente: dokumenteWithValidierungsstatus,
      beleg,
    },
  };
};

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "action",
  );

  const formData = await request.formData();
  const formType = formData.get("formType");

  if (formType === "delete") {
    const deleteResult = await deleteDokumentFromEinreichung({
      authData,
      verfahrenId,
      einreichungId: formData.get("einreichungId"),
      dokumentId: formData.get("dokumentId"),
    });

    if (deleteResult.status === "invalid-form-data") {
      return redirect(`/verfahren/${verfahrenId}`);
    }

    return redirect(`/verfahren/${verfahrenId}`);
  }

  if (formType === "einreichen") {
    const einreichungId = formData.get("einreichungId") as string;

    await submitEinreichungIfNeeded(authData, { verfahrenId, einreichungId });

    return redirect(`/verfahren/${verfahrenId}`);
  }

  if (formType === "download-beleg") {
    const belegId = formData.get("belegId") as string;

    const downloadUrl = await fetchBelegDownloadLink(authData, {
      verfahrenId,
      id: belegId,
      dispositionType: "ATTACHMENT",
    });

    return { downloadUrl };
  }

  return redirect(`/verfahren/${verfahrenId}`);
};

export default function VerfahrenId() {
  const { verfahren, einreichungen, initialEinreichung } =
    useLoaderData<LoaderData>();
  const { routes, shared } = useTranslations();

  const formatDate = (value: string | null | undefined) => {
    if (!value) {
      return NOT_AVAILABLE_LABEL;
    }

    return new Date(value).toLocaleDateString();
  };

  const klaegerinnenNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
    NOT_AVAILABLE_LABEL,
  );
  const beklagteNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
    NOT_AVAILABLE_LABEL,
  );
  const klaegerinnenSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const beleg = initialEinreichung?.beleg ?? null;
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;

  const dokumenteValidierungsstatus =
    initialEinreichung?.dokumente.map(
      (dokument) => dokument.validierungsstatus,
    ) ?? [];

  const readinessPresentation = initialEinreichung
    ? resolveReadinessPresentation(
        initialEinreichung.einreichung.einreichungsStatus,
        routes.verfahrenNeu.step3.summary.badgeLabels,
        dokumenteValidierungsstatus,
      )
    : null;
  const isValidating = readinessPresentation?.readinessBadgeClass === "info";

  const validationErgebnis =
    initialEinreichung?.einreichung.einreichungsStatus.ergebnis;
  const hasValidationIssues =
    validationErgebnis === "ROT" || validationErgebnis === "GELB";

  const overviewBadge = readinessPresentation
    ? {
        label: readinessPresentation.readinessLabel,
        badgeClassModifier: readinessPresentation.readinessBadgeClass,
      }
    : getVerfahrenStatusPresentation(verfahren.status);

  const initialTimelineStepData = initialEinreichung
    ? buildInitialTimelineStepData(
        getInitialEinreichungTimelineSteps(initialEinreichung.dokumente),
        verfahren.status_geaendert_am,
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
      )
    : [];

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({ isValidating, isBelegPending });

  return (
    <div
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
          <div className="kern-gap-lg flex flex-col">
            <article className="kern-card">
              <div className="kern-card__container">
                <div className="algin-start gap-kern-space-default flex w-full flex-wrap items-start">
                  <div className="flex-1">
                    <h2 className="kern-heading-medium">
                      {`${klaegerinnenNamen} ./. ${beklagteNamen}`}
                    </h2>
                    <div className="align-center kern-body kern-body--muted gap-kern-space-small flex flex-wrap">
                      <span>
                        {verfahren.aktenzeichen_gericht ??
                          routes.verfahrenNeu.step3.summary.aktenzeichen}
                      </span>
                      <span>·</span>
                      <span>
                        {verfahren.gericht?.wert ??
                          routes.verfahrenNeu.step3.summary.gericht}
                      </span>
                      <span>·</span>
                      <span>
                        {verfahren.verfahrensgegenstand ?? NOT_AVAILABLE_LABEL}
                      </span>
                    </div>
                  </div>
                  <VerfahrenStatusBadge
                    small
                    tone={overviewBadge.badgeClassModifier}
                    label={overviewBadge.label}
                  />
                </div>
                <div className="gap-kern-space-default grid w-full grid-cols-1 md:grid-cols-3">
                  <VerfahrenBriefSummaryOfBeteiligte
                    notAvailableLabel={NOT_AVAILABLE_LABEL}
                    title={shared.beteiligte.klaegerLabel}
                    beteiligte={klaegerinnenSummary}
                    fallbackLabel={shared.beteiligte.fallbackLabel}
                  />
                  <VerfahrenBriefSummaryOfBeteiligte
                    notAvailableLabel={NOT_AVAILABLE_LABEL}
                    title={shared.beteiligte.beklagteLabel}
                    beteiligte={beklagteSummary}
                    fallbackLabel={shared.beteiligte.fallbackLabel}
                  />
                  <VerfahrenBriefSummaryOfGericht
                    title={shared.gericht.briefSummaryTitle}
                    gerichtLabel={shared.gericht.label}
                    gericht={verfahren.gericht?.wert ?? NOT_AVAILABLE_LABEL}
                    azLabel={shared.gericht.azLabel}
                    az={verfahren.aktenzeichen_gericht ?? NOT_AVAILABLE_LABEL}
                    kontoinhaberLabel={shared.gericht.kontoinhaberLabel}
                    kontoinhaber={NOT_AVAILABLE_LABEL}
                    ibanLabel={shared.gericht.ibanLabel}
                    iban={NOT_AVAILABLE_LABEL}
                  />
                </div>
              </div>
            </article>

            <section className="space-y-kern-space-default">
              <h3 className="kern-heading-medium">
                {routes.verfahrenId.headline}
              </h3>
              {initialEinreichung ? (
                <>
                  <div className="gap-kern-space-default flex items-stretch">
                    <div className="w-80 flex-[0_0_auto]">
                      <span className="kern-body kern-body--small kern-body--muted">
                        {isBelegReady && beleg
                          ? new Date(beleg.erstellt_am).toLocaleDateString()
                          : routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.timelineLabel}
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
                          <VerfahrenEinreichungOutcomeAlert
                            hasSubmitError={error}
                            beleg={beleg}
                            hasValidationIssues={hasValidationIssues}
                            isValidationErrorFatal={
                              validationErgebnis === "ROT"
                            }
                            readinessLabel={
                              readinessPresentation?.readinessLabel ?? ""
                            }
                            fehler={
                              initialEinreichung.einreichung.einreichungsStatus
                                .fehler
                            }
                          />
                          <header className="kern-card__header">
                            <hgroup className="kern-hgroup">
                              <h4
                                className="kern-title"
                                id="card-current-einreichung-heading"
                              >
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .einreichung.basisdaten.titleLabel
                                }{" "}
                                -{" "}
                                {initialEinreichung.einreichung.name ??
                                  NOT_AVAILABLE_LABEL}
                              </h4>
                              <VerfahrenEinreichungStatusBadge
                                beleg={beleg}
                                readinessPresentation={readinessPresentation}
                                hasValidationIssues={hasValidationIssues}
                                belegBadgeLabels={
                                  routes.verfahrenNeu.step3.belegStatus
                                    .badgeLabels
                                }
                              />
                            </hgroup>
                          </header>
                          <section className="kern-card__body">
                            <div className="w-full">
                              <h5 className="kern-preline">
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .einreichung.basisdaten.label
                                }
                              </h5>
                              <div className="mt-kern-space-default gap-kern-space-default rounded-kern-default grid grid-cols-1 border border-(--kern-color-decorative-border-contextual) md:grid-cols-2">
                                <dl className="kern-description-list kern-description-list--col">
                                  <div className="kern-description-list-item">
                                    <dt className="kern-description-list-item__key">
                                      {
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung
                                          .basisdaten.artLabel
                                      }
                                    </dt>
                                    <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                                      {PROTOTYPE_EINREICHUNG_ART}
                                    </dd>
                                  </div>
                                  <div className="kern-description-list-item">
                                    <dt className="kern-description-list-item__key">
                                      {
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung
                                          .basisdaten.gzLabel
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
                                      {verfahren.gericht?.wert ??
                                        NOT_AVAILABLE_LABEL}
                                    </dd>
                                  </div>
                                  <div className="kern-description-list-item">
                                    <dt className="kern-description-list-item__key">
                                      {
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung
                                          .basisdaten.createdLabel
                                      }
                                    </dt>
                                    <dd className="kern-description-list-item__value">
                                      {formatDate(
                                        initialEinreichung.einreichung
                                          .erstellt_am,
                                      )}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                            <div className="w-full">
                              <h5 className="kern-preline">
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .einreichung.additionalData.label
                                }
                              </h5>
                              <div className="mt-kern-space-default gap-kern-space-default rounded-kern-default grid grid-cols-1 border border-(--kern-color-decorative-border-contextual)">
                                <dl className="kern-description-list kern-description-list--col">
                                  <div className="kern-description-list-item">
                                    <dt className="kern-description-list-item__key">
                                      {
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung
                                          .additionalData.rubrumLabel
                                      }
                                    </dt>
                                    <dd className="kern-description-list-item__value">
                                      {verfahren.kurzrubrum ??
                                        NOT_AVAILABLE_LABEL}
                                    </dd>
                                  </div>
                                  <div className="kern-description-list-item">
                                    <dt className="kern-description-list-item__key">
                                      {
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung
                                          .additionalData
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
                                einreichungId={
                                  initialEinreichung.einreichung.id
                                }
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
                                <input
                                  type="hidden"
                                  name="formType"
                                  value="einreichen"
                                />
                                <input
                                  type="hidden"
                                  name="einreichungId"
                                  value={initialEinreichung.einreichung.id}
                                />
                                <button
                                  type="submit"
                                  className="kern-btn kern-btn--primary"
                                  aria-describedby="card-current-einreichung-heading"
                                  disabled={
                                    isSubmitting === "submitting" ||
                                    isValidating
                                  }
                                >
                                  <span className="kern-label">
                                    {
                                      routes.verfahrenNeu.step3.proceduralSteps
                                        .einreichung.submit
                                    }
                                  </span>
                                </button>
                              </Form>
                            </footer>
                          )}
                        </div>
                      </article>
                    </div>
                  </div>
                  {initialTimelineStepData.map((timelineStep, index) => {
                    const isLastStep =
                      index === initialTimelineStepData.length - 1;
                    const editTo = isLastStep
                      ? `/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${initialEinreichung.einreichung.id}`
                      : `/verfahren/neu/${verfahren.id}/bearbeiten`;

                    return (
                      <VerfahrenTimelineStepCard
                        key={`${timelineStep.title}-${timelineStep.timelineLabel}`}
                        timelineLabel={timelineStep.timelineLabel}
                        title={timelineStep.title}
                        body={timelineStep.body}
                        editTo={editTo}
                        editLabel={shared.form.labels.edit}
                        showConnector={timelineStep.showConnector}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="space-y-kern-space-default">
                  {einreichungen.length ? (
                    einreichungen.map(({ einreichung, dokumente }, index) => {
                      const statusPresentation = getDokumentStatusPresentation(
                        einreichung.status,
                      );
                      const timelineLabel = formatDate(
                        einreichung.eingereicht_am ?? einreichung.erstellt_am,
                      );
                      const title =
                        einreichung.name ??
                        `${routes.verfahrenNeu.step3.proceduralSteps.einreichung.basisdaten.titleLabel} ${index + 1}`;
                      const body = `${statusPresentation.label} · ${routes.verfahrenNeu.step3.proceduralSteps.einreichung.basisdaten.createdLabel} ${formatDate(einreichung.erstellt_am)} · ${dokumente.length} ${routes.verfahrenNeu.step3.proceduralSteps.assets.filesAddedLabel}`;

                      return (
                        <VerfahrenTimelineStepCard
                          key={einreichung.id}
                          timelineLabel={timelineLabel}
                          title={title}
                          body={body}
                          showConnector={index < einreichungen.length - 1}
                        />
                      );
                    })
                  ) : (
                    <p className="kern-body mt-kern-space-default m-0">
                      Keine Einreichung vorhanden.
                    </p>
                  )}
                </div>
              )}
            </section>
          </div>
          <VerfahrenLoader
            active={isSubmitting === "submitting"}
            label="Wird geladen..."
          />
        </div>
      </div>
    </div>
  );
}
