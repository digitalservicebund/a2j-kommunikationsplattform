import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import z from "zod";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import { PageMetadata } from "~/components/PageMetadata";
import { resolveEinreichungPresentation } from "~/components/verfahren/presentation/validierungPresentation";
import VerfahrenDraftKlageeinreichungSection, {
  type EinreichungDetails,
} from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenEinreichungOutcomeBanner from "~/components/verfahren/VerfahrenEinreichungOutcomeBanner";
import VerfahrenEinreichungTimeline from "~/components/verfahren/VerfahrenEinreichungTimeline";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenOverviewCard from "~/components/verfahren/VerfahrenOverviewCard";
import VerfahrenTimelineStep from "~/components/verfahren/VerfahrenTimelineStep";
import { CREATE_EINREICHUNG_FORM_TYPE } from "~/components/verfahren/VerfahrenWeitereEinreichungArtStep";
import VerfahrenWeitereEinreichungSection from "~/components/verfahren/VerfahrenWeitereEinreichungSection";
import {
  type EinreichungDokumentActionContext,
  handleDokumentDelete,
  handleDokumentSichtbarkeit,
  handleDokumentUpload,
} from "~/domains/verfahren/application/einreichungDokumentActions.server";
import loadDokumenteWithValidierungsstatus from "~/domains/verfahren/application/loadDokumenteWithValidierungsstatus.server";
import type { Verfahren } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import loadVerfahrenEinreichungenOverview, {
  EinreichungSummary,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungenOverview.server";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/application/routeContext.server";
import submitEinreichungIfNeeded from "~/domains/verfahren/application/submitEinreichungIfNeeded.server";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import { EinreichungArtSchema } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import {
  fetchBelegDownloadLink,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchGerichtInformation } from "~/domains/verfahren/infrastructure/repositories/gerichtInformationRepository.server";
import { GerichtInformation } from "~/domains/verfahren/infrastructure/schemas/gerichtInformation.schema";
import findEinreichungDraft, {
  sortEinreichungenNewestFirst,
} from "~/domains/verfahren/services/findEinreichungDraft.ts";
import isKlageeinreichung from "~/domains/verfahren/services/isKlageeinreichung";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import { parseActionFormData } from "~/utils/actionInput";
import { actionResultFromApiError, actionSuccess } from "~/utils/actionResult";
import { rethrowApiNotFoundAsRouteError } from "~/utils/apiError";
import { dispatchFormAction } from "~/utils/dispatchFormAction";

type LoaderData = {
  verfahren: Verfahren;
  gerichtInformation: GerichtInformation | null;
  einreichungen: EinreichungSummary[];
  draftKlageeinreichung: EinreichungDetails | null;
  draftWeitereEinreichung: EinreichungDetails | null;
  klageeinreichungBeleg: Beleg | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

async function loadEinreichungDetails(
  authSession: AuthSession,
  verfahrenId: string,
  { einreichung, dokumente }: EinreichungSummary,
): Promise<EinreichungDetails> {
  const dokumenteWithValidierungsstatus =
    await loadDokumenteWithValidierungsstatus(authSession, {
      verfahrenId,
      einreichungId: einreichung.id,
      dokumente,
    });

  const beleg = await fetchLatestBelegForEinreichung(authSession, {
    verfahrenId,
    einreichungId: einreichung.id,
  });

  return { einreichung, dokumente: dokumenteWithValidierungsstatus, beleg };
}

// Once submitted, the Klageeinreichung is no longer a draft, but its Beleg
// (first pending, then ready to download) is still shown in the outcome banner.
async function fetchNewestKlageeinreichungBeleg(
  authSession: AuthSession,
  verfahrenId: string,
  einreichungen: EinreichungSummary[],
): Promise<Beleg | null> {
  const [newestKlageeinreichung] = sortEinreichungenNewestFirst(
    einreichungen.filter(
      ({ einreichung }) =>
        isKlageeinreichung(einreichung) && einreichung.status !== "GELOESCHT",
    ),
  );

  if (!newestKlageeinreichung) {
    return null;
  }

  return fetchLatestBelegForEinreichung(authSession, {
    verfahrenId,
    einreichungId: newestKlageeinreichung.einreichung.id,
  });
}

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authSession, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authSession,
    verfahrenId,
  ).catch(rethrowApiNotFoundAsRouteError);

  const gerichtInformation = verfahren.gericht
    ? await fetchGerichtInformation(authSession, verfahren.gericht.id)
    : null;

  // A draft is an Einreichung that's still open (ERSTELLT/FEHLGESCHLAGEN) —
  // the only statuses in which the API lets Dokumente be changed and the
  // Einreichung be submitted. Once submitted, it's listed in the history.
  const unfinishedKlageeinreichung = findEinreichungDraft(
    einreichungen.filter(({ einreichung }) => isKlageeinreichung(einreichung)),
  );
  const unfinishedWeitereEinreichung = findEinreichungDraft(
    einreichungen.filter(({ einreichung }) => !isKlageeinreichung(einreichung)),
  );

  const [draftKlageeinreichung, draftWeitereEinreichung] = await Promise.all([
    unfinishedKlageeinreichung
      ? loadEinreichungDetails(
          authSession,
          verfahrenId,
          unfinishedKlageeinreichung,
        )
      : null,
    unfinishedWeitereEinreichung
      ? loadEinreichungDetails(
          authSession,
          verfahrenId,
          unfinishedWeitereEinreichung,
        )
      : null,
  ]);

  // The Klageeinreichung's Beleg is shown in the outcome banner — the draft's
  // if there is one, otherwise the one of the submitted Klageeinreichung.
  const klageeinreichungBeleg = draftKlageeinreichung
    ? draftKlageeinreichung.beleg
    : await fetchNewestKlageeinreichungBeleg(
        authSession,
        verfahrenId,
        einreichungen,
      );

  return {
    verfahren,
    gerichtInformation,
    einreichungen,
    draftKlageeinreichung,
    draftWeitereEinreichung,
    klageeinreichungBeleg,
  };
};

