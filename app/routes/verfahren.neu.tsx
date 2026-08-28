import { useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenStatementOfClaimUploadFields from "~/components/verfahren/VerfahrenStatementOfClaimUploadFields";
import VerfahrenUploadedDokumentSummary from "~/components/verfahren/VerfahrenUploadedDokumentSummary";
import { requireAuthData } from "~/domains/verfahren/application/routeContext.server";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
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
import { useTranslations } from "~/services/translations/context";

const StatementOfClaimUploadSchema = z.object({
  file: z.file(),
  verfahrensgegenstand: z.string().min(1),
  gerichtId: z.string().min(1),
  analysis: z.coerce.boolean().optional(),
});

// this route requires users to be logged in
export const middleware = [authMiddleware];

function getVerfahrenContextFromUrl(url: URL): {
  verfahrenId?: string;
  einreichungId?: string;
} {
  const verfahrenId = url.searchParams.get("verfahrenId");
  const einreichungId = url.searchParams.get("einreichungId");

  return {
    verfahrenId: typeof verfahrenId === "string" ? verfahrenId : undefined,
    einreichungId:
      typeof einreichungId === "string" ? einreichungId : undefined,
  };
}

function buildRouteUrl(verfahrenId: string, einreichungId: string): string {
  const params = new URLSearchParams({ verfahrenId, einreichungId });
  return `/verfahren/neu?${params.toString()}`;
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authData = requireAuthData(context, "loader");

  const url = new URL(request.url);
  const { verfahrenId, einreichungId } = getVerfahrenContextFromUrl(url);

  const gerichtePromise = (async () => {
    const { elemente } = await fetchGerichte(authData);

    return elemente;
  })();

  if (!verfahrenId || !einreichungId) {
    return {
      verfahrenId: undefined,
      einreichungId: undefined,
      uploadedDokument: undefined,
      gerichtePromise,
    };
  }

  const { elemente: dokumente } = await fetchDokumente(authData, {
    verfahrenId,
    einreichungId,
  });
  const uploadedDokument = dokumente.at(0);

  return { verfahrenId, einreichungId, uploadedDokument, gerichtePromise };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authData = requireAuthData(context, "action");

  const formData = await request.formData();
  const formType = formData.get("formType");
  const url = new URL(request.url);
  const urlContext = getVerfahrenContextFromUrl(url);

  const submittedVerfahrenId = formData.get("verfahrenId");
  const submittedEinreichungId = formData.get("einreichungId");

  const existingVerfahrenId =
    typeof submittedVerfahrenId === "string"
      ? submittedVerfahrenId
      : urlContext.verfahrenId;
  const existingEinreichungId =
    typeof submittedEinreichungId === "string"
      ? submittedEinreichungId
      : urlContext.einreichungId;

  // 1) Handle delete flow for an already uploaded document
  if (formType === "delete") {
    const verfahrenId = formData.get("verfahrenId");
    const einreichungId = formData.get("einreichungId");
    const dokumentId = formData.get("dokumentId");

    if (
      typeof verfahrenId !== "string" ||
      typeof einreichungId !== "string" ||
      typeof dokumentId !== "string"
    ) {
      return { error: true };
    }

    const { eTag } = await fetchDokument(authData, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
    });

    const deleteResult = await deleteDokument(authData, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
      eTag: eTag ?? "",
    });

    if (!deleteResult.success) {
      return { error: true, verfahrenId, einreichungId };
    }

    return redirect(buildRouteUrl(verfahrenId, einreichungId));
  }

  // 2) Guard unsupported form submissions
  if (formType !== "submit") {
    return { error: true };
  }

  // 3) If a draft already has uploads, continue in edit route
  if (existingVerfahrenId && existingEinreichungId) {
    const { elemente: dokumente } = await fetchDokumente(authData, {
      verfahrenId: existingVerfahrenId,
      einreichungId: existingEinreichungId,
    });

    if (dokumente.length > 0) {
      return redirect(`/verfahren/neu/${existingVerfahrenId}/bearbeiten`);
    }
  }

  const formValues = Object.fromEntries(formData);
  const validatedForm = StatementOfClaimUploadSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return { errors: z.flattenError(validatedForm.error), formValues };
  }

  const { file, verfahrensgegenstand, gerichtId } = validatedForm.data;

  // 4) Ensure verfahren/einreichung exist (create on first submit)
  let verfahrenId = existingVerfahrenId;
  let einreichungId = existingEinreichungId;

  if (!verfahrenId || !einreichungId) {
    const verfahrenPayload = VerfahrenAendernInputSchema.parse({
      verfahrensgegenstand,
      kurzrubrum: null,
      gerichtId,
      beteiligungen: null,
    });
    const verfahren = await createVerfahren(authData, verfahrenPayload);
    verfahrenId = verfahren.id;
    const einreichung = await createEinreichung(authData, verfahrenId);
    einreichungId = einreichung.id;
  }

  await uploadDokument(
    authData,
    verfahrenId,
    einreichungId,
    file,
    "SCHRIFTSTUECK",
  );

  // 5) Continue to bearbeiten step
  return redirect(`/verfahren/neu/${verfahrenId}/bearbeiten`);
};

