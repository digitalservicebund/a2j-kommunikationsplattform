import { useRef, useState, type ChangeEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import InputSelect from "~/components/InputSelect";
import { PageMetadata } from "~/components/PageMetadata";
import { resolveReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import VerfahrenAktuelleEinreichungSection, {
  type InitialEinreichungData,
} from "~/components/verfahren/VerfahrenAktuelleEinreichungSection";
import VerfahrenEinreichungHistoryList from "~/components/verfahren/VerfahrenEinreichungHistoryList";
import VerfahrenEinreichungOutcomeBanner from "~/components/verfahren/VerfahrenEinreichungOutcomeBanner";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenOverviewCard from "~/components/verfahren/VerfahrenOverviewCard";
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
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  actionResultFromApiError,
  actionResultFromInputParsingError,
  actionSuccess,
} from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";

type LoaderData = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
  initialEinreichung: InitialEinreichungData | null;
  weitereEinreichung: InitialEinreichungData | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

async function buildInitialEinreichungData(
  authData: AuthenticationResponse,
  verfahrenId: string,
  { einreichung, dokumente }: EinreichungSummary,
): Promise<InitialEinreichungData> {
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

export const loader = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  );

  const weitereEinreichungId = new URL(request.url).searchParams.get(
    "weitereEinreichungId",
  );
  const weitereEinreichungData = weitereEinreichungId
    ? einreichungen.find(
        ({ einreichung }) => einreichung.id === weitereEinreichungId,
      )
    : undefined;
  const weitereEinreichung = weitereEinreichungData
    ? await buildInitialEinreichungData(
        authData,
        verfahrenId,
        weitereEinreichungData,
      )
    : null;

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
    return {
      verfahren,
      einreichungen,
      initialEinreichung: null,
      weitereEinreichung,
    };
  }

  const initialEinreichung = await buildInitialEinreichungData(
    authData,
    verfahrenId,
    initialEinreichungData,
  );

  return { verfahren, einreichungen, initialEinreichung, weitereEinreichung };
};

type FormActionContext = {
  authData: AuthenticationResponse;
  verfahrenId: string;
};

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
    const created = await createEinreichung(
      authData,
      verfahrenId,
      parsedArt.data,
    );

    return redirect(
      `/verfahren/${verfahrenId}?weitereEinreichungId=${created.id}`,
    );
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.createEinreichungFailed,
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
  const { verfahren, einreichungen, initialEinreichung, weitereEinreichung } =
    useLoaderData<LoaderData>();
  const { routes, shared } = useTranslations();

  const createEinreichungFormRef = useRef<HTMLFormElement>(null);
  const [art, setArt] = useState("");

  function handleArtChange(event: ChangeEvent<HTMLSelectElement>) {
    setArt(event.target.value);
    createEinreichungFormRef.current?.requestSubmit();
  }

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
                readinessLabel={readinessPresentation?.readinessLabel ?? ""}
                error={
                  initialEinreichung?.einreichung.einreichungsStatus.fehler ??
                  []
                }
              />

              <VerfahrenOverviewCard verfahren={verfahren} />

              <section className="space-y-(--kern-metric-space-default)">
                <h3 className="kern-heading-medium">
                  {routes.verfahrenId.headline}
                </h3>
                <div className="kern-pb-md flex-1">
                  <article className="kern-card">
                    <div className="kern-card__container">
                      <header className="kern-card__header">
                        <h2 className="kern-title">
                          {routes.verfahrenId.weitereEinreichung.headline}
                        </h2>
                      </header>
                      <section className="kern-card__body">
                        <div className="w-full">
                          {weitereEinreichung ? (
                            <p className="kern-body">
                              „{weitereEinreichung.einreichung.name}“ wurde
                              erstellt (Status:{" "}
                              {weitereEinreichung.einreichung.status}).
                            </p>
                          ) : (
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
                              />
                            </Form>
                          )}
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                      </section>
                    </div>
                  </article>
                </div>
                {initialEinreichung ? (
                  <VerfahrenAktuelleEinreichungSection
                    initialEinreichung={initialEinreichung}
                    verfahren={verfahren}
                    readinessPresentation={readinessPresentation}
                    hasValidationIssues={hasValidationIssues}
                    isValidating={isValidating}
                    isSubmitting={isSubmitting}
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <VerfahrenEinreichungHistoryList
                    einreichungen={einreichungen}
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
