import { useEffect, useRef, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useRevalidator,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import VerfahrenBelegStatusAlert from "~/components/verfahren/VerfahrenBelegStatusAlert";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenPrototypeHint from "~/components/verfahren/VerfahrenPrototypeHint.static";
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
import canDeleteDokument from "~/domains/verfahren/canDeleteDokument";
import deleteDokumentFromEinreichung from "~/domains/verfahren/deleteDokumentFromEinreichung.server";
import fetchBelegById from "~/domains/verfahren/fetchBelegById.server";
import fetchBelege from "~/domains/verfahren/fetchBelege.server";
import fetchDokumentValidierungsstatus from "~/domains/verfahren/fetchDokumentValidierungsstatus.server";
import fetchEinreichungById from "~/domains/verfahren/fetchEinreichungById.server";
import formatDokumentSize from "~/domains/verfahren/formatDokumentSize";
import loadVerfahrenEinreichungBundle, {
  Dokument,
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import {
  NOT_AVAILABLE_LABEL,
  PROTOTYPE_EINREICHUNG_ART,
  PROTOTYPE_EINREICHUNG_GZ,
} from "~/domains/verfahren/presentationPlaceholders";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/routeContext.server";
import { BelegSchema } from "~/domains/verfahren/schemas/belegSchema";
import { ValidierungsstatusSchema } from "~/domains/verfahren/schemas/validierungsStatusSchema";
import submitEinreichungen from "~/domains/verfahren/submitEinreichungen.server";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type Validierungsstatus = z.infer<typeof ValidierungsstatusSchema>;
type Beleg = z.infer<typeof BelegSchema>;

type DokumentWithValidierungsstatus = Dokument & {
  validierungsstatus: Validierungsstatus;
};

type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

// Poll interval while the Einreichung's Validierungslauf is still running,
// so the readiness badge picks up the result without a manual page reload.
const VALIDIERUNGSSTATUS_POLL_INTERVAL_MS = 5_000;

type ReadinessBadgeLabels = {
  ready: string;
  soon: string;
  checking: string;
  problem: string;
  warning: string;
};

type ReadinessPresentation = {
  readinessLabel: string;
  readinessBadgeClass: "success" | "warning" | "danger" | "info";
};

function isValidierungslaufRunning(
  validierungsstatus: Validierungsstatus,
): boolean {
  return validierungsstatus.validierungslauf_status !== "ABGESCHLOSSEN";
}

function resolveReadinessPresentation(
  validierungsstatus: Validierungsstatus,
  badgeLabels: ReadinessBadgeLabels,
  // Additional Validierungsstatus (e.g. of the Einreichung's Dokumente) that
  // should also mark this badge as "still checking" — keeps an aggregate
  // badge consistent with the individual badges it summarizes.
  relatedValidierungsstatus: Validierungsstatus[] = [],
): ReadinessPresentation {
  if (
    isValidierungslaufRunning(validierungsstatus) ||
    relatedValidierungsstatus.some(isValidierungslaufRunning)
  ) {
    return {
      readinessLabel: badgeLabels.checking,
      readinessBadgeClass: "info",
    };
  }

  if (validierungsstatus.ergebnis === "GRUEN") {
    return {
      readinessLabel: badgeLabels.ready,
      readinessBadgeClass: "success",
    };
  }

  if (validierungsstatus.ergebnis === "ROT") {
    return {
      readinessLabel: badgeLabels.problem,
      readinessBadgeClass: "danger",
    };
  }

  if (validierungsstatus.ergebnis === "GELB") {
    return {
      readinessLabel: badgeLabels.warning,
      readinessBadgeClass: "warning",
    };
  }

  return { readinessLabel: badgeLabels.soon, readinessBadgeClass: "warning" };
}

type BelegBadgeLabels = {
  pending: string;
  ready: string;
};

function resolveBelegPresentation(
  beleg: Beleg,
  badgeLabels: BelegBadgeLabels,
): ReadinessPresentation {
  if (beleg.status === "ERSTELLT") {
    return {
      readinessLabel: badgeLabels.ready,
      readinessBadgeClass: "success",
    };
  }

  return { readinessLabel: badgeLabels.pending, readinessBadgeClass: "info" };
}

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

  // The Beleg belongs to the Einreichung, so it's looked up via that
  // relationship instead of threading its id through the URL.
  const { elemente: belege } = await fetchBelege(authData, {
    verfahrenId,
    einreichungId: einreichung.id,
  });
  const latestBeleg = belege.at(-1) ?? null;
  const beleg = latestBeleg
    ? await fetchBelegById(authData, { verfahrenId, id: latestBeleg.id })
    : null;

  return {
    verfahren,
    einreichung,
    dokumente: dokumenteWithValidierungsstatus,
    beleg,
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

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  if (formType === "einreichen") {
    const einreichungId = formData.get("einreichungId") as string;

    // Guards against double-submits (e.g. a stale page, double-click, or
    // back-navigation) — the API only accepts einreichen while the
    // Einreichung is ERSTELLT/FEHLGESCHLAGEN, and rejects it with 409 once a
    // Beleg already exists.
    const { elemente: existingBelege } = await fetchBelege(authData, {
      verfahrenId,
      einreichungId,
    });

    if (existingBelege.length === 0) {
      const { eTag } = await fetchEinreichungById(authData, {
        verfahrenId,
        id: einreichungId,
      });

      await submitEinreichungen(authData, {
        verfahrenId,
        id: einreichungId,
        eTag: eTag ?? "",
      });
    }

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  return redirect(`/verfahren/${verfahrenId}`);
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, beleg } =
    useLoaderData<LoaderData>();
  console.log("verfahren", verfahren);
  console.log("dokumente", dokumente);
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
  const klaegerinnenSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const rubrum =
    verfahren.kurzrubrum || `${klaegerinnenNamen} ./. ${beklagteNamen}`;

  const dokumenteValidierungsstatus = dokumente.map(
    (dokument) => dokument.validierungsstatus,
  );

  const { readinessLabel, readinessBadgeClass } = resolveReadinessPresentation(
    einreichung.einreichungsStatus,
    routes.verfahrenNeu.step3.summary.badgeLabels,
    dokumenteValidierungsstatus,
  );
  const isValidating = readinessBadgeClass === "info";
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;
  const einreichungData = [{ einreichung, dokumente }];
  console.log("einreichungData", einreichungData);
  const timelineSteps = getInitialEinreichungTimelineSteps(dokumente);
  const initialTimelineStepData = buildInitialTimelineStepData(
    timelineSteps,
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
  );

  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const [error, setError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const revalidator = useRevalidator();

  // While the Validierungslauf is still running or the Beleg hasn't been
  // finalized yet, poll for updated data so the badges/alerts reflect the
  // result without the user having to reload the page manually.
  useEffect(() => {
    if (!isValidating && !isBelegPending) {
      return;
    }

    const intervalId = setInterval(() => {
      if (revalidator.state === "idle") {
        revalidator.revalidate();
      }
    }, VALIDIERUNGSSTATUS_POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isValidating, isBelegPending, revalidator]);

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
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
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

              <article className="kern-card">
                <div className="kern-card__container">
                  <div className="algin-start gap-kern-space-default flex w-full flex-wrap items-start">
                    <div className="flex-1">
                      <h2 className="kern-heading-medium">{rubrum}</h2>
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
                          {verfahren.verfahrensgegenstand ??
                            NOT_AVAILABLE_LABEL}
                        </span>
                      </div>
                    </div>
                    <VerfahrenStatusBadge
                      small
                      tone={readinessBadgeClass}
                      label={readinessLabel}
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
                  {routes.verfahrenNeu.step3.proceduralSteps.headline}
                </h3>
                <div className="gap-kern-space-default flex items-stretch">
                  <div className="w-80 flex-[0_0_auto]">
                    <span className="kern-body kern-body--small kern-body--muted">
                      {isBelegReady
                        ? new Date(beleg.erstellt_am).toLocaleDateString()
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
                    {einreichungData.map(({ einreichung, dokumente }) => {
                      const validationErgebnis =
                        einreichung.einreichungsStatus.ergebnis;
                      const hasValidationIssues =
                        validationErgebnis === "ROT" ||
                        validationErgebnis === "GELB";
                      const cardBadgePresentation = beleg
                        ? resolveBelegPresentation(
                            beleg,
                            routes.verfahrenNeu.step3.belegStatus.badgeLabels,
                          )
                        : { readinessLabel, readinessBadgeClass };

                      return (
                        <article className="kern-card" key={einreichung.id}>
                          <div className="kern-card__container">
                            {error ? (
                              <Alert
                                type="error"
                                title={shared.form.submit.title}
                                message={shared.form.submit.message}
                              />
                            ) : beleg ? (
                              <VerfahrenBelegStatusAlert beleg={beleg} />
                            ) : (
                              hasValidationIssues && (
                                <Alert
                                  type={
                                    validationErgebnis === "ROT"
                                      ? "error"
                                      : "warning"
                                  }
                                  title={readinessLabel}
                                  message={einreichung.einreichungsStatus.fehler.join(
                                    "\n",
                                  )}
                                />
                              )
                            )}
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
                                {(beleg || !hasValidationIssues) && (
                                  <p className="kern-preline">
                                    <VerfahrenStatusBadge
                                      small
                                      tone={
                                        cardBadgePresentation.readinessBadgeClass
                                      }
                                      label={
                                        cardBadgePresentation.readinessLabel
                                      }
                                    />
                                  </p>
                                )}
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
                                {dokumente.length === 0 ? (
                                  <p className="kern-body mt-kern-space-default m-0">
                                    Keine Dokumente vorhanden.
                                  </p>
                                ) : (
                                  <div className="mt-kern-space-default gap-kern-space-default flex w-full flex-col">
                                    {dokumente.map((dokument) => {
                                      const dokumentErgebnis =
                                        dokument.validierungsstatus.ergebnis;
                                      const dokumentHasValidationIssues =
                                        dokumentErgebnis === "ROT" ||
                                        dokumentErgebnis === "GELB";
                                      const {
                                        readinessLabel: dokumentStatusLabel,
                                        readinessBadgeClass:
                                          dokumentStatusBadgeClass,
                                      } = resolveReadinessPresentation(
                                        dokument.validierungsstatus,
                                        {
                                          ...routes.verfahrenNeu.step3.summary
                                            .badgeLabels,
                                          ready:
                                            routes.verfahrenNeu.step3.summary
                                              .badgeLabels.checkedClean,
                                        },
                                      );

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
                                            {canDeleteDokument(dokument) ? (
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
                                                    dokumentStatusBadgeClass
                                                  }
                                                  label={dokumentStatusLabel}
                                                />
                                              </Form>
                                            ) : (
                                              <div className="flex items-center">
                                                <VerfahrenStatusBadge
                                                  tone={
                                                    dokumentStatusBadgeClass
                                                  }
                                                  label={dokumentStatusLabel}
                                                />
                                              </div>
                                            )}
                                          </div>
                                          {dokumentHasValidationIssues && (
                                            <Alert
                                              type={
                                                dokumentErgebnis === "ROT"
                                                  ? "error"
                                                  : "warning"
                                              }
                                              title={dokumentStatusLabel}
                                              message={dokument.validierungsstatus.fehler.join(
                                                "\n",
                                              )}
                                            />
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
                                <input
                                  type="hidden"
                                  name="formType"
                                  value="einreichen"
                                />
                                <input
                                  type="hidden"
                                  name="einreichungId"
                                  value={einreichung.id}
                                />
                                <button
                                  type="submit"
                                  className="kern-btn kern-btn--primary"
                                  aria-describedby="card-current-einreichung-heading"
                                  disabled={
                                    isSubmitting === "submitting" ||
                                    isValidating ||
                                    beleg !== null
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
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
                {initialTimelineStepData.map((timelineStep, index) => {
                  const isLastStep =
                    index === initialTimelineStepData.length - 1;
                  const editTo = isLastStep
                    ? `/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichungData[0].einreichung.id}`
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
              </section>
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
