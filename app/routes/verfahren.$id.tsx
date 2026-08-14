import type { SyntheticEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
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
import formatDokumentSize from "~/domains/verfahren/formatDokumentSize";
import type { Verfahren } from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import loadVerfahrenEinreichungenOverview, {
  EinreichungSummary,
} from "~/domains/verfahren/loadVerfahrenEinreichungenOverview.server";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/domains/verfahren/presentationPlaceholders";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/routeContext.server";
import {
  getDokumentStatusPresentation,
  getVerfahrenStatusPresentation,
} from "~/domains/verfahren/statusPresentation";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type LoaderData = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  return loadVerfahrenEinreichungenOverview(authData, verfahrenId);
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

    // So far the formType "delete" is only allowed and meant to be used for an inital
    // Einreichung, therefor the user will be returned to the "neue Klage einreichen" flow.
    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  return redirect(`/verfahren/${verfahrenId}`);
};

export default function VerfahrenId() {
  const { verfahren, einreichungen } = useLoaderData<LoaderData>();
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

  let overviewBadge = getVerfahrenStatusPresentation(verfahren.status);

  const initialEinreichungData = einreichungen[0];
  const initialEinreichung = initialEinreichungData?.einreichung;
  const initialEinreichungDokumente = initialEinreichungData?.dokumente ?? [];
  const showInitialEinreichungDetails =
    Boolean(initialEinreichung) &&
    einreichungen.length === 1 &&
    verfahren.status !== "EINGEREICHT" &&
    initialEinreichung?.status !== "EINGEREICHT";
  const hasInitialEinreichung =
    initialEinreichungData && showInitialEinreichungDetails;

  const isInitialEinreichungReady =
    initialEinreichung?.einreichungsStatus.ergebnis === "GRUEN";
  const initialEinreichungBadge = isInitialEinreichungReady
    ? {
        label: routes.verfahrenNeu.step3.summary.badgeLabels.ready,
        badgeClassModifier: "success" as const,
      }
    : {
        label: routes.verfahrenNeu.step3.summary.badgeLabels.soon,
        badgeClassModifier: "warning" as const,
      };

  const initialTimelineStepData = initialEinreichung
    ? buildInitialTimelineStepData(
        getInitialEinreichungTimelineSteps(initialEinreichungDokumente),
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

  if (hasInitialEinreichung) {
    overviewBadge = initialEinreichungBadge;
  }

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Implementierung folgt bald.");
  };

  return (
    <div className="relative">
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
              {hasInitialEinreichung ? (
                <>
                  <div className="gap-kern-space-default flex items-stretch">
                    <div className="w-80 flex-[0_0_auto]">
                      <span className="kern-body kern-body--small kern-body--muted">
                        {
                          routes.verfahrenNeu.step3.proceduralSteps.einreichung
                            .timelineLabel
                        }
                      </span>
                    </div>
                    <div className="flex flex-[0_0_auto] flex-col items-center">
                      <span
                        className="kern-icon kern-icon--edit kern-icon--default"
                        aria-hidden="true"
                      ></span>
                      <div className="mt-kern-space-small min-h-16 w-2 flex-1 bg-(--kern-color-decorative-border-default) p-0"></div>
                    </div>
                    <div className="pb-kern-space-default flex-1">
                      <article
                        className="kern-card"
                        key={initialEinreichung.id}
                      >
                        <div className="kern-card__container">
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
                                {initialEinreichung.name ?? NOT_AVAILABLE_LABEL}
                              </h4>
                              <p className="kern-preline">
                                <VerfahrenStatusBadge
                                  small
                                  tone={
                                    initialEinreichungBadge.badgeClassModifier
                                  }
                                  label={initialEinreichungBadge.label}
                                />
                              </p>
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
                                        initialEinreichung.erstellt_am,
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
                              {initialEinreichungDokumente.length === 0 ? (
                                <p className="kern-body mt-kern-space-default m-0">
                                  Keine Dokumente vorhanden.
                                </p>
                              ) : (
                                <div className="mt-kern-space-default gap-kern-space-default flex w-full flex-col">
                                  {initialEinreichungDokumente.map(
                                    (dokument, index) => {
                                      const dokumentStatus =
                                        getDokumentStatusPresentation(
                                          dokument.status,
                                        );

                                      return (
                                        <div
                                          key={dokument.id}
                                          className="rounded-kern-default p-kern-space-default align-center gap-kern-space-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)"
                                        >
                                          <div className="flex-1">
                                            <div className="kern-body kern-body--bold">
                                              {dokument.anzeigename}
                                            </div>
                                            <div className="kern-body kern-body--small kern-body--muted">
                                              {formatDokumentSize(
                                                dokument.size_in_bytes,
                                              )}
                                              {" · "}
                                              {
                                                routes.verfahrenNeu.step3
                                                  .proceduralSteps.einreichung
                                                  .dokumente.uploadedAtLabel
                                              }{" "}
                                              {formatDate(dokument.erstellt_am)}
                                            </div>
                                          </div>

                                          {index > 0 ? (
                                            <Form
                                              method="post"
                                              className="gap-kern-space-small flex items-center"
                                            >
                                              <input
                                                type="hidden"
                                                name="formType"
                                                value="delete"
                                              />
                                              <input
                                                type="hidden"
                                                name="einreichungId"
                                                value={initialEinreichung.id}
                                              />
                                              <input
                                                type="hidden"
                                                name="dokumentId"
                                                value={dokument.id}
                                              />
                                              <button
                                                className="kern-btn kern-btn--secondary kern-btn--x-small"
                                                type="submit"
                                              >
                                                <span
                                                  className="kern-icon kern-icon--delete"
                                                  aria-hidden="true"
                                                ></span>
                                                <span className="kern-label kern-sr-only">
                                                  {
                                                    shared.form.deleteDokument
                                                      .label
                                                  }
                                                </span>
                                              </button>
                                              <VerfahrenStatusBadge
                                                tone={
                                                  dokumentStatus.badgeClassModifier
                                                }
                                                label={dokumentStatus.label}
                                              />
                                            </Form>
                                          ) : (
                                            <div className="flex items-center">
                                              <VerfahrenStatusBadge
                                                tone={
                                                  dokumentStatus.badgeClassModifier
                                                }
                                                label={dokumentStatus.label}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                            </div>
                          </section>
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
                              method="post"
                              encType="multipart/form-data"
                              onSubmit={handleSubmit}
                            >
                              <button
                                type="submit"
                                className="kern-btn kern-btn--primary"
                                aria-describedby="card-current-einreichung-heading"
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
                        </div>
                      </article>
                    </div>
                  </div>
                  {initialTimelineStepData.map((timelineStep, index) => {
                    const isLastStep =
                      index === initialTimelineStepData.length - 1;
                    const editTo = isLastStep
                      ? `/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${initialEinreichung.id}`
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
        </div>
      </div>
    </div>
  );
}
