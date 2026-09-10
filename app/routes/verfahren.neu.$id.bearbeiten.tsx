import { useEffect, useRef, useState } from "react";
import {
  ActionFunctionArgs,
  data,
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
import Button from "~/components/Button";
import Progress from "~/components/Progress";
import VerfahrenBeklagterSection from "~/components/verfahren/VerfahrenBeklagterSection";
import VerfahrenDetailsFormSection from "~/components/verfahren/VerfahrenDetailsFormSection";
import VerfahrenDocumentsFormSection from "~/components/verfahren/VerfahrenDocumentsFormSection";
import VerfahrenKlaegerSection from "~/components/verfahren/VerfahrenKlaegerSection";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import { config } from "~/config/config";
import loadVerfahrenEinreichungBundle, {
  Dokument,
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import regenerateEinreichungXJustiz from "~/domains/verfahren/application/regenerateEinreichungXJustiz.server";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/application/routeContext.server";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import { DokumentTypeSchema } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { fetchLatestBelegForEinreichung } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  deleteDokument,
  fetchDokument,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchAnschriftstypen,
  fetchGerichte,
  fetchKanzleiformen,
  fetchRollenbezeichnungen,
  fetchStaaten,
  fetchTelekommunikationsarten,
} from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import { updateVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import {
  getBeteiligungByRoleCode,
  getProzessbevollmaechtigteByReferenz,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import {
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/services/beteiligteContactInfo";
import buildBeteiligungFromFormValues, {
  AnwaltFormValues,
  buildRaKanzleiFromFormValues,
  ParteiFormValues,
} from "~/domains/verfahren/services/buildBeteiligungFromFormValues";
import canDeleteDokument from "~/domains/verfahren/services/canDeleteDokument";
import resolveCodeWertId from "~/domains/verfahren/services/resolveCodeWertId";
import {
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
  STAAT_CODE_DEUTSCHLAND,
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/services/verfahrenCodeConstants";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  actionError,
  actionFieldErrorsResponse,
  ActionResult,
  actionResultFromApiError,
  actionSuccess,
} from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";

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
type DokumentActionData = { formType?: SubmitState };

const DokumentUploadSchema = z.object({
  type: DokumentTypeSchema,
  file: z.file().min(1),
});

const BeteiligtenNachnameSchema = z.object({
  klagendeParteiNachname: z.string().min(1, {
    error: de.routes.verfahrenNeu.step2.form.validation.klagendeParteiNachname,
  }),
  beklagteParteiNachname: z.string().min(1, {
    error: de.routes.verfahrenNeu.step2.form.validation.beklagteParteiNachname,
  }),
});

const LawyerRequiredFieldsSchema = z.object({
  lawyerName: z.string().min(1, {
    error: de.routes.verfahrenNeu.step2.form.validation.lawyerName,
  }),
  lawyerKanzleiformId: z.string().min(1, {
    error: de.routes.verfahrenNeu.step2.form.validation.lawyerKanzleiform,
  }),
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

  // Once the Einreichung has been submitted (a Beleg exists), the API no
  // longer accepts changes to the Verfahren — bounce back instead of
  // letting the user edit a form that will fail with a 409 on submit.
  const beleg = await fetchLatestBelegForEinreichung(authData, {
    verfahrenId,
    einreichungId: einreichung.id,
  });

  if (beleg) {
    return redirect(`/verfahren/${verfahrenId}`);
  }

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

type FormActionContext = {
  authData: AuthenticationResponse;
  verfahrenId: string;
};

async function handleUploadAction(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const formValues = {
    type: formData.get("type"),
    file: formData.get("file"),
  };
  const validatedForm = DokumentUploadSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return actionFieldErrorsResponse(validatedForm.error, {
      data: { formValues, formType: "upload" },
    });
  }

  const einreichungId = formData.get("einreichungId") as string;
  const file = formValues.file as File;
  const type = formValues.type as DokumentType;

  try {
    await uploadDokument(authData, verfahrenId, einreichungId, file, type);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.uploadFailed,
      data: { formValues, formType: "upload" },
    });
  }

  return actionSuccess<DokumentActionData>({ formType: "upload" });
}

async function handleDeleteAction(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  const einreichungId = formData.get("einreichungId") as string;
  const dokumentId = formData.get("dokumentId") as string;

  try {
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
      return data(actionError(de.shared.form.errors.deleteFailed), {
        status: 500,
      });
    }

    return actionSuccess(undefined);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.deleteFailed,
    });
  }
}

