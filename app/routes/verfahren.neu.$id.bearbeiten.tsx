import { Suspense, useEffect, useRef, useState } from "react";
import {
  ActionFunctionArgs,
  Await,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import VerfahrenGerichteSelect from "~/components/verfahren/VerfahrenGerichteSelect";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchDokument from "~/domains/verfahren/fetchDokument";
import fetchDokumente from "~/domains/verfahren/fetchDokumente";
import fetchEinreichungById from "~/domains/verfahren/fetchEinreichungById.server";
import fetchEinreichungenById from "~/domains/verfahren/fetchEinreichungenById.server";
import fetchEinreichungStatus from "~/domains/verfahren/fetchEinreichungStatus.server";
import fetchGerichte from "~/domains/verfahren/fetchGerichte.service";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import {
  DokumentSchema,
  DokumentTypeSchema,
} from "~/domains/verfahren/schemas/dokumentSchema";
import { EinreichungSchema } from "~/domains/verfahren/schemas/einreichungSchema";
import { StatusSchema } from "~/domains/verfahren/schemas/statusSchema";
import {
  CodeWertSchema,
  VerfahrenSchema,
} from "~/domains/verfahren/schemas/verfahrenSchema";
import uploadDokument from "~/domains/verfahren/uploadDokument.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type Verfahren = z.infer<typeof VerfahrenSchema>;
type Einreichung = z.infer<typeof EinreichungSchema>;
type EinreichungStatus = z.infer<typeof StatusSchema>;
type Dokument = z.infer<typeof DokumentSchema>;
type DokumentType = z.infer<typeof DokumentTypeSchema>;
type Gericht = z.infer<typeof CodeWertSchema>;
type EinreichungWithStatus = Einreichung & {
  einreichungsStatus: EinreichungStatus;
};
type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
  gerichte: Promise<Gericht[]>;
};
type SubmitState = "idle" | "submit" | "upload" | "delete";
type DokumentActionResult = {
  success?: boolean;
  formType?: SubmitState;
};

