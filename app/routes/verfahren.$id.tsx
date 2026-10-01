import { useRef, useState, type ChangeEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import z from "zod";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import InputSelect from "~/components/InputSelect";
import { PageMetadata } from "~/components/PageMetadata";
import { resolveReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import VerfahrenDraftKlageeinreichungSection, {
  type EinreichungDetails,
} from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenEinreichungOutcomeBanner from "~/components/verfahren/VerfahrenEinreichungOutcomeBanner";
import VerfahrenEinreichungTimeline from "~/components/verfahren/VerfahrenEinreichungTimeline";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenOverviewCard from "~/components/verfahren/VerfahrenOverviewCard";
import VerfahrenTimelineStep from "~/components/verfahren/VerfahrenTimelineStep";
import VerfahrenWeitereEinreichungSection, {
  UPLOAD_WEITERE_DOKUMENT_FORM_TYPE,
} from "~/components/verfahren/VerfahrenWeitereEinreichungSection";
import type { Verfahren } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import loadVerfahrenEinreichungenOverview, {
  EinreichungSummary,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/application/routeContext.server";
import submitEinreichungIfNeeded from "~/domains/verfahren/application/submitEinreichungIfNeeded.server";
import { EinreichungArtSchema } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import {
  fetchBelegDownloadLink,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  deleteDokumentFromEinreichung,
  fetchDokumentValidierungsstatus,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import findOpenEinreichung from "~/domains/verfahren/services/findOpenEinreichung";
import isKlageeinreichung from "~/domains/verfahren/services/isKlageeinreichung";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  actionResultFromApiError,
  actionResultFromInputParsingError,
  actionSuccess,
} from "~/utils/actionResult";
import { rethrowApiNotFoundAsRouteError } from "~/utils/apiError";
import { dispatchFormAction } from "~/utils/dispatchFormAction";

type LoaderData = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
  draftKlageeinreichung: EinreichungDetails | null;
  draftWeitereEinreichung: EinreichungDetails | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

async function loadEinreichungDetails(
  authData: AuthenticationResponse,
  verfahrenId: string,
  { einreichung, dokumente }: EinreichungSummary,
): Promise<EinreichungDetails> {
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

  return { einreichung, dokumente: dokumenteWithValidierungsstatus, beleg };
}

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  ).catch(rethrowApiNotFoundAsRouteError);

  // A draft is an Einreichung that's still open (ERSTELLT/FEHLGESCHLAGEN) —
  // the only statuses in which the API lets Dokumente be changed and the
  // Einreichung be submitted. Once submitted, it's listed in the history.
  const openKlageeinreichung = findOpenEinreichung(
    einreichungen.filter(({ einreichung }) => isKlageeinreichung(einreichung)),
  );
  const openWeitereEinreichung = findOpenEinreichung(
    einreichungen.filter(({ einreichung }) => !isKlageeinreichung(einreichung)),
  );

  const [draftKlageeinreichung, draftWeitereEinreichung] = await Promise.all([
    openKlageeinreichung
      ? loadEinreichungDetails(authData, verfahrenId, openKlageeinreichung)
      : null,
    openWeitereEinreichung
      ? loadEinreichungDetails(authData, verfahrenId, openWeitereEinreichung)
      : null,
  ]);

  return {
    verfahren,
    einreichungen,
    draftKlageeinreichung,
    draftWeitereEinreichung,
  };
};

type FormActionContext = {
  authData: AuthenticationResponse;
  verfahrenId: string;
};

const WeitereDokumentUploadSchema = z.object({
  einreichungId: z.string().min(1),
  file: z.file().min(1),
  sichtbarkeitAlle: z.enum(["true", "false"]).transform((v) => v === "true"),
});

async function handleDelete(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  try {
    await deleteDokumentFromEinreichung({
      authData,
      verfahrenId,
      einreichungId: formData.get("einreichungId"),
      dokumentId: formData.get("dokumentId"),
    });

    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.deleteFailed,
    });
  }
}

async function handleEinreichen(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const einreichungId = formData.get("einreichungId") as string;

  try {
    await submitEinreichungIfNeeded(authData, { verfahrenId, einreichungId });

    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.einreichungFailed,
    });
  }
}

async function handleCreateEinreichung(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const parsedArt = EinreichungArtSchema.safeParse(formData.get("art"));

  if (!parsedArt.success) {
    return actionResultFromInputParsingError(parsedArt.error);
  }

  try {
    await createEinreichung(authData, verfahrenId, parsedArt.data);

    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.createEinreichungFailed,
    });
  }
}

async function handleUploadWeitereDokument(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const actionData = { formType: UPLOAD_WEITERE_DOKUMENT_FORM_TYPE };
  const parsed = WeitereDokumentUploadSchema.safeParse({
    einreichungId: formData.get("einreichungId"),
    file: formData.get("file"),
    sichtbarkeitAlle: formData.get("sichtbarkeitAlle"),
  });

  if (!parsed.success) {
    return actionResultFromInputParsingError(parsed.error, {
      data: actionData,
    });
  }

  const { einreichungId, file, sichtbarkeitAlle } = parsed.data;

  try {
    await uploadDokument(
      authData,
      verfahrenId,
      einreichungId,
      file,
      "SCHRIFTSTUECK",
      sichtbarkeitAlle,
    );

    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.uploadFailed,
      data: actionData,
    });
  }
}

async function handleDownloadBeleg(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const belegId = formData.get("belegId") as string;

  try {
    const downloadUrl = await fetchBelegDownloadLink(authData, {
      verfahrenId,
      id: belegId,
      dispositionType: "ATTACHMENT",
    });

    return actionSuccess({ downloadUrl });
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.belegDownloadFailed,
    });
  }
}

