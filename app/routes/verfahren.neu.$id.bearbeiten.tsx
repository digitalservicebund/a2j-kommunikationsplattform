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
import InputText from "~/components/InputText";
import VerfahrenDokumentTypeSelect from "~/components/verfahren/VerfahrenDokumentTypeSelect";
import VerfahrenGerichteSelect from "~/components/verfahren/VerfahrenGerichteSelect";
import VerfahrenKanzleiformSelect from "~/components/verfahren/VerfahrenKanzleiformSelect";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import { config } from "~/config/config";
import {
  getBeteiligungByRoleCode,
  getProzessbevollmaechtigteByReferenz,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/beteiligteByRole";
import {
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/beteiligteContactInfo";
import buildBeteiligungFromFormValues, {
  AnwaltFormValues,
  buildRaKanzleiFromFormValues,
  ParteiFormValues,
} from "~/domains/verfahren/buildBeteiligungFromFormValues";
import { VerfahrenAendernRequestSchema } from "~/domains/verfahren/createVerfahren.server";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchAnschriftstypen from "~/domains/verfahren/fetchAnschriftstypen.service";
import fetchDokument from "~/domains/verfahren/fetchDokument";
import fetchGerichte from "~/domains/verfahren/fetchGerichte.service";
import fetchKanzleiformen from "~/domains/verfahren/fetchKanzleiformen.service";
import fetchRollenbezeichnungen from "~/domains/verfahren/fetchRollenbezeichnungen.service";
import fetchStaaten from "~/domains/verfahren/fetchStaaten.service";
import fetchTelekommunikationsarten from "~/domains/verfahren/fetchTelekommunikationsarten.service";
import formatDokumentSize from "~/domains/verfahren/formatDokumentSize";
import loadVerfahrenEinreichungBundle, {
  Dokument,
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import resolveCodeWertId from "~/domains/verfahren/resolveCodeWertId";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/routeContext.server";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { DokumentTypeSchema } from "~/domains/verfahren/schemas/dokumentSchema";
import updateVerfahren from "~/domains/verfahren/updateVerfahren.server";
import uploadDokument from "~/domains/verfahren/uploadDokument.server";
import {
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
  STAAT_CODE_DEUTSCHLAND,
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/verfahrenCodeConstants";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type DokumentType = z.infer<typeof DokumentTypeSchema>;
type CodeWertItem = z.infer<typeof CodeWertSchema>;
type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
  gerichte: Promise<CodeWertItem[]>;
  kanzleiformen: Promise<CodeWertItem[]>;
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

// Dev-only convenience data for the "Fill details with dummy data" button below.
const DUMMY_FORM_VALUES: Record<string, string> = {
  klagendeParteiVorname: "Test-Klaeger-Vorname",
  klagendeParteiNachname: "Test-Klaeger-Nachname",
  klagendeParteiStrasse: "Teststraße",
  klagendeParteiHausnummer: "1",
  klagendeParteiPlz: "12345",
  klagendeParteiOrt: "Testort",
  klagendeParteiEmail: "test-klaeger@test.de",
  klagendeParteiTelefon: "0123456789",
  lawyerName: "Test-Kanzlei",
  lawyerStrasse: "Teststraße",
  lawyerHausnummer: "2",
  lawyerPlz: "12345",
  lawyerOrt: "Testort",
  lawyerEmail: "test-kanzlei@test.de",
  lawyerTelefon: "0123456789",
  beklagteParteiVorname: "Test-Beklagte-Vorname",
  beklagteParteiNachname: "Test-Beklagte-Nachname",
  beklagteParteiStrasse: "Teststraße",
  beklagteParteiHausnummer: "3",
  beklagteParteiPlz: "12345",
  beklagteParteiOrt: "Testort",
  beklagteParteiEmail: "test-beklagte@test.de",
  beklagteParteiTelefon: "0123456789",
  claimRubrum: "Test-Rubrum",
  claimReference: "AZ-TEST-001",
  subjectMatterOfTheProceedings: "Test-Verfahrensgegenstand",
};

function fillFormFields(form: HTMLFormElement, values: Record<string, string>) {
  Object.entries(values).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);

    if (field instanceof HTMLInputElement) {
      field.value = value;
    }
  });
}

function getFormText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function getParteiFormValues(
  formData: FormData,
  prefix: "klagendePartei" | "beklagtePartei",
): ParteiFormValues {
  return {
    vorname: getFormText(formData, `${prefix}Vorname`),
    nachname: getFormText(formData, `${prefix}Nachname`),
    strasse: getFormText(formData, `${prefix}Strasse`),
    hausnummer: getFormText(formData, `${prefix}Hausnummer`),
    postleitzahl: getFormText(formData, `${prefix}Plz`),
    ort: getFormText(formData, `${prefix}Ort`),
    email: getFormText(formData, `${prefix}Email`),
    telefon: getFormText(formData, `${prefix}Telefon`),
  };
}

function getAnwaltFormValues(formData: FormData): AnwaltFormValues {
  return {
    name: getFormText(formData, "lawyerName"),
    strasse: getFormText(formData, "lawyerStrasse"),
    hausnummer: getFormText(formData, "lawyerHausnummer"),
    postleitzahl: getFormText(formData, "lawyerPlz"),
    ort: getFormText(formData, "lawyerOrt"),
    email: getFormText(formData, "lawyerEmail"),
    telefon: getFormText(formData, "lawyerTelefon"),
  };
}

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );
  const { verfahren, einreichung, dokumente } =
    await loadVerfahrenEinreichungBundle(authData, verfahrenId);

  const gerichtePromise = (async () => {
    const { elemente } = await fetchGerichte(authData);

    return elemente;
  })();

  const kanzleiformenPromise = (async () => {
    const { elemente } = await fetchKanzleiformen(authData);

    return elemente;
  })();

  return {
    verfahren,
    einreichung,
    dokumente,
    gerichte: gerichtePromise,
    kanzleiformen: kanzleiformenPromise,
  };
};

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

    await uploadDokument(authData, verfahrenId, einreichungId, file, type);

    return new Response(JSON.stringify({ success: true, formType: "upload" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (formType === "delete") {
    const einreichungId = formData.get("einreichungId") as string;
    const dokumentId = formData.get("dokumentId") as string;

    const { eTag } = await fetchDokument(authData, {
      verfahrenId,
      einreichungId: einreichungId,
      id: dokumentId,
    });

    const deleteResult = await deleteDokument(authData, {
      verfahrenId,
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
    const [
      { elemente: staaten },
      { elemente: anschriftstypen },
      { elemente: telekommunikationsarten },
      { elemente: rollenbezeichnungen },
    ] = await Promise.all([
      fetchStaaten(authData),
      fetchAnschriftstypen(authData),
      fetchTelekommunikationsarten(authData),
      fetchRollenbezeichnungen(authData),
    ]);

    const sharedCodeIds = {
      anschriftstypId: resolveCodeWertId(
        anschriftstypen,
        ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
      ),
      staatId: resolveCodeWertId(staaten, STAAT_CODE_DEUTSCHLAND),
      emailTelekommunikationsartId: resolveCodeWertId(
        telekommunikationsarten,
        TELEKOMMUNIKATIONSART_CODE_EMAIL,
      ),
      telefonTelekommunikationsartId: resolveCodeWertId(
        telekommunikationsarten,
        TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
      ),
    };

    const beteiligungen = [
      buildBeteiligungFromFormValues(
        getParteiFormValues(formData, "klagendePartei"),
        {
          ...sharedCodeIds,
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLE_CODE_KLAEGERIN,
          ),
        },
        ROLE_CODE_KLAEGERIN,
      ),
      buildBeteiligungFromFormValues(
        getParteiFormValues(formData, "beklagtePartei"),
        {
          ...sharedCodeIds,
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLE_CODE_BEKLAGTE,
          ),
        },
      ),
      buildRaKanzleiFromFormValues(
        getAnwaltFormValues(formData),
        {
          ...sharedCodeIds,
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
          ),
          kanzleiformId: getFormText(formData, "lawyerKanzleiformId"),
        },
        ROLE_CODE_KLAEGERIN,
      ),
    ].filter((beteiligung) => beteiligung !== null);

    const formValues = {
      verfahrensgegenstand: formData.get("subjectMatterOfTheProceedings"),
      kurzrubrum: formData.get("claimRubrum"),
      gericht_id: formData.get("claim-court"),
      beteiligungen: beteiligungen.length > 0 ? beteiligungen : null,
    };

    const validatedForm = VerfahrenAendernRequestSchema.safeParse(formValues);

    if (!validatedForm.success) {
      return {
        errors: z.flattenError(validatedForm.error),
        formValues,
        formType: "submit",
      };
    }

    await updateVerfahren(authData, verfahrenId, validatedForm.data);

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, gerichte, kanzleiformen } =
    useLoaderData<LoaderData>();
  const actionData = useActionData() || {};
  const { errors, formValues } = actionData;
  const { routes, buttons, shared } = useTranslations();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const deleteFetcher = useFetcher<DokumentActionResult>();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const mainFormRef = useRef<HTMLFormElement>(null);
  const [isFileInputErrorDismissed, setIsFileInputErrorDismissed] =
    useState(false);
  const showFileInputError =
    Boolean(errors?.fieldErrors?.file) && !isFileInputErrorDismissed;

  console.log("verfahren", verfahren);

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

  const klagendePartei = getBeteiligungByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagtePartei = getBeteiligungByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );
  const klagendeParteiFirstName =
    klagendePartei && "vorname" in klagendePartei
      ? (klagendePartei.vorname ?? "")
      : "";
  const klagendeParteiLastName =
    klagendePartei && "nachname" in klagendePartei
      ? klagendePartei.nachname
      : "";
  const beklagteParteiFirstName =
    beklagtePartei && "vorname" in beklagtePartei
      ? (beklagtePartei.vorname ?? "")
      : "";
  const beklagteParteiLastName =
    beklagtePartei && "nachname" in beklagtePartei
      ? beklagtePartei.nachname
      : "";
  const klagendeParteiAnschrift = getBeteiligteAnschrift(klagendePartei);
  const beklagteParteiAnschrift = getBeteiligteAnschrift(beklagtePartei);
  const klagendeParteiEmail = getBeteiligteEmail(klagendePartei);
  const klagendeParteiTelefon = getBeteiligteTelefon(klagendePartei);
  const beklagteParteiEmail = getBeteiligteEmail(beklagtePartei);
  const beklagteParteiTelefon = getBeteiligteTelefon(beklagtePartei);
  // A Prozessbevollmächtigter is its own Beteiligte (a RaKanzlei), linked to
  // the party it represents via its Rolle.referenz. We don't track a separate
  // rollennummer scheme — we just reuse the represented party's role code
  // (e.g. ROLE_CODE_KLAEGERIN) as both its rollennummer and the lawyer's
  // referenz when writing (see updateVerfahren action below).
  const klagendeParteiAnwalt = getProzessbevollmaechtigteByReferenz(
    verfahren.beteiligungen,
    ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    ROLE_CODE_KLAEGERIN,
  );
  const klagendeParteiLawyerName =
    klagendeParteiAnwalt && "bezeichnung" in klagendeParteiAnwalt
      ? (klagendeParteiAnwalt.bezeichnung ?? "")
      : "";
  const klagendeParteiAnwaltAnschrift =
    getBeteiligteAnschrift(klagendeParteiAnwalt);
  const klagendeParteiAnwaltEmail = getBeteiligteEmail(klagendeParteiAnwalt);
  const klagendeParteiAnwaltTelefon =
    getBeteiligteTelefon(klagendeParteiAnwalt);
  const klagendeParteiAnwaltKanzleiformId =
    klagendeParteiAnwalt && "kanzleiform" in klagendeParteiAnwalt
      ? (klagendeParteiAnwalt.kanzleiform?.id ?? "")
      : "";
  const hasExistingLawyer = Boolean(klagendeParteiAnwalt);
  const courtId = verfahren.gericht?.id ?? "";
  const claimReference = verfahren.aktenzeichen_gericht ?? "";

  const [hasLawyer, setHasLawyer] = useState(hasExistingLawyer);

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

  // To be used in development for easier manual testing
  // TODO: delete after full implementation
  const handleFillDummyData = () => {
    const form = mainFormRef.current;

    if (!form) {
      return;
    }

    fillFormFields(form, DUMMY_FORM_VALUES);
    setHasLawyer(true);

    // the lawyer fields only mount once hasLawyer becomes true, so fill them
    // once React has rendered the newly-revealed inputs.
    requestAnimationFrame(() => {
      fillFormFields(form, DUMMY_FORM_VALUES);
    });
  };

  return (
    <div
      className={`${submitState === "submit" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
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
              ref={mainFormRef}
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
                  {config().ENVIRONMENT === "development" && (
                    <button
                      type="button"
                      className="kern-btn kern-btn--secondary kern-btn--x-small mt-kern-space-small"
                      onClick={handleFillDummyData}
                    >
                      <span className="kern-label">
                        Fill details with dummy data
                      </span>
                    </button>
                  )}
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

              {actionData?.formType === "submit" && errors && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={`${JSON.stringify(errors)}`}
                />
              )}

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
                            className="kern-label"
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
                            className="kern-label"
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
                            className="kern-label"
                            htmlFor="klagende-partei-strasse"
                          >
                            {shared.form.labels.street}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-strasse"
                            name="klagendeParteiStrasse"
                            type="text"
                            defaultValue={
                              klagendeParteiAnschrift?.strasse ?? ""
                            }
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-hausnummer"
                          >
                            {shared.form.labels.houseNumber}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-hausnummer"
                            name="klagendeParteiHausnummer"
                            type="text"
                            defaultValue={
                              klagendeParteiAnschrift?.hausnummer ?? ""
                            }
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-plz"
                          >
                            {shared.form.labels.postcode}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-plz"
                            name="klagendeParteiPlz"
                            type="text"
                            defaultValue={
                              klagendeParteiAnschrift?.postleitzahl ?? ""
                            }
                          />
                        </div>
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-ort"
                          >
                            {shared.form.labels.place}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-ort"
                            name="klagendeParteiOrt"
                            type="text"
                            defaultValue={klagendeParteiAnschrift?.ort ?? ""}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-email"
                          >
                            {shared.form.labels.eMail}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-email"
                            name="klagendeParteiEmail"
                            type="email"
                            defaultValue={klagendeParteiEmail}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-telefon"
                          >
                            {shared.form.labels.phone}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-telefon"
                            name="klagendeParteiTelefon"
                            type="tel"
                            defaultValue={klagendeParteiTelefon}
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
                        <label className="kern-label" htmlFor="has-lawyer">
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
                            <label className="kern-label" htmlFor="lawyer-name">
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
                              defaultValue={klagendeParteiLawyerName}
                            />
                          </div>

                          <VerfahrenKanzleiformSelect
                            id="lawyerKanzleiformId"
                            label={
                              routes.verfahrenNeu.step2.form.plaintiff.hasLawyer
                                .kanzleiform
                            }
                            placeholder={shared.form.select.placeholder}
                            kanzleiformenPromise={kanzleiformen}
                            initialSelectedValue={
                              klagendeParteiAnwaltKanzleiformId
                            }
                            required
                          />

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-2">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-strasse"
                              >
                                {shared.form.labels.street}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-strasse"
                                name="lawyerStrasse"
                                type="text"
                                defaultValue={
                                  klagendeParteiAnwaltAnschrift?.strasse ?? ""
                                }
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-hausnummer"
                              >
                                {shared.form.labels.houseNumber}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-hausnummer"
                                name="lawyerHausnummer"
                                type="text"
                                defaultValue={
                                  klagendeParteiAnwaltAnschrift?.hausnummer ??
                                  ""
                                }
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-plz"
                              >
                                {shared.form.labels.postcode}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-plz"
                                name="lawyerPlz"
                                type="text"
                                defaultValue={
                                  klagendeParteiAnwaltAnschrift?.postleitzahl ??
                                  ""
                                }
                              />
                            </div>
                            <div className="kern-form-input flex-2">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-ort"
                              >
                                {shared.form.labels.place}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-ort"
                                name="lawyerOrt"
                                type="text"
                                defaultValue={
                                  klagendeParteiAnwaltAnschrift?.ort ?? ""
                                }
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-email"
                              >
                                {shared.form.labels.eMail}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-email"
                                name="lawyerEmail"
                                type="email"
                                defaultValue={klagendeParteiAnwaltEmail}
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-telefon"
                              >
                                {shared.form.labels.phone}
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-telefon"
                                name="lawyerTelefon"
                                type="tel"
                                defaultValue={klagendeParteiAnwaltTelefon}
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
                            className="kern-label"
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
                            className="kern-label"
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
                            className="kern-label"
                            htmlFor="beklagte-partei-strasse"
                          >
                            {shared.form.labels.street}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-strasse"
                            name="beklagteParteiStrasse"
                            type="text"
                            defaultValue={
                              beklagteParteiAnschrift?.strasse ?? ""
                            }
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-hausnummer"
                          >
                            {shared.form.labels.houseNumber}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-hausnummer"
                            name="beklagteParteiHausnummer"
                            type="text"
                            defaultValue={
                              beklagteParteiAnschrift?.hausnummer ?? ""
                            }
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-plz"
                          >
                            {shared.form.labels.postcode}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-plz"
                            name="beklagteParteiPlz"
                            type="text"
                            defaultValue={
                              beklagteParteiAnschrift?.postleitzahl ?? ""
                            }
                          />
                        </div>
                        <div className="kern-form-input flex-2">
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-ort"
                          >
                            {shared.form.labels.place}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-ort"
                            name="beklagteParteiOrt"
                            type="text"
                            defaultValue={beklagteParteiAnschrift?.ort ?? ""}
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-email"
                          >
                            {shared.form.labels.eMail}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-email"
                            name="beklagteParteiEmail"
                            type="email"
                            defaultValue={beklagteParteiEmail}
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-telefon"
                          >
                            {shared.form.labels.phone}
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="beklagte-partei-telefon"
                            name="beklagteParteiTelefon"
                            type="tel"
                            defaultValue={beklagteParteiTelefon}
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
                        <InputText
                          label={shared.form.labels.rubrum}
                          id="claim-rubrum"
                          name="claimRubrum"
                          defaultValue={verfahren?.kurzrubrum ?? ""}
                        />
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1 self-end">
                          <label
                            className="kern-label"
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
                          className="flex-1 self-end"
                          placeholder={shared.form.select.placeholder}
                          gerichtePromise={gerichte}
                          initialSelectedValue={courtId}
                        />
                      </div>

                      <div className="kern-form-input">
                        <InputText
                          label={
                            shared.form.labels.subjectMatterOfTheProceedings
                          }
                          id="subject-matter-of-the-proceedings"
                          name="subjectMatterOfTheProceedings"
                          required
                          defaultValue={verfahren?.verfahrensgegenstand ?? ""}
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
                                          {dokument.anzeigename}
                                        </div>

                                        <div className="kern-body kern-body--small">
                                          {formatDokumentSize(
                                            dokument.size_in_bytes,
                                          )}
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

                <VerfahrenLoader
                  active={submitState === "submit"}
                  label="Wird geladen..."
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
