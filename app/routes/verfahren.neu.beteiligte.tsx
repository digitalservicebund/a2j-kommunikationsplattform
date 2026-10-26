import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import VerfahrenBeklagterSection from "~/components/verfahren/VerfahrenBeklagterSection";
import VerfahrenKlaegerSection from "~/components/verfahren/VerfahrenKlaegerSection";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import { config } from "~/config/config";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import loadKlageeinreichungDraft, {
  requireVerfahrenSearchParam,
} from "~/domains/verfahren/application/loadKlageeinreichungDraft.server";
import regenerateEinreichungXJustiz from "~/domains/verfahren/application/regenerateEinreichungXJustiz.server";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import {
  fetchAnschriftstypen,
  fetchKanzleiformen,
  fetchRollenbezeichnungen,
  fetchStaaten,
  fetchTelekommunikationsarten,
} from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import {
  fetchVerfahrenById,
  updateVerfahren,
} from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
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
import resolveCodeWertId from "~/domains/verfahren/services/resolveCodeWertId";
import {
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
  STAAT_CODE_DEUTSCHLAND,
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/services/verfahrenCodeConstants";
import { authMiddleware } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  safeParseActionFormData,
  safeParseActionInput,
} from "~/utils/actionInput";
import { actionResultFromApiError } from "~/utils/actionResult";
import { dispatchFormAction } from "~/utils/dispatchFormAction";
import { Route } from "./+types/verfahren.neu.beteiligte";

type CodeWertItem = z.infer<typeof CodeWertSchema>;

// Dev-only convenience data for the "Fill details with dummy data" button below.
const DUMMY_FORM_VALUES = {
  klagendeParteiVorname: "Test-Klaeger-Vorname",
  klagendeParteiNachname: "Test-Klaeger-Nachname",
  klagendeParteiStrasse: "Teststraße",
  klagendeParteiHausnummer: "1",
  klagendeParteiPlz: "12345",
  klagendeParteiOrt: "Testort",
  klagendeParteiEmail: "test-klaeger@test.de",
  klagendeParteiTelefon: "0123456789",
  lawyerName: "Test-Kanzlei",
  lawyerKanzleiformId: "Einzelanwalt",
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
};

function fillFormFields(form: HTMLFormElement, values: Record<string, string>) {
  Object.entries(values).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);

    if (field instanceof HTMLInputElement) {
      field.value = value;
    } else if (field instanceof HTMLSelectElement) {
      for (const option of field.options) {
        if (option.value === value || option.textContent === value) {
          field.value = option.value;
          break;
        }
      }
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

export async function loader({ request, context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );

  const { verfahren, einreichung } = await loadKlageeinreichungDraft(
    authSession,
    verfahrenId,
  );

  const { elemente: kanzleiformen } = await fetchKanzleiformen(authSession);

  return {
    verfahren,
    einreichung,
    kanzleiformen,
  };
}

type FormActionContext = {
  authSession: AuthSession;
  verfahrenId: string;
};

const SubmitInputSchema = z.object({
  einreichungId: z.string().min(1),
  // buildBeteiligungFromFormValues() silently omits a Partei from the
  // submission when their Nachname is blank instead of failing — validate
  // it here first so a blank Nachname is reported as a field error rather
  // than the party quietly disappearing from the Klage.
  klagendeParteiNachname: z.string().min(1, {
    error:
      de.routes.verfahrenNeu.beteiligte.form.validation.klagendeParteiNachname,
  }),
  beklagteParteiNachname: z.string().min(1, {
    error:
      de.routes.verfahrenNeu.beteiligte.form.validation.beklagteParteiNachname,
  }),
  hasLawyer: z
    .string()
    .optional()
    .transform((value) => !!value),
  // TODO: Validate all inputs here
});

const LawyerRequiredFieldsSchema = z.object({
  lawyerName: z.string().min(1, {
    error: de.routes.verfahrenNeu.beteiligte.form.validation.lawyerName,
  }),
  lawyerKanzleiformId: z.string().min(1, {
    error: de.routes.verfahrenNeu.beteiligte.form.validation.lawyerKanzleiform,
  }),
});

// Persists the Verfahren and its Beteiligungen, then regenerates the
// resulting XJustiz document.
async function handleSubmitAction(
  formData: FormData,
  { authSession, verfahrenId }: FormActionContext,
) {
  const actionResultData = {
    formType: "submit",
  } as const;

  const submitInput = safeParseActionFormData(formData, SubmitInputSchema, {
    errorResultData: actionResultData,
  });

  if (!submitInput.success) {
    return submitInput.error;
  }

  const { einreichungId, hasLawyer } = submitInput.data;

  if (hasLawyer) {
    const lawyerRequiredFields = safeParseActionFormData(
      formData,
      LawyerRequiredFieldsSchema,
      { errorResultData: actionResultData },
    );
    if (!lawyerRequiredFields.success) {
      return lawyerRequiredFields.error;
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
      fetchStaaten(authSession),
      fetchAnschriftstypen(authSession),
      fetchTelekommunikationsarten(authSession),
      fetchRollenbezeichnungen(authSession),
    ]);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
      data: actionResultData,
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

  // Persist the Verfahren and regenerate the resulting XJustiz document.
  // The Verfahrensdetails are kept as saved in the /neu step.
  try {
    const verfahren = await fetchVerfahrenById(authSession, {
      id: verfahrenId,
    });

    const verfahrenUpdateInput = safeParseActionInput(
      {
        verfahrensgegenstand: verfahren.verfahrensgegenstand,
        kurzrubrum: verfahren.kurzrubrum,
        gerichtId: verfahren.gericht?.id,
        beteiligungen: beteiligungen.length > 0 ? beteiligungen : null,
      },
      VerfahrenAendernInputSchema,
      { errorResultData: actionResultData },
    );

    if (!verfahrenUpdateInput.success) {
      return verfahrenUpdateInput.error;
    }

    await updateVerfahren(authSession, verfahrenId, verfahrenUpdateInput.data);
    await regenerateEinreichungXJustiz(authSession, {
      verfahrenId,
      einreichungId,
    });
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
      data: actionResultData,
    });
  }

  return redirect(`/verfahren/${verfahrenId}`);
}

