import { useRef, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchDokument from "~/domains/verfahren/fetchDokument";
import fetchDokumente from "~/domains/verfahren/fetchDokumente";
import fetchEinreichungById from "~/domains/verfahren/fetchEinreichungById.server";
import fetchEinreichungenById from "~/domains/verfahren/fetchEinreichungenById.server";
import fetchEinreichungStatus from "~/domains/verfahren/fetchEinreichungStatus.server";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import { DokumentSchema } from "~/domains/verfahren/schemas/dokumentSchema";
import { EinreichungSchema } from "~/domains/verfahren/schemas/einreichungSchema";
import { StatusSchema } from "~/domains/verfahren/schemas/statusSchema";
import { VerfahrenSchema } from "~/domains/verfahren/schemas/verfahrenSchema";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type Verfahren = z.infer<typeof VerfahrenSchema>;
type Einreichung = z.infer<typeof EinreichungSchema>;
type EinreichungStatus = z.infer<typeof StatusSchema>;
type Dokument = z.infer<typeof DokumentSchema>;
type EinreichungWithStatus = Einreichung & {
  einreichungsStatus: EinreichungStatus;
};

const ROLLE_CODE_KLAEGERIN = "101";
const ROLLE_CODE_BEKLAGTE = "028";
const NOT_AVAILABLE = "Unbekannt";

function getBeteiligteByRoleCode(
  beteiligungen: Verfahren["beteiligungen"],
  roleCode: string,
) {
  return (
    beteiligungen?.filter((beteiligung) =>
      beteiligung.rollen?.some((rolle) => rolle.code === roleCode),
    ) ?? []
  );
}

function getBeteiligteNamesByRoleCode(
  beteiligungen: Verfahren["beteiligungen"],
  roleCode: string,
) {
  const names = getBeteiligteByRoleCode(beteiligungen, roleCode)
    .map((beteiligung) => beteiligung.name)
    .filter((name): name is string => Boolean(name));

  if (names.length === 0) {
    return NOT_AVAILABLE;
  }

  return names.join(", ");
}

function getVirenScanStatusLabel(status: Dokument["viren_scan_status"]) {
  if (status === "SAUBER") {
    return "Geprüft und virenfrei";
  }

  if (status === "INFIZIERT") {
    return "Dokument ist infiziert";
  }

  if (status === "FEHLGESCHLAGEN") {
    return "Scan ist fehlgeschlagen";
  }

  if (status === "IN_BEARBEITUNG") {
    return "Scan ist in Bearbeitung";
  }

  return "Scan ist ausstehend";
}

function getVirenScanStatusBadgeClass(status: Dokument["viren_scan_status"]) {
  if (status === "SAUBER") {
    return "success";
  }

  if (status === "INFIZIERT" || status === "FEHLGESCHLAGEN") {
    return "danger";
  }

  return "warning";
}

function BriefSummaryOfGericht({
  title,
  gerichtLabel,
  gericht,
  azLabel,
  az,
  kontoinhaberLabel,
  kontoinhaber,
  ibanLabel,
  iban,
}: Readonly<{
  title: string;
  gerichtLabel: string;
  gericht: string;
  azLabel: string;
  az: string;
  kontoinhaberLabel: string;
  kontoinhaber: string;
  ibanLabel: string;
  iban: string;
}>) {
  return (
    <div className="p-kern-space-default space-y-kern-space-default rounded-kern-default border border-(--kern-color-decorative-border-contextual)">
      <h3 className="kern-heading-small pb-kern-space-default border-b border-(--kern-color-decorative-border-contextual)">
        {title}
      </h3>
      <dl className="kern-description-list kern-description-list--col">
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{gerichtLabel}</dt>
          <dd className="kern-description-list-item__value">{gericht}</dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{azLabel}</dt>
          <dd className="kern-description-list-item__value">{az}</dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {kontoinhaberLabel}
          </dt>
          <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
            {kontoinhaber}
          </dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{ibanLabel}</dt>
          <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
            {iban}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function BriefSummaryOfBeteiligte({
  title,
  beteiligte,
  fallbackLabel,
}: Readonly<{
  title: string;
  beteiligte: Array<NonNullable<Verfahren["beteiligungen"]>[number]>;
  fallbackLabel: string;
}>) {
  return (
    <div className="p-kern-space-default space-y-kern-space-default rounded-kern-default border border-(--kern-color-decorative-border-contextual)">
      <h3 className="kern-heading-small pb-kern-space-default border-b border-(--kern-color-decorative-border-contextual)">
        {title}
      </h3>
      <dl className="kern-description-list kern-description-list--col">
        {beteiligte.length === 0 ? (
          <p className="kern-body">{fallbackLabel}</p>
        ) : (
          <>
            {beteiligte.map((beteiligung) => (
              <>
                <div
                  key={`${beteiligung.id}-name`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Name</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.name ?? NOT_AVAILABLE}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-anschrift`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Anschrift</dt>
                  <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                    {NOT_AVAILABLE}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-kontakt`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Kontakt</dt>
                  <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
                    {NOT_AVAILABLE}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-vertretung`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">
                    Vertretung
                  </dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.prozessbevollmaechtigte &&
                    beteiligung.prozessbevollmaechtigte.length > 0
                      ? beteiligung.prozessbevollmaechtigte
                          .map((prozessbevollmaechtigte) => {
                            const vertretungName =
                              prozessbevollmaechtigte.name ?? NOT_AVAILABLE;

                            if (prozessbevollmaechtigte.aktenzeichen) {
                              return `${vertretungName} (${prozessbevollmaechtigte.aktenzeichen})`;
                            }

                            return vertretungName;
                          })
                          .join(", ")
                      : NOT_AVAILABLE}
                  </dd>
                </div>
              </>
            ))}
          </>
        )}
      </dl>
    </div>
  );
}

type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const { id } = params;

  if (!id) {
    throw new Error("id is missing in loader");
  }

  const verfahren = (await fetchVerfahrenById(authData, {
    id,
  })) as Verfahren;

  const einreichungen = (await fetchEinreichungenById(authData, {
    id,
  })) as Einreichung[];
  const firstEinreichungId = einreichungen[0]?.id;

  if (!firstEinreichungId) {
    throw new Error("No Einreichung could be fetched");
  }

  const einreichung = (await fetchEinreichungById(authData, {
    id: firstEinreichungId,
    verfahrenId: id,
  })) as Einreichung;

  const einreichungWithStatus: EinreichungWithStatus = {
    ...einreichung,
    einreichungsStatus: (await fetchEinreichungStatus(authData, {
      id: einreichung.id,
      verfahrenId: id,
    })) as EinreichungStatus,
  };

  const dokumente = (await fetchDokumente(authData, {
    einreichungId: einreichung.id,
    verfahrenId: id,
  })) as Dokument[];

  return {
    verfahren,
    einreichung: einreichungWithStatus,
    dokumente,
  };
};

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const { id } = params;
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in action");
  }

  if (!id) {
    throw new Error("id is missing in action");
  }

  const formData = await request.formData();
  const formType = formData.get("formType");

  if (formType === "delete") {
    const einreichungId = formData.get("einreichungId");
    const dokumentId = formData.get("dokumentId");

    if (typeof einreichungId !== "string" || typeof dokumentId !== "string") {
      return redirect(`/verfahren/neu/${id}/abgabe`);
    }

    const dokumente = (await fetchDokumente(authData, {
      verfahrenId: id,
      einreichungId,
    })) as Dokument[];

    // The first dokument is the initial filing and must not be deleted.
    if (dokumente[0]?.id === dokumentId) {
      return redirect(`/verfahren/neu/${id}/abgabe`);
    }

    const { eTag } = await fetchDokument(authData, {
      verfahrenId: id,
      einreichungId,
      id: dokumentId,
    });

    await deleteDokument(authData, {
      verfahrenId: id,
      einreichungId,
      id: dokumentId,
      eTag: eTag ?? "",
    });

    return redirect(`/verfahren/neu/${id}/abgabe`);
  }

  return redirect(`/verfahren/${id}`);
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente } = useLoaderData<LoaderData>();
  const { routes, buttons, shared } = useTranslations();

  const klaegerinnenNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLLE_CODE_KLAEGERIN,
  );
  const beklagteNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLLE_CODE_BEKLAGTE,
  );

  const isEinreichungReady = (einreichungDokumente: Dokument[]) => {
    return (
      einreichungDokumente.length > 0 &&
      einreichungDokumente.every(
        (dokument) =>
          dokument.viren_scan_status !== "FEHLGESCHLAGEN" &&
          dokument.viren_scan_status !== "INFIZIERT",
      )
    );
  };

  const isReady = isEinreichungReady(dokumente);
  const readinessLabel = isReady
    ? routes.verfahrenNeu.step3.summary.badgeLabels.ready
    : routes.verfahrenNeu.step3.summary.badgeLabels.soon;
  const readinessBadgeClass = isReady ? "success" : "warning";
  const einreichungData = [{ einreichung, dokumente }];
  const additionalDokumenteCount = Math.max(dokumente.length - 1, 0);
  const firstDokumentName = dokumente[0]?.name ?? NOT_AVAILABLE;

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

              <p className="kern-body kern-body--small">
                <span className="bg-kern-feedback-info-background">
                  Blau markierte Elemente
                </span>{" "}
                sind exemplarisch und statisch hinterlegt, die passende
                API-Integration folgt.
              </p>

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
                              Zahlungsklage über 1.200,00 € aus Kaufvertrag
                            </span>
                          </div>
                        </div>
                        <span
                          className={`kern-badge kern-badge--small kern-badge--${readinessBadgeClass}`}
                        >
                          <span
                            className={`kern-icon kern-icon--${readinessBadgeClass}`}
                            aria-hidden="true"
                          ></span>
                          <span className="kern-label">{readinessLabel}</span>
                        </span>
                      </div>
                      <div className="gap-kern-space-default grid grid-cols-1 md:grid-cols-3">
                        <BriefSummaryOfBeteiligte
                          title={shared.beteiligte.klaegerLabel}
                          beteiligte={getBeteiligteByRoleCode(
                            verfahren.beteiligungen,
                            ROLLE_CODE_KLAEGERIN,
                          )}
                          fallbackLabel={shared.beteiligte.fallbackLabel}
                        />
                        <BriefSummaryOfBeteiligte
                          title={shared.beteiligte.beklagteLabel}
                          beteiligte={getBeteiligteByRoleCode(
                            verfahren.beteiligungen,
                            ROLLE_CODE_BEKLAGTE,
                          )}
                          fallbackLabel={shared.beteiligte.fallbackLabel}
                        />
                        <BriefSummaryOfGericht
                          title={shared.gericht.briefSummaryTitle}
                          gerichtLabel={shared.gericht.label}
                          gericht={verfahren.gericht?.wert ?? NOT_AVAILABLE}
                          azLabel={shared.gericht.azLabel}
                          az={verfahren.aktenzeichen_gericht ?? NOT_AVAILABLE}
                          kontoinhaberLabel={shared.gericht.kontoinhaberLabel}
                          kontoinhaber={NOT_AVAILABLE}
                          ibanLabel={shared.gericht.ibanLabel}
                          iban={NOT_AVAILABLE}
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
                                    - {einreichung.name ?? NOT_AVAILABLE}
                                  </h4>
                                  <p className="kern-preline">
                                    <span
                                      className={`kern-badge kern-badge--small kern-badge--${readinessBadgeClass}`}
                                    >
                                      <span
                                        className={`kern-icon kern-icon--${readinessBadgeClass}`}
                                        aria-hidden="true"
                                      ></span>
                                      <span className="kern-label">
                                        {readinessLabel}
                                      </span>
                                    </span>
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
                                          Klage (verfahrenseinleitend)
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
                                          AR-2024-001
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
                                            NOT_AVAILABLE}
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
                                            NOT_AVAILABLE}
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
                                          {NOT_AVAILABLE}
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
                                          Zahlungsklage über 1.200,00 € aus
                                          Kaufvertrag
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
                                      {dokumente.map((dokument, index) => (
                                        <div
                                          key={dokument.id}
                                          className="rounded-kern-default p-kern-space-default align-center gap-kern-space-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)"
                                        >
                                          <div className="flex-1">
                                            <div className="kern-body kern-body--bold">
                                              {dokument.name ?? NOT_AVAILABLE}
                                            </div>
                                            <div className="kern-body kern-body--small kern-body--muted">
                                              {Number.parseFloat(
                                                (
                                                  dokument.size_in_bytes / 1000
                                                ).toString(),
                                              ).toFixed(2)}{" "}
                                              KB
                                              {" · "}
                                              {
                                                routes.verfahrenNeu.step3
                                                  .proceduralSteps.einreichung
                                                  .dokumente.uploadedAtLabel
                                              }{" "}
                                              {new Date(
                                                einreichung.erstellt_am,
                                              ).toLocaleDateString() ??
                                                NOT_AVAILABLE}
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
                                              <span
                                                className={`kern-badge kern-badge--${getVirenScanStatusBadgeClass(dokument.viren_scan_status)}`}
                                              >
                                                <span
                                                  className={`kern-icon kern-icon--${getVirenScanStatusBadgeClass(dokument.viren_scan_status)}`}
                                                  aria-hidden="true"
                                                ></span>
                                                <span className="kern-label">
                                                  {getVirenScanStatusLabel(
                                                    dokument.viren_scan_status,
                                                  )}
                                                </span>
                                              </span>
                                            </Form>
                                          ) : (
                                            <div className="flex items-center">
                                              <span
                                                className={`kern-badge kern-badge--${getVirenScanStatusBadgeClass(dokument.viren_scan_status)}`}
                                              >
                                                <span
                                                  className={`kern-icon kern-icon--${getVirenScanStatusBadgeClass(dokument.viren_scan_status)}`}
                                                  aria-hidden="true"
                                                ></span>
                                                <span className="kern-label">
                                                  {getVirenScanStatusLabel(
                                                    dokument.viren_scan_status,
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      ))}
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
                    <div className="gap-kern-space-default flex items-stretch">
                      <div className="w-80 flex-[0_0_auto]">
                        <span className="kern-body kern-body--small kern-body--muted">
                          {einreichungData[0]?.dokumente?.length
                            ? new Date(
                                einreichungData[0].dokumente.at(-1)
                                  ?.erstellt_am ?? NOT_AVAILABLE,
                              ).toLocaleDateString()
                            : NOT_AVAILABLE}
                        </span>
                      </div>
                      <div className="flex flex-[0_0_auto] flex-col items-center">
                        <span
                          className="kern-icon kern-icon--check kern-icon--default"
                          aria-hidden="true"
                        ></span>
                        <div className="mt-kern-space-small min-h-16 w-2 flex-1 bg-(--kern-color-decorative-border-default) p-0"></div>
                      </div>
                      <div className="pb-kern-space-default flex-1">
                        <article className="kern-card kern-card--small">
                          <div className="kern-card__container">
                            <header className="kern-card__header">
                              <h2 className="kern-title">
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .assets.title
                                }
                              </h2>
                            </header>
                            <section className="kern-card__body">
                              <div className="flex w-full flex-row items-center justify-between">
                                <p className="kern-body">
                                  {additionalDokumenteCount}{" "}
                                  {
                                    routes.verfahrenNeu.step3.proceduralSteps
                                      .assets.filesAddedLabel
                                  }
                                </p>
                                <Link
                                  to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                                  className="kern-btn kern-btn--tertiary"
                                >
                                  <span className="kern-label">
                                    {shared.form.labels.edit}
                                  </span>
                                </Link>
                              </div>
                            </section>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div className="gap-kern-space-default flex items-stretch">
                      <div className="w-80 flex-[0_0_auto]">
                        <span className="kern-body kern-body--small kern-body--muted">
                          {new Date(
                            verfahren.status_changed,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-[0_0_auto] flex-col items-center">
                        <span
                          className="kern-icon kern-icon--check kern-icon--default"
                          aria-hidden="true"
                        ></span>
                        <div className="mt-kern-space-small min-h-16 w-2 flex-1 bg-(--kern-color-decorative-border-default) p-0"></div>
                      </div>
                      <div className="pb-kern-space-default flex-1">
                        <article className="kern-card kern-card--small">
                          <div className="kern-card__container">
                            <header className="kern-card__header">
                              <h2 className="kern-title">
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .addDetails.title
                                }
                              </h2>
                            </header>
                            <section className="kern-card__body">
                              <div className="flex w-full flex-row items-center justify-between">
                                <p className="kern-body">
                                  <span className="bg-kern-feedback-info-background">
                                    Kläger, Beklagter, Rubrum und Gericht
                                  </span>
                                </p>
                                <Link
                                  to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                                  className="kern-btn kern-btn--tertiary"
                                >
                                  <span className="kern-label">
                                    {shared.form.labels.edit}
                                  </span>
                                </Link>
                              </div>
                            </section>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div className="gap-kern-space-default flex items-stretch">
                      <div className="w-80 flex-[0_0_auto]">
                        <span className="kern-body kern-body--small kern-body--muted">
                          {einreichungData[0]?.dokumente?.[0]?.erstellt_am
                            ? new Date(
                                einreichungData[0].dokumente[0].erstellt_am,
                              ).toLocaleDateString()
                            : NOT_AVAILABLE}
                        </span>
                      </div>
                      <div className="flex flex-[0_0_auto] flex-col items-center">
                        <span
                          className="kern-icon kern-icon--check kern-icon--default"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <div className="pb-kern-space-default flex-1">
                        <article className="kern-card kern-card--small">
                          <div className="kern-card__container">
                            <header className="kern-card__header">
                              <h2 className="kern-title">
                                {
                                  routes.verfahrenNeu.step3.proceduralSteps
                                    .klageschriftUpload.title
                                }
                              </h2>
                            </header>
                            <section className="kern-card__body">
                              <div className="flex w-full flex-row items-center justify-between">
                                <p className="kern-body">{firstDokumentName}</p>
                                <Link
                                  to={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichungData[0].einreichung.id}`}
                                  className="kern-btn kern-btn--tertiary"
                                >
                                  <span className="kern-label">
                                    {shared.form.labels.edit}
                                  </span>
                                </Link>
                              </div>
                            </section>
                          </div>
                        </article>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
          {isSubmitting === "submitting" && (
            <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
              <div className="kern-loader kern-loader--visible">
                <span className="kern-sr-only">Wird geladen...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
