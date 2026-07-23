import { useRef, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import Alert from "~/components/Alert";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenPrototypeHint from "~/components/verfahren/VerfahrenPrototypeHint.static";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import VerfahrenTimelineStepCard from "~/components/verfahren/VerfahrenTimelineStepCard";
import {
  getBeteiligteByRoleCode,
  getBeteiligteNamesByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/beteiligteByRole";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchDokument from "~/domains/verfahren/fetchDokument";
import fetchDokumente from "~/domains/verfahren/fetchDokumente";
import formatDokumentSize from "~/domains/verfahren/formatDokumentSize";
import loadVerfahrenEinreichungBundle, {
  Dokument,
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_CLAIM_SUBJECT,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/domains/verfahren/presentationPlaceholders";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/routeContext.server";
import {
  getVirenScanStatusPresentation,
  isEinreichungReady,
} from "~/domains/verfahren/statusPresentation";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );
  const { verfahren, einreichung, dokumente } =
    await loadVerfahrenEinreichungBundle(authData, verfahrenId);

  return {
    verfahren,
    einreichung,
    dokumente,
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
    const einreichungId = formData.get("einreichungId");
    const dokumentId = formData.get("dokumentId");

    if (typeof einreichungId !== "string" || typeof dokumentId !== "string") {
      return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
    }

    const dokumente = (await fetchDokumente(authData, {
      verfahrenId,
      einreichungId,
    })) as Dokument[];

    // The first dokument is the initial filing and must not be deleted.
    if (dokumente[0]?.id === dokumentId) {
      return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
    }

    const { eTag } = await fetchDokument(authData, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
    });

    await deleteDokument(authData, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
      eTag: eTag ?? "",
    });

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  return redirect(`/verfahren/${verfahrenId}`);
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente } = useLoaderData<LoaderData>();
  const { routes, buttons, shared } = useTranslations();

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

  const isReady = isEinreichungReady(dokumente);
  const readinessLabel = isReady
    ? routes.verfahrenNeu.step3.summary.badgeLabels.ready
    : routes.verfahrenNeu.step3.summary.badgeLabels.soon;
  const readinessBadgeClass = isReady ? "success" : "warning";
  const einreichungData = [{ einreichung, dokumente }];
  const additionalDokumenteCount = Math.max(dokumente.length - 1, 0);
  const firstDokumentName = dokumente[0]?.name ?? NOT_AVAILABLE_LABEL;
  const latestDokumentDate = einreichungData[0]?.dokumente?.length
    ? new Date(
        einreichungData[0].dokumente.at(-1)?.erstellt_am ?? NOT_AVAILABLE_LABEL,
      ).toLocaleDateString()
    : NOT_AVAILABLE_LABEL;
  const firstDokumentDate = einreichungData[0]?.dokumente?.[0]?.erstellt_am
    ? new Date(einreichungData[0].dokumente[0].erstellt_am).toLocaleDateString()
    : NOT_AVAILABLE_LABEL;

  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const [error, setError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setIsSubmitting("submitting");

    const formData = new FormData(formRef.current!);

    try {
      const response = await fetch(globalThis.location.href, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError(true);
        setIsSubmitting("idle");
        return;
      }

      // success - redirect will happen via action
      formRef.current?.submit();
    } catch (err) {
      console.error(
        `/verfahren/neu/${verfahren.id}/abgabe form submission error: ${err}`,
      );
      setError(true);
      setIsSubmitting("idle");
    }
  };

  return (
    <div
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-8 kern-col-xl-offset-2">
          <h1 className="kern-heading-large">
            {routes.verfahrenNeu.step3.headline}
          </h1>
          <div className="kern-progress">
            <label className="kern-label" htmlFor="progress1">
              {routes.verfahrenNeu.step3.progress}
            </label>
            <progress id="progress-3" value="3" max="3"></progress>
          </div>
          <div className="pt-kern-space-x-large">
            <div className="kern-gap-lg flex flex-col">
              <div className="gap-kern-space-default flex flex-col lg:flex-row">
                <div>
                  <h2 className="kern-heading-medium">
                    {routes.verfahrenNeu.step3.subline}
                  </h2>
                </div>
                <div className="kern-justify-content-end flex grow">
                  <div className="gap-kern-space-default flex">
                    <div>
                      <Link
                        to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                        className="kern-btn kern-btn--secondary"
                      >
                        <span className="kern-label">{buttons.prev}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <VerfahrenPrototypeHint />

              {/* show a general error alert, if something went wrong */}
              {error ? (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={shared.form.submit.message}
                />
              ) : (
                <>
                  <article className="kern-card">
                    <div className="kern-card__container">
                      <div className="algin-start gap-kern-space-default flex flex-wrap items-start">
                        <div className="flex-1">
                          <h2 className="kern-heading-medium">
                            {`${klaegerinnenNamen} ./. ${beklagteNamen}`}
                          </h2>
                          <div className="align-center kern-body kern-body--muted gap-kern-space-small flex flex-wrap">
                            <span>
                              {routes.verfahrenNeu.step3.summary.aktenzeichen}
                            </span>
                            <span>·</span>
                            <span>
                              {verfahren.gericht?.wert ??
                                routes.verfahrenNeu.step3.summary.gericht}
                            </span>
                            <span>·</span>
                            <span className="bg-kern-feedback-info-background">
                              {PROTOTYPE_CLAIM_SUBJECT}
                            </span>
                          </div>
                        </div>
                        <VerfahrenStatusBadge
                          small
                          tone={readinessBadgeClass}
                          label={readinessLabel}
                        />
                      </div>
                      <div className="gap-kern-space-default grid grid-cols-1 md:grid-cols-3">
                        <VerfahrenBriefSummaryOfBeteiligte
                          notAvailableLabel={NOT_AVAILABLE_LABEL}
                          title={shared.beteiligte.klaegerLabel}
                          beteiligte={getBeteiligteByRoleCode(
                            verfahren.beteiligungen,
                            ROLE_CODE_KLAEGERIN,
                          )}
                          fallbackLabel={shared.beteiligte.fallbackLabel}
                        />
                        <VerfahrenBriefSummaryOfBeteiligte
                          notAvailableLabel={NOT_AVAILABLE_LABEL}
                          title={shared.beteiligte.beklagteLabel}
                          beteiligte={getBeteiligteByRoleCode(
                            verfahren.beteiligungen,
                            ROLE_CODE_BEKLAGTE,
                          )}
                          fallbackLabel={shared.beteiligte.fallbackLabel}
                        />
                        <VerfahrenBriefSummaryOfGericht
                          title={shared.gericht.briefSummaryTitle}
                          gerichtLabel={shared.gericht.label}
                          gericht={
                            verfahren.gericht?.wert ?? NOT_AVAILABLE_LABEL
                          }
                          azLabel={shared.gericht.azLabel}
                          az={
                            verfahren.aktenzeichen_gericht ??
                            NOT_AVAILABLE_LABEL
                          }
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
                      {routes.verfahrenNeu.step3.proceduralSteps.headline}
                    </h3>
                    <div className="gap-kern-space-default flex items-stretch">
                      <div className="w-80 flex-[0_0_auto]">
                        <span className="kern-body kern-body--small kern-body--muted">
                          {
                            routes.verfahrenNeu.step3.proceduralSteps
                              .einreichung.timelineLabel
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
                        {einreichungData.map(({ einreichung, dokumente }) => (
                          <article className="kern-card" key={einreichung.id}>
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
                                    - {einreichung.name ?? NOT_AVAILABLE_LABEL}
                                  </h4>
                                  <p className="kern-preline">
                                    <VerfahrenStatusBadge
                                      small
                                      tone={readinessBadgeClass}
                                      label={readinessLabel}
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
                                        {/* Placeholder value until this field is available in API response. */}
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
                                        {/* Placeholder value until this field is available in API response. */}
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
                                          {new Date(
                                            einreichung.erstellt_am,
                                          ).toLocaleDateString() ??
                                            NOT_AVAILABLE_LABEL}
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
                                        {/* Placeholder value until this field is available in API response. */}
                                        <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                                          {NOT_AVAILABLE_LABEL}
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
                                        {/* Placeholder value until this field is available in API response. */}
                                        <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                                          {PROTOTYPE_CLAIM_SUBJECT}
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                                <div className="w-full">
                                  <h5 className="kern-preline">Dokumente</h5>
                                  {dokumente.length === 0 ? (
                                    <p className="kern-body mt-kern-space-default m-0">
                                      Keine Dokumente vorhanden.
                                    </p>
                                  ) : (
                                    <div className="mt-kern-space-default gap-kern-space-default flex w-full flex-col">
                                      {dokumente.map((dokument, index) => {
                                        const virenScanStatus =
                                          getVirenScanStatusPresentation(
                                            dokument.viren_scan_status,
                                            "long",
                                          );

                                        return (
                                          <div
                                            key={dokument.id}
                                            className="rounded-kern-default p-kern-space-default align-center gap-kern-space-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)"
                                          >
                                            <div className="flex-1">
                                              <div className="kern-body kern-body--bold">
                                                {dokument.name ??
                                                  NOT_AVAILABLE_LABEL}
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
                                                {new Date(
                                                  einreichung.erstellt_am,
                                                ).toLocaleDateString() ??
                                                  NOT_AVAILABLE_LABEL}
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
                                                  value={einreichung.id}
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
                                                    virenScanStatus.badgeClassModifier
                                                  }
                                                  label={virenScanStatus.label}
                                                />
                                              </Form>
                                            ) : (
                                              <div className="flex items-center">
                                                <VerfahrenStatusBadge
                                                  tone={
                                                    virenScanStatus.badgeClassModifier
                                                  }
                                                  label={virenScanStatus.label}
                                                />
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
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
                                  ref={formRef}
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
                                        routes.verfahrenNeu.step3
                                          .proceduralSteps.einreichung.submit
                                      }
                                    </span>
                                  </button>
                                </Form>
                              </footer>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                    <VerfahrenTimelineStepCard
                      timelineLabel={latestDokumentDate}
                      title={
                        routes.verfahrenNeu.step3.proceduralSteps.assets.title
                      }
                      body={`${additionalDokumenteCount} ${routes.verfahrenNeu.step3.proceduralSteps.assets.filesAddedLabel}`}
                      editTo={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                      editLabel={shared.form.labels.edit}
                    />
                    <VerfahrenTimelineStepCard
                      timelineLabel={new Date(
                        verfahren.status_changed,
                      ).toLocaleDateString()}
                      title={
                        routes.verfahrenNeu.step3.proceduralSteps.addDetails
                          .title
                      }
                      body={
                        <span className="bg-kern-feedback-info-background">
                          Kläger, Beklagter, Rubrum und Gericht
                        </span>
                      }
                      editTo={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                      editLabel={shared.form.labels.edit}
                    />
                    <VerfahrenTimelineStepCard
                      timelineLabel={firstDokumentDate}
                      title={
                        routes.verfahrenNeu.step3.proceduralSteps
                          .klageschriftUpload.title
                      }
                      body={firstDokumentName}
                      editTo={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichungData[0].einreichung.id}`}
                      editLabel={shared.form.labels.edit}
                      showConnector={false}
                    />
                  </section>
                </>
              )}
            </div>
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
