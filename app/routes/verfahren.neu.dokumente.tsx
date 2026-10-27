import { data, Link, redirect, useNavigation } from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import VerfahrenDokumentUploadBox from "~/components/verfahren/VerfahrenDokumentUploadBox";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import {
  buildKlageeinreichungPath,
  KLAGEEINREICHUNG_PATHS,
} from "~/config/klageeinreichungRoutes";
import loadKlageeinreichungDraft, {
  readVerfahrenSearchParam,
} from "~/domains/verfahren/application/loadKlageeinreichungDraft.server";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import {
  type UploadDokumentType,
  UploadDokumentTypeSchema,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { KLAGEEINREICHUNG_NAME } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { VERFAHRENSGEGENSTAND_ZAHLUNGSKLAGE } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  deleteDokument,
  fetchDokument,
  fetchDokumente,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import { createVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import { safeParseActionFormData } from "~/utils/actionInput";
import { actionError, actionResultFromApiError } from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";
import { logger } from "~/utils/logger.server";
import { Route } from "./+types/verfahren.neu.dokumente";

// One upload box per type, starting with the Klageschrift
const UPLOAD_BOXES: readonly {
  typ: UploadDokumentType;
  single?: boolean;
  accept?: string;
}[] = [
  {
    typ: "SCHRIFTSTUECK",
    single: true,
    accept: [
      // Word
      ".docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // PDF
      ".pdf",
      "application/pdf",
    ].join(","),
  },
  { typ: "ANHANG" },
  { typ: "SIGNATURDATEI" },
];

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
      einreichungId: einreichung.id,
      dokumente: dokumente.filter(({ typ }) => typ !== "XJUSTIZ"),
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
    einreichungId: undefined,
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

const DokumentUploadInputSchema = z.object({
  einreichungId: z.string().optional(),
  typ: UploadDokumentTypeSchema,
  file: z.file().min(1),
});

// Uploads a Dokument. Without an existing Verfahren, the Verfahren for the
// court from the URL and its Klageeinreichung are created first.
async function handleUploadAction(
  formData: FormData,
  { authSession, verfahrenId, gerichtId }: FormActionContext,
) {
  const actionResultData = {
    formType: "upload",
    typ: formData.get("typ"),
  } as const;

  const input = safeParseActionFormData(formData, DokumentUploadInputSchema, {
    errorResultData: actionResultData,
  });

  if (!input.success) {
    return input.error;
  }

  const { typ, file } = input.data;
  let { einreichungId } = input.data;
  let targetVerfahrenId = verfahrenId;

  if (!targetVerfahrenId) {
    if (!gerichtId) {
      return invalidSubmissionResponse();
    }

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
      targetVerfahrenId = verfahren.id;

      const einreichung = await createEinreichung(
        authSession,
        targetVerfahrenId,
        KLAGEEINREICHUNG_NAME,
      );
      einreichungId = einreichung.id;
    } catch (error) {
      return actionResultFromApiError(error, {
        message: de.shared.form.errors.uploadFailed,
        data: actionResultData,
      });
    }
  }

  if (!einreichungId) {
    return invalidSubmissionResponse();
  }

  const dokumentePath = buildKlageeinreichungPath("dokumente", {
    verfahren: targetVerfahrenId,
  });

  // The page only offers one Klageschrift, but e.g. a second tab could still
  // submit another one
  if (verfahrenId && typ === "SCHRIFTSTUECK") {
    try {
      const { elemente: dokumente } = await fetchDokumente(authSession, {
        verfahrenId,
        einreichungId,
      });

      if (dokumente.some((dokument) => dokument.typ === "SCHRIFTSTUECK")) {
        return data(
          actionError(
            de.routes.verfahrenNeu.dokumente.errors.klageschriftExists,
            { data: actionResultData },
          ),
          { status: 409 },
        );
      }
    } catch (error) {
      return actionResultFromApiError(error, {
        message: de.shared.form.errors.uploadFailed,
        data: actionResultData,
      });
    }
  }

  try {
    await uploadDokument(
      authSession,
      targetVerfahrenId,
      einreichungId,
      file,
      typ,
    );
  } catch (error) {
    // The Verfahren was just created: continue with it, so that a retry
    // doesn't create yet another one
    if (!verfahrenId) {
      logger.error({ error }, "Dokument upload failed for a new Verfahren");
      return redirect(`${dokumentePath}&${UPLOAD_FAILED_PARAM}`);
    }

    return actionResultFromApiError(error, {
      message: de.shared.form.errors.uploadFailed,
      data: actionResultData,
    });
  }

  return redirect(dokumentePath);
}

const DokumentDeletionInputSchema = z.object({
  einreichungId: z.string().min(1),
  dokumentId: z.string().min(1),
});

async function handleDeleteAction(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const actionResultData = { formType: "delete" } as const;

  if (!verfahrenId) {
    return invalidSubmissionResponse();
  }

  const input = safeParseActionFormData(formData, DokumentDeletionInputSchema, {
    errorResultData: actionResultData,
  });

  if (!input.success) {
    return input.error;
  }

  const { einreichungId, dokumentId } = input.data;

  try {
    const { eTag } = await fetchDokument(authSession, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
    });

    const deleteResult = await deleteDokument(authSession, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
      eTag: eTag ?? "",
    });

    if (!deleteResult.success) {
      return data(
        actionError(de.shared.form.errors.deleteFailed, {
          data: actionResultData,
        }),
        { status: 500 },
      );
    }
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.deleteFailed,
      data: actionResultData,
    });
  }

  return redirect(
    buildKlageeinreichungPath("dokumente", { verfahren: verfahrenId }),
  );
}

const formActionHandlers = {
  upload: handleUploadAction,
  delete: handleDeleteAction,
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
  const { verfahrenId, einreichungId, dokumente, uploadFailed } = loaderData;

  const { shared, routes, buttons } = useTranslations();
  const navigation = useNavigation();
  const isBusy = navigation.state !== "idle";

  const isError = actionData?.status === "error";
  const invalidUploadTyp =
    actionData?.status === "invalid" && actionData.data?.formType === "upload"
      ? actionData.data.typ
      : undefined;

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
                  message={actionData.error ?? shared.form.submit.message}
                />
              )}

              {!isError && uploadFailed && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={shared.form.errors.uploadFailed}
                />
              )}

              {UPLOAD_BOXES.map(({ typ, single, accept }) => (
                <VerfahrenDokumentUploadBox
                  key={typ}
                  typ={typ}
                  dokumente={dokumente.filter(
                    (dokument) => dokument.typ === typ,
                  )}
                  einreichungId={einreichungId}
                  single={single}
                  accept={accept}
                  disabled={isBusy}
                  showFileError={invalidUploadTyp === typ}
                />
              ))}

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