export default function VerfahrenNeu() {
  const { shared, routes, buttons } = useTranslations();
  const navigation = useNavigation();
  const actionData = useActionData() || {};
  const loaderData = useLoaderData<typeof loader>();
  const { errors, formValues } = actionData;
  const [selectedGerichtId, setSelectedGerichtId] = useState<string>(
    (formValues?.gerichtId as string) || "",
  );

  const isSubmitting = navigation.state !== "idle";
  const uploadedDokument = loaderData?.uploadedDokument as Dokument | undefined;
  const verfahrenId = loaderData?.verfahrenId as string | undefined;
  const einreichungId = loaderData?.einreichungId as string | undefined;
  const hasUploadedDokument = Boolean(
    uploadedDokument && verfahrenId && einreichungId,
  );

  return (
    <div
      className={`${isSubmitting ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
          <h1 className="kern-heading-large">
            {routes.verfahrenNeu.step1.headline}
          </h1>
          <div className="kern-progress">
            <label className="kern-label" htmlFor="progress1">
              {routes.verfahrenNeu.step1.progress}
            </label>
            <progress id="progress-1" value="1" max="3"></progress>
          </div>
          <div className="pt-kern-space-x-large">
            <div className="border-kern-layout-border p-kern-space-large rounded-kern-default kern-gap-lg flex flex-col border">
              <h2 className="kern-heading-medium">
                {routes.verfahrenNeu.step1.subline}
              </h2>

              <Alert
                type="info"
                title="Vorläufige Ansicht"
                message="Diese Seite ist ein vorläufiger Prototyp zur API-Validierung. Das endgültige Design folgt."
              />

              {/* show a general error alert, if something went wrong */}
              {actionData?.error && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={shared.form.submit.message}
                />
              )}

              <p className="kern-body">{routes.verfahrenNeu.step1.intro}</p>

              <Form
                method="post"
                encType="multipart/form-data"
                className="relative"
              >
                <div className="kern-gap-xl flex flex-col">
                  {hasUploadedDokument ? (
                    <VerfahrenUploadedDokumentSummary
                      uploadedDokument={uploadedDokument}
                      verfahrenId={verfahrenId}
                      einreichungId={einreichungId}
                      isSubmitting={isSubmitting}
                    />
                  ) : (
                    <VerfahrenStatementOfClaimUploadFields
                      hasFileError={Boolean(errors?.fieldErrors?.file)}
                      gerichtePromise={loaderData.gerichtePromise}
                      selectedGerichtId={selectedGerichtId}
                      onGerichtIdChange={setSelectedGerichtId}
                    />
                  )}

                  <fieldset
                    className={`${isSubmitting ? "pointer-events-none" : ""} kern-fieldset`}
                    aria-describedby="enable-analysis-hint"
                  >
                    <div className="kern-hint" id="enable-analysis-hint">
                      {routes.verfahrenNeu.step1.analysis.hint}
                    </div>
                    <div className="kern-fieldset__body">
                      <div className="kern-form-check">
                        <input
                          className="kern-form-check__checkbox"
                          id="enable-analysis"
                          name="analysis"
                          type="checkbox"
                        />
                        <label className="kern-label" htmlFor="enable-analysis">
                          {routes.verfahrenNeu.step1.analysis.label}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div className="gap-kern-space-default flex flex-wrap">
                    {hasUploadedDokument && (
                      <>
                        <input
                          type="hidden"
                          name="verfahrenId"
                          value={verfahrenId}
                        />
                        <input
                          type="hidden"
                          name="einreichungId"
                          value={einreichungId}
                        />
                      </>
                    )}
                    <Link
                      to="/"
                      className={`${isSubmitting ? "pointer-events-none" : ""} kern-btn kern-btn--secondary`}
                    >
                      <span className="kern-label">{buttons.prev}</span>
                    </Link>
                    <button
                      type="submit"
                      name="formType"
                      value="submit"
                      className="kern-btn kern-btn--primary"
                      disabled={isSubmitting}
                    >
                      <span className="kern-label">
                        {routes.verfahrenNeu.step1.navigation.next}
                      </span>
                      <span
                        className="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <VerfahrenLoader active={isSubmitting} label={shared.loading} />
    </div>
  );
}