// Persists the Verfahren and its Beteiligungen, then regenerates the
// resulting XJustiz document.
async function handleSubmitAction(
  formData: FormData,
  { authData, verfahrenId }: FormActionContext,
) {
  // buildBeteiligungFromFormValues() silently omits a Partei from the
  // submission when their Nachname is blank instead of failing — validate
  // it here first so a blank Nachname is reported as a field error rather
  // than the party quietly disappearing from the Klage.
  const validatedNachnamen = BeteiligtenNachnameSchema.safeParse({
    klagendeParteiNachname: formData.get("klagendeParteiNachname"),
    beklagteParteiNachname: formData.get("beklagteParteiNachname"),
  });

  if (!validatedNachnamen.success) {
    return actionFieldErrorsResponse(validatedNachnamen.error, {
      data: { formType: "submit" },
    });
  }

  if (formData.get("hasLawyer")) {
    const validatedLawyer = LawyerRequiredFieldsSchema.safeParse({
      lawyerName: formData.get("lawyerName"),
      lawyerKanzleiformId: formData.get("lawyerKanzleiformId"),
    });

    if (!validatedLawyer.success) {
      return actionFieldErrorsResponse(validatedLawyer.error, {
        data: { formType: "submit" },
      });
    }
  }

  // Fetch the code lists needed to resolve Beteiligung/Rolle references
  let staaten: CodeWertItem[];
  let anschriftstypen: CodeWertItem[];
  let telekommunikationsarten: CodeWertItem[];
  let rollenbezeichnungen: CodeWertItem[];

  try {
    [
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
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
    });
  }

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

  // Build the Beteiligungen (plaintiff, defendant, and their lawyer) from
  // the submitted form data
  const klagendeParteiBeteiligung = buildBeteiligungFromFormValues(
    getParteiFormValues(formData, "klagendePartei"),
    {
      ...sharedCodeIds,
      rollenbezeichnungId: resolveCodeWertId(
        rollenbezeichnungen,
        ROLE_CODE_KLAEGERIN,
      ),
    },
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteParteiBeteiligung = buildBeteiligungFromFormValues(
    getParteiFormValues(formData, "beklagtePartei"),
    {
      ...sharedCodeIds,
      rollenbezeichnungId: resolveCodeWertId(
        rollenbezeichnungen,
        ROLE_CODE_BEKLAGTE,
      ),
    },
  );
  // Only include the Prozessbevollmächtigte(r) if the Klägerin they
  // reference is actually part of this submission — otherwise their
  // Rolle.referenz would be an orphan, pointing at a party that no longer exists.
  const anwaltBeteiligung = klagendeParteiBeteiligung
    ? buildRaKanzleiFromFormValues(
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
      )
    : null;

  const beteiligungen = [
    klagendeParteiBeteiligung,
    beklagteParteiBeteiligung,
    anwaltBeteiligung,
  ].filter((beteiligung) => beteiligung !== null);

  const formValues = {
    verfahrensgegenstand: formData.get("subjectMatterOfTheProceedings"),
    kurzrubrum: formData.get("claimRubrum"),
    gerichtId: formData.get("claim-court"),
    beteiligungen: beteiligungen.length > 0 ? beteiligungen : null,
  };

  const validatedForm = VerfahrenAendernInputSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return actionFieldErrorsResponse(validatedForm.error, {
      data: { formValues, formType: "submit" },
    });
  }

  // Persist the Verfahren and regenerate the resulting XJustiz document
  try {
    await updateVerfahren(authData, verfahrenId, validatedForm.data);

    const einreichungId = formData.get("einreichungId") as string;
    await regenerateEinreichungXJustiz(authData, {
      verfahrenId,
      einreichungId,
    });
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
      data: { formValues, formType: "submit" },
    });
  }

  return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
}

