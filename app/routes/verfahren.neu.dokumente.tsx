import { data, Link, redirect, useNavigation } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { useRevalidateWhilePending } from "~/components/hooks/useRevalidateWhilePending";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import VerfahrenEinreichungDokumente from "~/components/verfahren/VerfahrenEinreichungDokumente";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import {
  buildKlageeinreichungPath,
  KLAGEEINREICHUNG_PATHS,
} from "~/config/klageeinreichungRoutes";
import {
  buildUploadResultData,
  DokumentUploadInputSchema,
  type EinreichungDokumentActionContext,
  handleDokumentDelete,
  handleDokumentSichtbarkeit,
  handleDokumentUpload,
} from "~/domains/verfahren/application/einreichungDokumentActions.server";
import loadDokumenteWithValidierungsstatus from "~/domains/verfahren/application/loadDokumenteWithValidierungsstatus.server";
import loadKlageeinreichungDraft, {
  readVerfahrenSearchParam,
} from "~/domains/verfahren/application/loadKlageeinreichungDraft.server";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import { KLAGEEINREICHUNG_NAME } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { VERFAHRENSGEGENSTAND_ZAHLUNGSKLAGE } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { uploadDokument } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import { createVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import { safeParseActionFormData } from "~/utils/actionInput";
import { actionError, actionResultFromApiError } from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";
import { logger } from "~/utils/logger.server";
import { Route } from "./+types/verfahren.neu.dokumente";

// Marks a failed first upload: the Verfahren was created regardless, so the
// page continues with it instead of creating another one on retry
const UPLOAD_FAILED_PARAM = "uploadFehlgeschlagen";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export async function loader({ request, context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const { searchParams } = new URL(request.url);
  const verfahrenId = readVerfahrenSearchParam(searchParams);

  if (verfahrenId) {
    const { einreichung, dokumente } = await loadKlageeinreichungDraft(
      authSession,
      verfahrenId,
    );

    return {
      verfahrenId,
      einreichung: { id: einreichung.id, name: einreichung.name },
      dokumente: await loadDokumenteWithValidierungsstatus(authSession, {
        verfahrenId,
        einreichungId: einreichung.id,
        dokumente: dokumente.filter(({ typ }) => typ !== "XJUSTIZ"),
      }),
      uploadFailed: searchParams.has(UPLOAD_FAILED_PARAM),
    };
  }

  // Without a Verfahren, the first upload creates one for the selected court
  const gerichtId = searchParams.get("gericht");
  const { elemente: gerichte } = await fetchGerichte(authSession);

  if (!gerichte.some(({ id }) => id === gerichtId)) {
    throw redirect(KLAGEEINREICHUNG_PATHS.gerichtAuswahl);
  }

  return {
    verfahrenId: undefined,
    einreichung: undefined,
    dokumente: [],
    uploadFailed: false,
  };
}

type FormActionContext = {
  authSession: AuthSession;
  verfahrenId: string | undefined;
  gerichtId: string | undefined;
};

function invalidSubmissionResponse() {
  return data(actionError(de.shared.form.errors.invalidSubmission), {
    status: 400,
  });
}

// The first upload creates the Verfahren for the court from the URL and its
// Klageeinreichung, then uploads the Dokument to it
async function handleFirstUpload(
  formData: FormData,
  authSession: AuthSession,
  gerichtId: string,
) {
  const actionResultData = buildUploadResultData(formData);

  const input = safeParseActionFormData(formData, DokumentUploadInputSchema, {
    errorResultData: actionResultData,
  });

  if (!input.success) {
    return input.error;
  }

  const { typ, file } = input.data;
  let verfahrenId: string;
  let einreichungId: string;

  try {
    const verfahren = await createVerfahren(
      authSession,
      VerfahrenAendernInputSchema.parse({
        verfahrensgegenstand: VERFAHRENSGEGENSTAND_ZAHLUNGSKLAGE,
        kurzrubrum: null,
        gerichtId,
        beteiligungen: null,
      }),
    );
    verfahrenId = verfahren.id;

    const einreichung = await createEinreichung(
      authSession,
      verfahrenId,
      KLAGEEINREICHUNG_NAME,
    );
    einreichungId = einreichung.id;
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.uploadFailed,
      data: actionResultData,
    });
  }

  const dokumentePath = buildKlageeinreichungPath("dokumente", {
    verfahren: verfahrenId,
  });

  try {
    await uploadDokument(authSession, verfahrenId, einreichungId, file, typ);
  } catch (error) {
    // The Verfahren was just created: continue with it, so that a retry
    // doesn't create yet another one
    logger.error({ error }, "Dokument upload failed for a new Verfahren");
    return redirect(`${dokumentePath}&${UPLOAD_FAILED_PARAM}`);
  }

  return redirect(dokumentePath);
}