const formActionHandlers = {
  submit: handleSubmitAction,
} as const;

export const action = async ({ request, context }: Route.ActionArgs) => {
  const authSession = requireAuthSession(context, "action");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );

  const formData = await request.formData();

  return dispatchFormAction(
    formData,
    formActionHandlers,
    { authSession, verfahrenId },
    () => undefined,
  );
};

export default function VerfahrenNeuBearbeiten({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { verfahren, einreichung, kanzleiformen } = loaderData;
  console.log("verfahren", verfahren);

  const isInvalid = actionData?.status === "invalid";
  const isError = actionData?.status === "error";
  const fieldErrors = isInvalid ? actionData.fieldErrors : undefined;

  const { routes, buttons, shared } = useTranslations();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const mainFormRef = useRef<HTMLFormElement>(null);

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

  const [hasLawyer, setHasLawyer] = useState(hasExistingLawyer);

  // To be used in development for easier manual testing
  // TODO: delete after full implementation
  const handleFillDummyData = () => {
    const form = mainFormRef.current;

    if (!form) {
      return;
    }

    // The lawyer fields only mount once hasLawyer becomes true, so force
    // a synchronous re-render before filling the other form fields.
    flushSync(() => {
      setHasLawyer(true);
    });

    fillFormFields(form, DUMMY_FORM_VALUES);
  };

  return (
    <>
      <PageMetadata />

      <div
        className={`${isSubmitting ? "pointer-events-none opacity-50" : ""} relative`}
      >
        <div className="kern-row">
          <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
            <h1 className="kern-heading-large">
              {routes.verfahrenNeu.beteiligte.headline}
            </h1>

            <Progress
              id="progress-3"
              label={routes.verfahrenNeu.beteiligte.progress}
              value={3}
              max={3}
            />

            <div className="kern-pt-xl">
              <Form
                ref={mainFormRef}
                method="post"
                encType="multipart/form-data"
                className="kern-gap-lg flex flex-col"
              >
                <input
                  type="hidden"
                  name="einreichungId"
                  value={einreichung.id}
                />

                <div className="kern-gap-md flex flex-wrap items-start justify-between">
                  {/* Intro */}
                  <div>
                    <h2 className="kern-heading-medium">
                      {routes.verfahrenNeu.beteiligte.subline}
                    </h2>
                    <p className="kern-body">
                      {routes.verfahrenNeu.beteiligte.intro}
                    </p>
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

                  {/* Navigtion Buttons (Top) */}
                  <div className="kern-gap-md flex">
                    <Link
                      to={buildKlageeinreichungPath("verfahrendetails", {
                        verfahren: verfahren.id,
                      })}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">{buttons.prev}</span>
                    </Link>
                    <Button
                      appearance="primary"
                      type="submit"
                      name="formType"
                      value="submit"
                      disabled={isSubmitting}
                    >
                      <span className="kern-label">
                        {routes.verfahrenNeu.beteiligte.navigation.next}
                      </span>
                      <span
                        className="kern-icon kern-icon--arrow-forward"
                        aria-hidden="true"
                      ></span>
                    </Button>
                  </div>
                </div>

                {/* Success / Error Alert */}
                <Alert
                  type="success"
                  title={routes.verfahrenNeu.beteiligte.notification.headline}
                  message={routes.verfahrenNeu.beteiligte.notification.copy}
                />

                {isError && (
                  <Alert
                    type="error"
                    title={shared.form.submit.title}
                    message={actionData.error ?? shared.form.submit.message}
                  />
                )}

                <div className="kern-gap-lg flex flex-col">
                  {/* Form Section: Klagende Partei */}
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
                    kanzleiformen={kanzleiformen}
                    errors={fieldErrors || {}}
                  />

                  {/* Form Section: Beklagte Partei */}
                  <VerfahrenBeklagterSection
                    firstName={beklagteParteiFirstName}
                    lastName={beklagteParteiLastName}
                    anschrift={beklagteParteiAnschrift}
                    email={beklagteParteiEmail}
                    telefon={beklagteParteiTelefon}
                    errors={fieldErrors || {}}
                  />

                  {/* Navigation Buttons (Bottom) */}
                  <div className="kern-gap-md flex flex-wrap justify-end">
                    <div className="kern-gap-md flex">
                      <Link
                        to={buildKlageeinreichungPath("verfahrendetails", {
                          verfahren: verfahren.id,
                        })}
                        className="kern-btn kern-btn--secondary"
                      >
                        <span className="kern-label">{buttons.prev}</span>
                      </Link>
                      <Button
                        appearance="primary"
                        type="submit"
                        name="formType"
                        value="submit"
                        disabled={isSubmitting}
                      >
                        <span className="kern-label">
                          {routes.verfahrenNeu.beteiligte.navigation.next}
                        </span>
                        <span
                          className="kern-icon kern-icon--arrow-forward"
                          aria-hidden="true"
                        ></span>
                      </Button>
                    </div>
                  </div>

                  <VerfahrenLoader
                    active={isSubmitting}
                    label="Wird geladen..."
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