const formActionHandlers = {
  upload: handleUploadAction,
  delete: handleDeleteAction,
  submit: handleSubmitAction,
} as const;

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
    () => undefined,
  );
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, gerichte, kanzleiformen } =
    useLoaderData<LoaderData>();
  const actionData = useActionData<typeof action>();
  const isInvalid = actionData?.status === "invalid";
  const isError = actionData?.status === "error";
  const fieldErrors = isInvalid ? actionData.fieldErrors : undefined;
  const formValues = isInvalid
    ? (
        actionData.data as
          { formValues?: Record<string, FormDataEntryValue> } | undefined
      )?.formValues
    : undefined;
  const actionFormType = (actionData?.data as DokumentActionData | undefined)
    ?.formType;
  const { routes, buttons, shared } = useTranslations();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const deleteFetcher = useFetcher<ActionResult>();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const mainFormRef = useRef<HTMLFormElement>(null);
  const [isFileInputErrorDismissed, setIsFileInputErrorDismissed] =
    useState(false);
  const showFileInputError =
    Boolean(fieldErrors?.file) && !isFileInputErrorDismissed;

  useEffect(() => {
    if (actionData?.status === "success" && navigation.state === "idle") {
      revalidator.revalidate();
    }
  }, [actionData?.status, navigation.state, revalidator]);

  useEffect(() => {
    if (navigation.state === "idle") {
      setSubmitState("idle");
    }
  }, [navigation.state]);

  useEffect(() => {
    if (
      submitState === "delete" &&
      deleteFetcher.state === "idle" &&
      deleteFetcher.data?.status === "success"
    ) {
      revalidator.revalidate();
      setSubmitState("idle");
    }

    if (submitState === "delete" && deleteFetcher.state === "idle") {
      setSubmitState("idle");
    }
  }, [
    deleteFetcher.data?.status,
    deleteFetcher.state,
    revalidator,
    submitState,
  ]);

  useEffect(() => {
    if (fieldErrors?.file) {
      setIsFileInputErrorDismissed(false);
    }
  }, [fieldErrors?.file]);

  const [selectedDokumentType, setSelectedDokumentType] = useState<string>(
    (formValues?.type as string) || "",
  );
  const dokumentTypeError =
    fieldErrors?.type &&
    selectedDokumentType === "" &&
    shared.form.selectDokumentType.error;

  useEffect(() => {
    if (
      navigation.state !== "idle" ||
      actionFormType !== "upload" ||
      fieldErrors
    ) {
      return;
    }

    setSelectedDokumentType("");

    if (uploadFileInputRef.current) {
      uploadFileInputRef.current.value = "";
    }
  }, [actionFormType, fieldErrors, navigation.state]);

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
  const claimReference = verfahren.aktenzeichenGericht ?? "";

  const [hasLawyer, setHasLawyer] = useState(hasExistingLawyer);

  const uploadedDokumente = dokumente.filter((dokument) =>
    canDeleteDokument(dokument),
  );

  const handleDeleteDokument = (dokument: Dokument) => {
    setSubmitState("delete");
    deleteFetcher.submit(
      {
        formType: "delete",
        einreichungId: einreichung.id,
        dokumentId: dokument.id,
      },
      { method: "post" },
    );
  };

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
          <Progress
            id="progress-2"
            label={routes.verfahrenNeu.step2.progress}
            value={2}
            max={3}
          />
          <div className="kern-pt-xl">
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
              <div className="kern-gap-md flex flex-wrap items-start justify-between">
                <div>
                  <h2 className="kern-heading-medium">
                    {routes.verfahrenNeu.step2.subline}
                  </h2>
                  <p className="kern-body">{routes.verfahrenNeu.step2.intro}</p>
                  {config().ENVIRONMENT === "development" && (
                    <Button
                      appearance="secondary"
                      type="button"
                      className="kern-btn--x-small kern-mt-sm"
                      onClick={handleFillDummyData}
                      label="Fill details with dummy data"
                    />
                  )}
                </div>
                <div className="kern-gap-md flex">
                  <Link
                    to={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichung.id}`}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">{buttons.prev}</span>
                  </Link>
                  <Button
                    appearance="primary"
                    type="submit"
                    name="formType"
                    value="submit"
                    disabled={submitState !== "idle"}
                  >
                    <span className="kern-label">
                      {routes.verfahrenNeu.step2.navigation.next}
                    </span>
                    <span
                      className="kern-icon kern-icon--arrow-forward"
                      aria-hidden="true"
                    ></span>
                  </Button>
                </div>
              </div>

              <Alert
                type="success"
                title={routes.verfahrenNeu.step2.notification.headline}
                message={routes.verfahrenNeu.step2.notification.copy}
              />

              {isError && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={actionData.error ?? shared.form.submit.message}
                />
              )}

              <div className="kern-gap-lg flex flex-col">
                <VerfahrenKlaegerSection
                  firstName={klagendeParteiFirstName}
                  lastName={klagendeParteiLastName}
                  anschrift={klagendeParteiAnschrift}
                  email={klagendeParteiEmail}
                  telefon={klagendeParteiTelefon}
                  hasLawyer={hasLawyer}
                  onHasLawyerChange={setHasLawyer}
                  lawyerName={klagendeParteiLawyerName}
                  lawyerAnschrift={klagendeParteiAnwaltAnschrift}
                  lawyerEmail={klagendeParteiAnwaltEmail}
                  lawyerTelefon={klagendeParteiAnwaltTelefon}
                  lawyerKanzleiformId={klagendeParteiAnwaltKanzleiformId}
                  kanzleiformenPromise={kanzleiformen}
                  errors={fieldErrors || {}}
                />

                <VerfahrenBeklagterSection
                  firstName={beklagteParteiFirstName}
                  lastName={beklagteParteiLastName}
                  anschrift={beklagteParteiAnschrift}
                  email={beklagteParteiEmail}
                  telefon={beklagteParteiTelefon}
                  errors={fieldErrors || {}}
                />

                <VerfahrenDetailsFormSection
                  kurzrubrum={verfahren?.kurzrubrum ?? ""}
                  claimReference={claimReference}
                  verfahrensgegenstand={verfahren?.verfahrensgegenstand ?? ""}
                  courtId={courtId}
                  gerichtePromise={gerichte}
                />

                <VerfahrenDocumentsFormSection
                  dokumente={dokumente}
                  uploadedDokumente={uploadedDokumente}
                  submitState={submitState}
                  showFileInputError={showFileInputError}
                  uploadFileInputRef={uploadFileInputRef}
                  onFileInputChange={() => setIsFileInputErrorDismissed(true)}
                  selectedDokumentType={selectedDokumentType}
                  onDokumentTypeChange={setSelectedDokumentType}
                  dokumentTypeError={dokumentTypeError}
                  onDeleteDokument={handleDeleteDokument}
                />

                <div className="kern-gap-md flex flex-wrap justify-end">
                  <div className="kern-gap-md flex">
                    <Link
                      to={`/verfahren/neu?verfahrenId=${verfahren.id}&einreichungId=${einreichung.id}`}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">{buttons.prev}</span>
                    </Link>
                    <Button
                      appearance="primary"
                      type="submit"
                      name="formType"
                      value="submit"
                      disabled={submitState !== "idle"}
                    >
                      <span className="kern-label">
                        {routes.verfahrenNeu.step2.navigation.next}
                      </span>
                      <span
                        className="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </Button>
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
