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
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import createEinreichung from "~/domains/verfahren/createEinreichung.server";
import createVerfahren from "~/domains/verfahren/createVerfahren.server";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchDokument from "~/domains/verfahren/fetchDokument";
import fetchDokumente from "~/domains/verfahren/fetchDokumente";
import { DokumentTypeSchema } from "~/domains/verfahren/schemas/dokumentSchema";
import uploadDokument, {
  type Dokument,
  type DokumentType,
} from "~/domains/verfahren/uploadDokument.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

const StatementOfClaimUploadSchema = z.object({
  type: DokumentTypeSchema,
  file: z.file(),
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
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const url = new URL(request.url);
  const { verfahrenId, einreichungId } = getVerfahrenContextFromUrl(url);

  if (!verfahrenId || !einreichungId) {
    return {
      verfahrenId: undefined,
      einreichungId: undefined,
      uploadedDokument: undefined,
    };
  }

  const dokumente = (await fetchDokumente(authData, {
    verfahrenId,
    einreichungId,
  })) as Dokument[];
  const uploadedDokument = dokumente.at(0);

  return { verfahrenId, einreichungId, uploadedDokument };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in action");
  }

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

  if (formType !== "submit") {
    return { error: true };
  }

  if (existingVerfahrenId && existingEinreichungId) {
    const dokumente = (await fetchDokumente(authData, {
      verfahrenId: existingVerfahrenId,
      einreichungId: existingEinreichungId,
    })) as Dokument[];

    if (dokumente.length > 0) {
      return redirect(`/verfahren/neu/${existingVerfahrenId}/bearbeiten`);
    }
  }

  const formValues = Object.fromEntries(formData);
  const validatedForm = StatementOfClaimUploadSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return { errors: z.flattenError(validatedForm.error), formValues };
  }

  const file = formData.get("file") as File;
  const type = formData.get("type") as DokumentType;
  const dokumentType = type;

  let verfahrenId = existingVerfahrenId;
  let einreichungId = existingEinreichungId;

  if (!verfahrenId || !einreichungId) {
    const verfahren = await createVerfahren(authData);
    verfahrenId = verfahren.id;
    const einreichung = await createEinreichung(authData, verfahrenId);
    einreichungId = einreichung.id;
  }

  await uploadDokument(
    authData,
    verfahrenId,
    einreichungId,
    file,
    dokumentType,
  );

  return redirect(`/verfahren/neu/${verfahrenId}/bearbeiten`);
};

export default function VerfahrenNeu() {
  const { shared, routes, buttons } = useTranslations();
  const navigation = useNavigation();
  const actionData = useActionData() || {};
  const loaderData = useLoaderData<typeof loader>();
  const { errors, formValues } = actionData;
  const [selectedDokumentType, setSelectedDokumentType] = useState<string>(
    (formValues?.type as string) || "",
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
        <div className="kern-col-12 kern-col-xl-8 kern-col-xl-offset-2">
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
                    <div className="gap-kern-space-default flex w-full flex-col">
                      <div className="p-kern-space-default align-center gap-kern-space-default rounded-kern-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)">
                        <div className="flex-1">
                          <div className="kern-body kern-body--bold">
                            {uploadedDokument?.name}
                          </div>

                          <div className="kern-body kern-body--small">
                            {Number.parseFloat(
                              (
                                (uploadedDokument?.size_in_bytes ?? 0) / 1000
                              ).toString(),
                            ).toFixed(2)}{" "}
                            KB
                          </div>
                        </div>

                        <div className="flex items-center">
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
                          <input
                            type="hidden"
                            name="dokumentId"
                            value={uploadedDokument?.id}
                          />
                          <button
                            className="kern-btn kern-btn--secondary kern-btn--x-small"
                            type="submit"
                            name="formType"
                            value="delete"
                            disabled={isSubmitting}
                          >
                            <span
                              className="kern-icon kern-icon--delete"
                              aria-hidden="true"
                            ></span>
                            <span className="kern-label">
                              {shared.form.deleteDokument.label}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={
                          errors?.fieldErrors?.file
                            ? "kern-form-input--error kern-form-input"
                            : "kern-form-input"
                        }
                      >
                        <label className="kern-label" htmlFor="file">
                          {shared.form.uploadDokument.label}
                        </label>
                        <div className="kern-hint" id="input-file-hint">
                          {shared.form.uploadDokument.hint}
                        </div>
                        <input
                          className={
                            errors?.fieldErrors?.file
                              ? "kern-form-input__input kern-form-input__input--error"
                              : "kern-form-input__input"
                          }
                          id="file"
                          name="file"
                          type="file"
                          aria-describedby={
                            errors?.fieldErrors?.file
                              ? "input-file-hint file-input-error"
                              : "input-file-hint"
                          }
                          required={!hasUploadedDokument}
                        />
                        {errors?.fieldErrors?.file && (
                          <p className="kern-error" id="file-input-error">
                            <span
                              className="kern-icon kern-icon--danger kern-icon--md"
                              aria-hidden="true"
                            ></span>
                            <span className="kern-body">
                              {shared.form.uploadDokument.error}
                            </span>
                          </p>
                        )}
                      </div>

                      <VerfahrenDokumentTypeSelect
                        label={shared.form.selectDokumentType.label}
                        id="type"
                        required
                        placeholder={shared.form.select.placeholder}
                        onChange={(e) =>
                          setSelectedDokumentType(e.target.value)
                        }
                        selectedValue={selectedDokumentType}
                        hint={shared.form.selectDokumentType.hint}
                        error={
                          errors?.fieldErrors?.type &&
                          selectedDokumentType === "" &&
                          shared.form.selectDokumentType.error
                        }
                      />
                    </>
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
      {isSubmitting && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
          <div className="kern-loader kern-loader--visible">
            <span className="kern-sr-only">{shared.loading}</span>
          </div>
        </div>
      )}
    </div>
  );
}