function buildDokumentActionContext(
  authSession: AuthSession,
  verfahrenId: string,
): EinreichungDokumentActionContext {
  return {
    authSession,
    verfahrenId,
    redirectTo: buildKlageeinreichungPath("dokumente", {
      verfahren: verfahrenId,
    }),
    // This step is where the Klageschrift is replaced
    allowSchriftstueck: true,
  };
}

const formActionHandlers = {
  upload: (
    formData: FormData,
    { authSession, verfahrenId, gerichtId }: FormActionContext,
  ) => {
    if (verfahrenId) {
      return handleDokumentUpload(
        formData,
        buildDokumentActionContext(authSession, verfahrenId),
      );
    }

    return gerichtId
      ? handleFirstUpload(formData, authSession, gerichtId)
      : invalidSubmissionResponse();
  },
  delete: (
    formData: FormData,
    { authSession, verfahrenId }: FormActionContext,
  ) =>
    verfahrenId
      ? handleDokumentDelete(
          formData,
          buildDokumentActionContext(authSession, verfahrenId),
        )
      : invalidSubmissionResponse(),
  sichtbarkeit: (
    formData: FormData,
    { authSession, verfahrenId }: FormActionContext,
  ) =>
    verfahrenId
      ? handleDokumentSichtbarkeit(
          formData,
          buildDokumentActionContext(authSession, verfahrenId),
        )
      : invalidSubmissionResponse(),
} as const;

export const action = async ({ request, context }: Route.ActionArgs) => {
  const authSession = requireAuthSession(context, "action");

  const formData = await request.formData();
  const { searchParams } = new URL(request.url);

  return dispatchFormAction(
    formData,
    formActionHandlers,
    {
      authSession,
      verfahrenId: readVerfahrenSearchParam(searchParams),
      gerichtId: searchParams.get("gericht") ?? undefined,
    },
    invalidSubmissionResponse,
  );
};

export default function VerfahrenNeuDokumente({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { verfahrenId, einreichung, dokumente, uploadFailed } = loaderData;

  const { shared, routes, buttons } = useTranslations();
  const navigation = useNavigation();
  const isBusy = navigation.state !== "idle";

  // Keep the badges up to date while e.g. the virus check is running
  useRevalidateWhilePending(
    dokumente.some(({ validierungsstatus }) =>
      isValidierungslaufRunning(validierungsstatus),
    ),
  );

  // Upload and delete errors are shown next to the section or Dokument they
  // belong to; anything else (e.g. an invalid submission) up here
  const formType = actionData?.data?.formType;
  const isError =
    actionData?.status === "error" &&
    formType !== "upload" &&
    formType !== "delete";

  const hasKlageschrift = dokumente.some(({ typ }) => typ === "SCHRIFTSTUECK");
  const nextLabel = (
    <>
      <span className="kern-label">
        {routes.verfahrenNeu.dokumente.navigation.next}
      </span>
      <span
        className="kern-icon kern-icon--arrow-forward"
        aria-hidden="true"
      ></span>
    </>
  );

  return (
    <>
      <PageMetadata />

      <div
        className={`${isBusy ? "pointer-events-none opacity-50" : ""} relative`}
      >
        <div className="kern-row">
          <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
            <h1 className="kern-heading-large">
              {routes.verfahrenNeu.dokumente.headline}
            </h1>
            <Progress
              id="progress-1"
              label={routes.verfahrenNeu.dokumente.progress}
              value={1}
              max={3}
            />

            <div className="kern-pt-xl kern-gap-lg flex flex-col">
              <div>
                <h2 className="kern-heading-medium">
                  {routes.verfahrenNeu.dokumente.subline}
                </h2>
                <p className="kern-body">
                  {routes.verfahrenNeu.dokumente.intro}
                </p>
              </div>

              {isError && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={actionData?.error ?? shared.form.submit.message}
                />
              )}

              {!isError && uploadFailed && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={shared.form.errors.uploadFailed}
                />
              )}

              <VerfahrenEinreichungDokumente
                verfahrenId={verfahrenId}
                einreichung={einreichung}
                dokumente={dokumente}
                schriftstueckLabel={
                  routes.verfahrenNeu.dokumente.schriftstueckLabel
                }
                allowSchriftstueck
                disabled={isBusy}
              />

              <div className="kern-gap-md flex flex-wrap justify-end">
                <Link
                  to={KLAGEEINREICHUNG_PATHS.gerichtAuswahl}
                  className="kern-btn kern-btn--secondary"
                >
                  <span className="kern-label">{buttons.prev}</span>
                </Link>
                {verfahrenId && hasKlageschrift ? (
                  <Link
                    to={buildKlageeinreichungPath("verfahrendetails", {
                      verfahren: verfahrenId,
                    })}
                    className="kern-btn kern-btn--primary"
                  >
                    {nextLabel}
                  </Link>
                ) : (
                  // aria-disabled keeps it focusable and announced, as KERN
                  // recommends over disabled
                  <Button appearance="primary" type="button" aria-disabled>
                    {nextLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <VerfahrenLoader active={isBusy} label={shared.loading} />
      </div>
    </>
  );
}