type FormActionContext = {
  authSession: AuthSession;
  verfahrenId: string;
};

// The Dokumente of both drafts (Klageeinreichung, Weitere Einreichung) are
// changed in place on this page
function buildDokumentActionContext({
  authSession,
  verfahrenId,
}: FormActionContext): EinreichungDokumentActionContext {
  return { authSession, verfahrenId, redirectTo: `/verfahren/${verfahrenId}` };
}

const EinreichenInputSchema = z.object({
  einreichungId: z.string().min(1),
});

async function handleEinreichen(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const { einreichungId } = parseActionFormData(
    formData,
    EinreichenInputSchema,
    { errorResultData: { formType: "einreichen" } },
  );

  const actionErrorResultData = {
    formType: "einreichen",
    einreichungId,
  };

  try {
    await submitEinreichungIfNeeded(authSession, {
      verfahrenId,
      einreichungId,
    });

    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.einreichungFailed,
      data: actionErrorResultData,
    });
  }
}

const CreateEinreichungInputSchema = z.object({
  art: EinreichungArtSchema,
});

async function handleCreateEinreichung(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const errorResultData = {
    formType: CREATE_EINREICHUNG_FORM_TYPE,
  };

  const { art } = parseActionFormData(formData, CreateEinreichungInputSchema, {
    errorResultData,
  });

  try {
    await createEinreichung(authSession, verfahrenId, art);
    return redirect(`/verfahren/${verfahrenId}`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.createEinreichungFailed,
      data: errorResultData,
    });
  }
}

const BelegDownloadInputSchema = z.object({
  belegId: z.string().min(1),
});

async function handleDownloadBeleg(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const { belegId } = parseActionFormData(formData, BelegDownloadInputSchema, {
    errorResultData: { formType: "downloadBeleg" },
  });

  const errorResultData = {
    formType: "downloadBeleg",
    belegId,
  };

  try {
    const downloadUrl = await fetchBelegDownloadLink(authSession, {
      verfahrenId,
      id: belegId,
      dispositionType: "ATTACHMENT",
    });
    return actionSuccess({ downloadUrl });
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.belegDownloadFailed,
      data: errorResultData,
    });
  }
}