const formActionHandlers = {
  delete: handleDelete,
  einreichen: handleEinreichen,
  "download-beleg": handleDownloadBeleg,
  "create-einreichung": handleCreateEinreichung,
  [UPLOAD_WEITERE_DOKUMENT_FORM_TYPE]: handleUploadWeitereDokument,
} as const;

// TODO: This action is near-identical to verfahren.neu.$id.abgabe.tsx's
// (same three form types, same underlying calls — both redirect back to
// their own route on success). We're not yet sure what actions should be performed on `verfahren.$id.tsx` and how much of an overlap there is between this route and `verfahren.neu.$id.abgabe.tsx`
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

  return dispatchFormAction(
    formData,
    formActionHandlers,
    { authData, verfahrenId },
    () => redirect(`/verfahren/${verfahrenId}`),
  );
};

export default function VerfahrenId() {
  const {
    verfahren,
    einreichungen,
    draftKlageeinreichung,
    draftWeitereEinreichung,
  } = useLoaderData<LoaderData>();
  const { routes, shared } = useTranslations();

  console.log("einreichungen", einreichungen);

  const createEinreichungFormRef = useRef<HTMLFormElement>(null);
  const [art, setArt] = useState(
    draftWeitereEinreichung?.einreichung.name ?? "",
  );

  function handleArtChange(event: ChangeEvent<HTMLSelectElement>) {
    // Once created, the Art is fixed — picking another one must not create
    // a second Einreichung.
    if (draftWeitereEinreichung) {
      return;
    }

    setArt(event.target.value);
    createEinreichungFormRef.current?.requestSubmit();
  }

  const timelineEinreichungen = einreichungen.filter(
    ({ einreichung }) =>
      einreichung.id !== draftWeitereEinreichung?.einreichung.id,
  );

  const beleg = draftKlageeinreichung?.beleg ?? null;
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;

  const dokumenteValidierungsstatus =
    draftKlageeinreichung?.dokumente.map(
      (dokument) => dokument.validierungsstatus,
    ) ?? [];

  const readinessPresentation = draftKlageeinreichung
    ? resolveReadinessPresentation(
        draftKlageeinreichung.einreichung.einreichungsStatus,
        routes.verfahrenNeu.step3.summary.badgeLabels,
        dokumenteValidierungsstatus,
      )
    : null;
  const isValidating = readinessPresentation?.readinessBadgeClass === "info";

  const validationErgebnis =
    draftKlageeinreichung?.einreichung.einreichungsStatus.ergebnis;
  const hasValidationIssues =
    validationErgebnis === "ROT" || validationErgebnis === "GELB";

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({
      isValidating,
      isBelegPending,
    });

  console.log("draftWeitereEinreichung", draftWeitereEinreichung);

  return (
    <>
      <PageMetadata />

      <div
        className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
      >
        <div className="kern-row">
          <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
            <div className="kern-gap-lg flex flex-col">
              <VerfahrenEinreichungOutcomeBanner
                hasSubmitError={error}
                beleg={beleg}
                isValidating={isValidating}
                hasValidationIssues={hasValidationIssues}
                isValidationErrorFatal={validationErgebnis === "ROT"}
                readinessLabel={readinessPresentation?.readinessLabel ?? ""}
                error={
                  draftKlageeinreichung?.einreichung.einreichungsStatus
                    .fehler ?? []
                }
              />

              <VerfahrenOverviewCard verfahren={verfahren} />

              <section className="space-y-(--kern-metric-space-default)">
                <h3 className="kern-heading-medium">
                  {routes.verfahrenId.headline}
                </h3>
                <VerfahrenTimelineStep
                  timelineLabel={
                    routes.verfahrenNeu.step3.proceduralSteps.einreichung.draft
                  }
                  iconClassName="kern-icon--edit"
                  showConnector={
                    Boolean(draftKlageeinreichung) ||
                    timelineEinreichungen.length > 0
                  }
                >
                  <article className="kern-card">
                    <div className="kern-card__container">
                      <header className="kern-card__header">
                        <h2 className="kern-title">
                          {routes.verfahrenId.weitereEinreichung.headline}
                        </h2>
                      </header>
                      <section className="kern-card__body">
                        <div className="w-full">
                          <Form method="post" ref={createEinreichungFormRef}>
                            <input
                              type="hidden"
                              name="formType"
                              value="create-einreichung"
                            />
                            <InputSelect
                              id="art"
                              label={
                                routes.verfahrenId.weitereEinreichung.artLabel
                              }
                              placeholder={shared.form.select.placeholder}
                              options={EinreichungArtSchema.options.map(
                                (value) => ({ value, label: value }),
                              )}
                              selectedValue={art}
                              onChange={handleArtChange}
                              disabled={Boolean(draftWeitereEinreichung)}
                            />
                          </Form>
                        </div>
                        {draftWeitereEinreichung && (
                          <VerfahrenWeitereEinreichungSection
                            draftWeitereEinreichung={draftWeitereEinreichung}
                          />
                        )}
                      </section>
                    </div>
                  </article>
                </VerfahrenTimelineStep>
                {draftKlageeinreichung ? (
                  <VerfahrenDraftKlageeinreichungSection
                    draftKlageeinreichung={draftKlageeinreichung}
                    verfahren={verfahren}
                    readinessPresentation={readinessPresentation}
                    hasValidationIssues={hasValidationIssues}
                    isValidating={isValidating}
                    isSubmitting={isSubmitting}
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <VerfahrenEinreichungTimeline
                    einreichungen={timelineEinreichungen}
                  />
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
    </>
  );
}