const DokumentUploadSchema = z.object({
  type: DokumentTypeSchema,
  file: z.file().min(1),
});

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

  const verfahrenPromise = (await fetchVerfahrenById(authData, {
    id,
  })) as Verfahren;
  const gerichtePromise = fetchGerichte(authData) as Promise<Gericht[]>;

  const einreichungen = (await fetchEinreichungenById(authData, {
    id,
  })) as Einreichung[];
  const firstEinreichungId = einreichungen[0]?.id;

  if (!firstEinreichungId) {
    throw new Error("No Einreichung could be fetched");
  }

  const einreichungPromise = (await fetchEinreichungById(authData, {
    id: firstEinreichungId,
    verfahrenId: id,
  })) as Einreichung;

  const einreichungsStatus = (await fetchEinreichungStatus(authData, {
    id: firstEinreichungId,
    verfahrenId: id,
  })) as EinreichungStatus;

  const einreichungWithStatus: EinreichungWithStatus = {
    ...einreichungPromise,
    einreichungsStatus,
  };

  const dokumentePromise: Dokument[] = (await fetchDokumente(authData, {
    einreichungId: firstEinreichungId,
    verfahrenId: id,
  })) as Dokument[];

  return {
    verfahren: verfahrenPromise,
    einreichung: einreichungWithStatus,
    dokumente: dokumentePromise,
    gerichte: gerichtePromise,
  };
};

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in action");
  }

  const { id } = params;

  if (!id) {
    throw new Error("id is missing in action");
  }

  const formData = await request.formData();
  const formType = formData.get("formType");

  if (formType === "upload") {
    const formValues = {
      type: formData.get("type"),
      file: formData.get("file"),
    };
    const validatedForm = DokumentUploadSchema.safeParse(formValues);

    if (!validatedForm.success) {
      return {
        errors: z.flattenError(validatedForm.error),
        formValues,
        formType: "upload",
      };
    }

    const einreichungId = formData.get("einreichungId") as string;
    const file = formValues.file as File;
    const type = formValues.type as DokumentType;

    await uploadDokument(authData, id, einreichungId, file, type);

    return new Response(JSON.stringify({ success: true, formType: "upload" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (formType === "delete") {
    const einreichungId = formData.get("einreichungId") as string;
    const dokumentId = formData.get("dokumentId") as string;

    const { eTag } = await fetchDokument(authData, {
      verfahrenId: id,
      einreichungId: einreichungId,
      id: dokumentId,
    });

    const deleteResult = await deleteDokument(authData, {
      verfahrenId: id,
      einreichungId,
      id: dokumentId,
      eTag: eTag ?? "",
    });

    if (!deleteResult.success) {
      return new Response(JSON.stringify({ success: false }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (formType === "submit") {
    // @TODO: Update the submit logic and input files to be in sync with the soon
    // to be available VerfahrenAendernRequest data Schema (Swagger doc: PUT /api/v1/verfahren/{id})
    return redirect(`/verfahren/neu/${id}/abgabe`);
  }
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, gerichte } =
    useLoaderData<LoaderData>();
  const actionData = useActionData() || {};
  const { errors, formValues } = actionData;
  const { routes, buttons, shared } = useTranslations();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const deleteFetcher = useFetcher<DokumentActionResult>();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const [isFileInputErrorDismissed, setIsFileInputErrorDismissed] =
    useState(false);
  const showFileInputError =
    Boolean(errors?.fieldErrors?.file) && !isFileInputErrorDismissed;

  useEffect(() => {
    if (actionData?.success && navigation.state === "idle") {
      revalidator.revalidate();
    }
  }, [actionData?.success, navigation.state, revalidator]);

  useEffect(() => {
    if (navigation.state === "idle") {
      setSubmitState("idle");
    }
  }, [navigation.state]);

  useEffect(() => {
    if (
      submitState === "delete" &&
      deleteFetcher.state === "idle" &&
      deleteFetcher.data?.success
    ) {
      revalidator.revalidate();
      setSubmitState("idle");
    }

    if (submitState === "delete" && deleteFetcher.state === "idle") {
      setSubmitState("idle");
    }
  }, [
    deleteFetcher.data?.success,
    deleteFetcher.state,
    revalidator,
    submitState,
  ]);

  useEffect(() => {
    if (errors?.fieldErrors?.file) {
      setIsFileInputErrorDismissed(false);
    }
  }, [errors?.fieldErrors?.file]);

  useEffect(() => {
    if (
      navigation.state !== "idle" ||
      actionData?.formType !== "upload" ||
      errors?.fieldErrors
    ) {
      return;
    }

    setSelectedDokumentType("");

    if (uploadFileInputRef.current) {
      uploadFileInputRef.current.value = "";
    }
  }, [actionData, navigation.state]);

  // @TODO: sync input fields with API response/result schemas
  // and maybe move this into a getter/setter helper for other routes?
  const klagendePartei = verfahren.beteiligungen?.find((b) =>
    b.rollen?.some((r) => r.wert?.toLowerCase().includes("kläger")),
  );
  const beklagtePartei = verfahren.beteiligungen?.find((b) =>
    b.rollen?.some((r) => r.wert?.toLowerCase().includes("beklag")),
  );
  const klagendeParteiNameParts = klagendePartei?.name?.split(" ") ?? [];
  const beklagteParteiNameParts = beklagtePartei?.name?.split(" ") ?? [];
  const klagendeParteiFirstName =
    klagendeParteiNameParts.length > 1
      ? klagendeParteiNameParts.slice(0, -1).join(" ")
      : (klagendePartei?.name ?? "");
  const klagendeParteiLastName =
    klagendeParteiNameParts.length > 1
      ? klagendeParteiNameParts.slice(-1).join(" ")
      : "";
  const beklagteParteiFirstName =
    beklagteParteiNameParts.length > 1
      ? beklagteParteiNameParts.slice(0, -1).join(" ")
      : (beklagtePartei?.name ?? "");
  const beklagteParteiLastName =
    beklagteParteiNameParts.length > 1
      ? beklagteParteiNameParts.slice(-1).join(" ")
      : "";
  const klagendeParteiLawyer = klagendePartei?.prozessbevollmaechtigte?.[0];
  const courtCode = verfahren.gericht?.code ?? "";
  const claimReference = verfahren.aktenzeichen_gericht ?? "";

  const [hasLawyer, setHasLawyer] = useState(Boolean(klagendeParteiLawyer));

  const uploadedDokumente = dokumente.filter((_, index) => index > 0);

  const [selectedDokumentType, setSelectedDokumentType] = useState<string>(
    (formValues?.type as string) || "",
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement | null;
    const formType =
      submitter?.name === "formType" ? submitter.value : "submit";
    setSubmitState(formType as SubmitState);
  };

  return (
    <div
      className={`${submitState === "submit" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-8 kern-col-xl-offset-2">
          <h1 className="kern-heading-large">
            {routes.verfahrenNeu.step2.headline}
          </h1>
          <div className="kern-progress">
            <label className="kern-label" htmlFor="progress1">
              {routes.verfahrenNeu.step2.progress}
            </label>
            <progress id="progress-1" value="2" max="3"></progress>
          </div>
          <div className="pt-kern-space-x-large">
            <Form
              method="post"
              encType="multipart/form-data"
              className="kern-gap-lg flex flex-col"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="einreichungId"
                value={einreichung.id}
              />
              <div className="gap-kern-space-default flex flex-wrap items-start justify-between">
                <div>
                  <h2 className="kern-heading-medium">
                    {routes.verfahrenNeu.step2.subline}
                  </h2>
                  <p className="kern-body">{routes.verfahrenNeu.step2.intro}</p>
                  <p className="kern-body kern-body--small">
                    <span className="bg-kern-feedback-info-background">
                      Blau markierte Elemente
                    </span>{" "}
                    sind exemplarisch und statisch hinterlegt, die passende
                    API-Integration folgt.
                  </p>
                </div>
                <div className="gap-kern-space-default flex">
                  <Link
                    to={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichung.id}`}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">{buttons.prev}</span>
                  </Link>
                  <button
                    type="submit"
                    name="formType"
                    value="submit"
                    className="kern-btn kern-btn--primary"
                    disabled={submitState !== "idle"}
                  >
                    <span className="kern-label">
                      {routes.verfahrenNeu.step2.navigation.next}
                    </span>
                    <span
                      className="kern-icon kern-icon--arrow-forward"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
              </div>

              <Alert
                type="success"
                title={routes.verfahrenNeu.step2.notification.headline}
                message={routes.verfahrenNeu.step2.notification.copy}
              />

              <div className="kern-gap-lg flex flex-col">
                {/* plaintiff data */}
                <div className="kern-card">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h3 className="kern-title">
                          {routes.verfahrenNeu.step2.form.plaintiff.title}
                        </h3>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <p className="kern-body">
                        {routes.verfahrenNeu.step2.form.plaintiff.description}
                      </p>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-vorname"
                          >
                            {shared.form.labels.forename}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-vorname"
                            name="klagendeParteiVorname"
                            type="text"
                            defaultValue={klagendeParteiFirstName}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-nachname"
                          >
                            {shared.form.labels.lastname}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-nachname"
                            name="klagendeParteiNachname"
                            type="text"
                            defaultValue={klagendeParteiLastName}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-strasse"
                          >
                            {shared.form.labels.street}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-strasse"
                            name="klagendeParteiStrasse"
                            type="text"
                            defaultValue={"Bockenheimer Landstraße"}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-hausnummer"
                          >
                            {shared.form.labels.houseNumber}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-hausnummer"
                            name="klagendeParteiHausnummer"
                            type="text"
                            defaultValue={"42-44"}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-plz"
                          >
                            {shared.form.labels.postcode}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-plz"
                            name="klagendeParteiPlz"
                            type="text"
                            defaultValue={"60323"}
                          />
                        </div>
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-ort"
                          >
                            {shared.form.labels.place}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-ort"
                            name="klagendeParteiOrt"
                            type="text"
                            defaultValue={"Frankfurt am Main"}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-email"
                          >
                            {shared.form.labels.eMail}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-email"
                            name="klagendeParteiEmail"
                            type="email"
                            defaultValue={"emiliakuehn@posteo.de"}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="klagende-partei-telefon"
                          >
                            {shared.form.labels.phone}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-telefon"
                            name="klagendeParteiTelefon"
                            type="tel"
                          />
                        </div>
                      </div>

                      <hr
                        className="kern-divider border-kern-layout-border mt-kern-space-x-large w-full"
                        aria-hidden="true"
                      />

                      <div
                        className={`${hasLawyer ? "my-kern-space-default" : "mt-kern-space-default"} kern-form-check`}
                      >
                        <input
                          className="kern-form-check__checkbox"
                          id="has-lawyer"
                          name="hasLawyer"
                          type="checkbox"
                          checked={hasLawyer}
                          onChange={(event) =>
                            setHasLawyer(event.target.checked)
                          }
                        />
                        <label
                          className="kern-label bg-kern-feedback-info-background"
                          htmlFor="has-lawyer"
                        >
                          {
                            routes.verfahrenNeu.step2.form.plaintiff.hasLawyer
                              .checkbox
                          }
                        </label>
                      </div>

                      {hasLawyer && (
                        <>
                          <h3 className="kern-title kern-title--small">
                            {
                              routes.verfahrenNeu.step2.form.plaintiff.hasLawyer
                                .title
                            }
                          </h3>
                          <div className="kern-form-input">
                            <label
                              className="kern-label bg-kern-feedback-info-background"
                              htmlFor="lawyer-name"
                            >
                              {
                                routes.verfahrenNeu.step2.form.plaintiff
                                  .hasLawyer.nameOfLawFirm
                              }
                            </label>
                            <input
                              className="kern-form-input__input"
                              id="lawyer-name"
                              name="lawyerName"
                              type="text"
                              defaultValue={klagendeParteiLawyer?.name ?? ""}
                            />
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-2">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-strasse"
                              >
                                {shared.form.labels.street}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-strasse"
                                name="lawyerStrasse"
                                type="text"
                                defaultValue={"Römerberg"}
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-hausnummer"
                              >
                                {shared.form.labels.houseNumber}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-hausnummer"
                                name="lawyerHausnummer"
                                type="text"
                                defaultValue={"2"}
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-plz"
                              >
                                {shared.form.labels.postcode}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-plz"
                                name="lawyerPlz"
                                type="text"
                                defaultValue={"60311"}
                              />
                            </div>
                            <div className="kern-form-input flex-2">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-ort"
                              >
                                {shared.form.labels.place}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-ort"
                                name="lawyerOrt"
                                type="text"
                                defaultValue={"Frankfurt am Main"}
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-email"
                              >
                                {shared.form.labels.eMail}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-email"
                                name="lawyerEmail"
                                type="email"
                                defaultValue={"kanzlei@ra-boehm.de"}
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label bg-kern-feedback-info-background"
                                htmlFor="lawyer-telefon"
                              >
                                {shared.form.labels.phone}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-telefon"
                                name="lawyerTelefon"
                                type="tel"
                                defaultValue={"06921994731"}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </section>
                  </div>
                </div>

                {/* defendant data */}
                <div className="kern-card">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h3 className="kern-title">
                          {routes.verfahrenNeu.step2.form.defendant.title}
                        </h3>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <p className="kern-body">
                        {routes.verfahrenNeu.step2.form.defendant.description}
                      </p>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-vorname"
                          >
                            {shared.form.labels.forename}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-vorname"
                            name="beklagteParteiVorname"
                            type="text"
                            defaultValue={beklagteParteiFirstName}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-nachname"
                          >
                            {shared.form.labels.lastname}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-nachname"
                            name="beklagteParteiNachname"
                            type="text"
                            defaultValue={beklagteParteiLastName}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-strasse"
                          >
                            {shared.form.labels.street}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-strasse"
                            name="beklagteParteiStrasse"
                            type="text"
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-hausnummer"
                          >
                            {shared.form.labels.houseNumber}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-hausnummer"
                            name="beklagteParteiHausnummer"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-plz"
                          >
                            {shared.form.labels.postcode}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-plz"
                            name="beklagteParteiPlz"
                            type="text"
                          />
                        </div>
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-ort"
                          >
                            {shared.form.labels.place}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-ort"
                            name="beklagteParteiOrt"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-email"
                          >
                            {shared.form.labels.eMail}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-email"
                            name="beklagteParteiEmail"
                            type="email"
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="beklagte-partei-telefon"
                          >
                            {shared.form.labels.phone}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-telefon"
                            name="beklagteParteiTelefon"
                            type="tel"
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Verfahren details */}
                <div className="kern-card">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h3 className="kern-title">
                          {
                            routes.verfahrenNeu.step2.form.verfahrenDetails
                              .title
                          }
                        </h3>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <div className="kern-form-input">
                        <label
                          className="kern-label bg-kern-feedback-info-background"
                          htmlFor="claim-rubrum"
                        >
                          {shared.form.labels.rubrum}
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="claim-rubrum"
                          name="claimRubrum"
                          type="text"
                        />
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1 self-end">
                          <label
                            className="kern-label bg-kern-feedback-info-background"
                            htmlFor="claim-reference"
                          >
                            {
                              shared.form.labels
                                .legalRepresentativesReferenceNumber
                            }
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="claim-reference"
                            name="claimReference"
                            type="text"
                            defaultValue={claimReference}
                          />
                        </div>

                        <VerfahrenGerichteSelect
                          id="claim-court"
                          label={shared.form.labels.recipientCourt}
                          className="bg-kern-feedback-info-background flex-1 self-end"
                          placeholder={shared.form.select.placeholder}
                          gerichtePromise={gerichte}
                          initialSelectedValue={courtCode}
                        />
                      </div>

                      <div className="kern-form-input">
                        <label
                          className="kern-label bg-kern-feedback-info-background"
                          htmlFor="subject-matter-of-the-proceedings"
                        >
                          {shared.form.labels.subjectMatterOfTheProceedings}
                        </label>
                        <textarea
                          className="kern-form-input__input"
                          id="subject-matter-of-the-proceedings"
                          name="subjectMatterOfTheProceedings"
                          rows={4}
                        />
                      </div>
                    </section>
                  </div>
                </div>

                {/* Verfahren related docs */}
                <div className="kern-card">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h3 className="kern-title">
                          {routes.verfahrenNeu.step2.form.assets.title}
                        </h3>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <p className="kern-body">
                        {routes.verfahrenNeu.step2.form.assets.description}
                      </p>

                      <Suspense
                        fallback={<div>Dokumente werden geladen ...</div>}
                      >
                        <Await resolve={dokumente}>
                          {(resolvedData: Dokument[]) =>
                            resolvedData.length > 1 && (
                              <div className="mt-kern-space-default mb-kern-space-large gap-kern-space-default flex w-full flex-col">
                                {uploadedDokumente.map((dokumente) => {
                                  const dokument = dokumente;

                                  if (!dokument) {
                                    return null;
                                  }

                                  return (
                                    <div
                                      key={dokument.id}
                                      className="p-kern-space-default align-center gap-kern-space-default rounded-kern-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)"
                                    >
                                      <div className="flex-1">
                                        <div className="kern-body kern-body--bold">
                                          {dokument.name}
                                        </div>

                                        <div className="kern-body kern-body--small">
                                          {Number.parseFloat(
                                            (
                                              dokument.size_in_bytes / 1000
                                            ).toString(),
                                          ).toFixed(2)}{" "}
                                          KB
                                        </div>
                                      </div>

                                      <div className="flex items-center">
                                        <button
                                          className="kern-btn kern-btn--secondary kern-btn--x-small"
                                          type="button"
                                          onClick={() => {
                                            setSubmitState("delete");
                                            deleteFetcher.submit(
                                              {
                                                formType: "delete",
                                                einreichungId: einreichung.id,
                                                dokumentId: dokument.id,
                                              },
                                              { method: "post" },
                                            );
                                          }}
                                          disabled={submitState !== "idle"}
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
                                  );
                                })}
                              </div>
                            )
                          }
                        </Await>
                      </Suspense>

                      <div className="gap-kern-space-default flex w-full flex-col">
                        <div
                          className={
                            showFileInputError
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
                            ref={uploadFileInputRef}
                            className={
                              showFileInputError
                                ? "kern-form-input__input kern-form-input__input--error"
                                : "kern-form-input__input"
                            }
                            id="file"
                            name="file"
                            type="file"
                            onChange={() => setIsFileInputErrorDismissed(true)}
                            aria-describedby={
                              showFileInputError
                                ? "input-file-hint file-input-error"
                                : "input-file-hint"
                            }
                          />
                          {showFileInputError && (
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

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            name="formType"
                            value="upload"
                            className="kern-btn kern-btn--secondary"
                            disabled={submitState !== "idle"}
                          >
                            <span className="kern-label">
                              {submitState === "upload"
                                ? "Wird hochgeladen..."
                                : "Hochladen"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="gap-kern-space-default flex flex-wrap justify-end">
                  <div className="gap-kern-space-default flex">
                    <Link
                      to={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichung.id}`}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">{buttons.prev}</span>
                    </Link>
                    <button
                      type="submit"
                      name="formType"
                      value="submit"
                      className="kern-btn kern-btn--primary"
                      disabled={submitState !== "idle"}
                    >
                      <span className="kern-label">
                        {routes.verfahrenNeu.step2.navigation.next}
                      </span>
                      <span
                        className="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>

                {submitState === "submit" && (
                  <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
                    <div className="kern-loader kern-loader--visible">
                      <span className="kern-sr-only">Wird geladen...</span>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