const formActionHandlers = {
  upload: (formData: FormData, context: FormActionContext) =>
    handleDokumentUpload(formData, buildDokumentActionContext(context)),
  delete: (formData: FormData, context: FormActionContext) =>
    handleDokumentDelete(formData, buildDokumentActionContext(context)),
  sichtbarkeit: (formData: FormData, context: FormActionContext) =>
    handleDokumentSichtbarkeit(formData, buildDokumentActionContext(context)),
  einreichen: handleEinreichen,
  "download-beleg": handleDownloadBeleg,
  [CREATE_EINREICHUNG_FORM_TYPE]: handleCreateEinreichung,
} as const;

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const { authSession, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "action",
  );

  const formData = await request.formData();

  return dispatchFormAction(
    formData,
    formActionHandlers,
    { authSession, verfahrenId },
    () => redirect(`/verfahren/${verfahrenId}`),
  );
};

export default function VerfahrenId() {
  const {
    verfahren,
    gerichtInformation,
    einreichungen,
    draftKlageeinreichung,
    draftWeitereEinreichung,
    klageeinreichungBeleg: beleg,
  } = useLoaderData<LoaderData>();
  const t = useTranslations();

  const timelineEinreichungen = einreichungen.filter(
    ({ einreichung }) =>
      einreichung.id !== draftWeitereEinreichung?.einreichung.id,
  );

  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;

  const dokumenteValidierungsstatus =
    draftKlageeinreichung?.dokumente.map(
      (dokument) => dokument.validierungsstatus,
    ) ?? [];

  const validierungPresentation = draftKlageeinreichung
    ? resolveEinreichungPresentation(
        draftKlageeinreichung.einreichung.einreichungsStatus,
        t.routes.verfahrenId.draftKlageeinreichung.summary.badgeLabels,
        dokumenteValidierungsstatus,
      )
    : null;
  const isValidating = validierungPresentation?.loading === true;

  const validationErgebnis =
    draftKlageeinreichung?.einreichung.einreichungsStatus.ergebnis;
  const hasValidationIssues =
    validationErgebnis === "ROT" || validationErgebnis === "GELB";

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({
      isValidating,
      isBelegPending,
    });

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
                label={validierungPresentation?.label ?? ""}
                error={
                  draftKlageeinreichung?.einreichung.einreichungsStatus
                    .fehler ?? []
                }
              />

              <VerfahrenOverviewCard
                verfahren={verfahren}
                gerichtInformation={gerichtInformation}
              />

              <section
                className="space-y-(--kern-metric-space-default)"
                aria-labelledby="verfahren-timeline-heading"
              >
                <h2
                  id="verfahren-timeline-heading"
                  className="kern-heading-medium"
                >
                  {t.routes.verfahrenId.timelineHeading}
                </h2>

                {draftKlageeinreichung ? (
                  <VerfahrenDraftKlageeinreichungSection
                    draftKlageeinreichung={draftKlageeinreichung}
                    verfahren={verfahren}
                    validierungPresentation={validierungPresentation}
                    hasValidationIssues={hasValidationIssues}
                    isValidating={isValidating}
                    isSubmitting={isSubmitting}
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <>
                    <VerfahrenTimelineStep
                      timelineLabel={
                        t.routes.verfahrenId.draftKlageeinreichung
                          .proceduralSteps.einreichung.draft
                      }
                      iconClassName="kern-icon--edit"
                      showConnector={
                        Boolean(draftKlageeinreichung) ||
                        timelineEinreichungen.length > 0
                      }
                    >
                      <VerfahrenWeitereEinreichungSection
                        verfahrenId={verfahren.id}
                        draftWeitereEinreichung={draftWeitereEinreichung}
                      />
                    </VerfahrenTimelineStep>
                    <VerfahrenEinreichungTimeline
                      verfahrenId={verfahren.id}
                      einreichungen={timelineEinreichungen}
                    />
                  </>
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
