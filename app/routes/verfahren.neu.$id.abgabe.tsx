import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import { resolveReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import { DokumentWithValidierungsstatus } from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenDraftKlageeinreichungSection from "~/components/verfahren/VerfahrenDraftKlageeinreichungSection";
import VerfahrenEinreichungOutcomeBanner from "~/components/verfahren/VerfahrenEinreichungOutcomeBanner";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenOverviewCard from "~/components/verfahren/VerfahrenOverviewCard";
import VerfahrenPrototypeHint from "~/components/verfahren/VerfahrenPrototypeHint.static";
import loadVerfahrenEinreichungBundle, {
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/application/routeContext.server";
import submitEinreichungIfNeeded from "~/domains/verfahren/application/submitEinreichungIfNeeded.server";
import { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import {
  fetchBelegDownloadLink,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  deleteDokumentFromEinreichung,
  fetchDokumentValidierungsstatus,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  actionErrorResponse,
  actionResultFromApiError,
  actionSuccess,
} from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";

type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authSession, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );
  const { verfahren, einreichung, dokumente } =
    await loadVerfahrenEinreichungBundle(authSession, verfahrenId);

  const dokumenteWithValidierungsstatus = await Promise.all(
    dokumente.map(async (dokument) => {
      const validierungsstatus = await fetchDokumentValidierungsstatus(
        authSession,
        {
          verfahrenId,
          einreichungId: einreichung.id,
          id: dokument.id,
        },
      );

      return { ...dokument, validierungsstatus };
    }),
  );

  const beleg = await fetchLatestBelegForEinreichung(authSession, {
    verfahrenId,
    einreichungId: einreichung.id,
  });

  return {
    verfahren,
    einreichung,
    dokumente: dokumenteWithValidierungsstatus,
    beleg,
  };
};

type FormActionContext = {
  authSession: AuthSession;
  verfahrenId: string;
};

async function handleDelete(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const actionData = {
    formType: "delete",
    dokumentId: String(formData.get("dokumentId")),
  };

  try {
    const deleteResult = await deleteDokumentFromEinreichung({
      authSession,
      verfahrenId,
      einreichungId: formData.get("einreichungId"),
      dokumentId: formData.get("dokumentId"),
    });

    if (deleteResult.status === "invalid-form-data") {
      return redirect(`/verfahren/${verfahrenId}`);
    }

    if (deleteResult.status === "protected-dokument") {
      return actionErrorResponse(de.shared.form.errors.deleteFailed, {
        data: actionData,
        status: 403,
      });
    }

    if (deleteResult.status === "delete-failed") {
      return actionErrorResponse(de.shared.form.errors.deleteFailed, {
        data: actionData,
        status: 500,
      });
    }

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.deleteFailed,
      data: actionData,
    });
  }
}

async function handleEinreichen(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const einreichungId = formData.get("einreichungId") as string;

  try {
    await submitEinreichungIfNeeded(authSession, {
      verfahrenId,
      einreichungId,
    });

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.einreichungFailed,
    });
  }
}

async function handleDownloadBeleg(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const belegId = formData.get("belegId") as string;

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
    });
  }
}

const formActionHandlers = {
  delete: handleDelete,
  einreichen: handleEinreichen,
  "download-beleg": handleDownloadBeleg,
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

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, beleg } =
    useLoaderData<LoaderData>();
  const { routes, buttons } = useTranslations();

  const dokumenteValidierungsstatus = dokumente.map(
    (dokument) => dokument.validierungsstatus,
  );

  const readinessPresentation = resolveReadinessPresentation(
    einreichung.einreichungsStatus,
    routes.verfahrenNeu.step3.summary.badgeLabels,
    dokumenteValidierungsstatus,
  );
  const { readinessLabel, readinessBadgeClass } = readinessPresentation;
  const isValidating = readinessBadgeClass === "info";
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;

  const validationErgebnis = einreichung.einreichungsStatus.ergebnis;
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
            <h1 className="kern-heading-large">
              {routes.verfahrenNeu.step3.headline}
            </h1>
            <Progress
              id="progress-3"
              label={routes.verfahrenNeu.step3.progress}
              value={3}
              max={3}
            />
            <div className="kern-pt-xl">
              <div className="kern-gap-lg flex flex-col">
                <div className="kern-gap-md flex flex-col lg:flex-row">
                  <div>
                    <h2 className="kern-heading-medium">
                      {routes.verfahrenNeu.step3.subline}
                    </h2>
                  </div>
                  {beleg === null && (
                    <div className="kern-justify-content-end flex grow">
                      <div className="kern-gap-md flex">
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
                  )}
                </div>

                <VerfahrenPrototypeHint />

                <VerfahrenEinreichungOutcomeBanner
                  hasSubmitError={error}
                  beleg={beleg}
                  isValidating={isValidating}
                  hasValidationIssues={hasValidationIssues}
                  isValidationErrorFatal={validationErgebnis === "ROT"}
                  readinessLabel={readinessLabel}
                  error={einreichung.einreichungsStatus.fehler}
                />

                <VerfahrenOverviewCard verfahren={verfahren} />

                <section className="space-y-(--kern-metric-space-default)">
                  <h3 className="kern-heading-medium">
                    {routes.verfahrenNeu.step3.proceduralSteps.headline}
                  </h3>
                  <VerfahrenDraftKlageeinreichungSection
                    draftKlageeinreichung={{
                      einreichung,
                      dokumente,
                      beleg,
                    }}
                    verfahren={verfahren}
                    readinessPresentation={readinessPresentation}
                    hasValidationIssues={hasValidationIssues}
                    isValidating={isValidating}
                    isSubmitting={isSubmitting}
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                  />
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
    </>
  );
}
