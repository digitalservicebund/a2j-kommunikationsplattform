import { useEffect, useRef } from "react";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import {
  BeteiligungFieldValues,
  BeteiligungFieldValuesSchema,
} from "~/components/verfahren/beteiligte/BeteiligungFieldset";
import VerfahrenCreationBeteiligungenEditForm from "~/components/verfahren/beteiligte/VerfahrenCreationBeteiligungenEditForm";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import loadKlageeinreichungDraft from "~/domains/verfahren/application/loadKlageeinreichungDraft.server";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import { requireVerfahrenSearchParam } from "~/domains/verfahren/application/verfahrenSearchParam.server";
import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import {
  Anschriftstyp,
  ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT,
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
} from "~/domains/verfahren/entities/codelisten/anschriftstyp.entity";
import { Kanzleiform } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  Rollenbezeichnung,
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import {
  Staat,
  STAAT_CODE_DEUTSCHLAND,
} from "~/domains/verfahren/entities/codelisten/staat.entity";
import {
  Telekommunikationsart,
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/entities/codelisten/telekommunikationsart";
import {
  fetchAnschriftstypen,
  fetchKanzleiformen,
  fetchRechtsformen,
  fetchRollenbezeichnungen,
  fetchStaaten,
  fetchTelekommunikationsarten,
} from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import { updateVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { AnschriftInput } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.input.schema";
import { BeteiligungInput } from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.input.schema";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import { buildBeteiligungInputFromBeteiligung } from "~/domains/verfahren/services/buildBeteiligungenInputFromVerfahren";
import resolveCodeWertId from "~/domains/verfahren/services/resolveCodeWertId";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import { safeParseActionFormData } from "~/utils/actionInput";
import { actionResultFromApiError } from "~/utils/actionResult";
import { logger } from "~/utils/logger.server";
import { Route } from "./+types/verfahren.neu.beteiligte";

// this route requires users to be logged in
export const middleware = [authMiddleware];

// =============================================================================
// Loader
// =============================================================================

export async function loader({ request, context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );

  const { verfahren } = await loadKlageeinreichungDraft(
    authSession,
    verfahrenId,
  );

  const [{ elemente: kanzleiformen }, { elemente: rechtsformen }] =
    await Promise.all([
      fetchKanzleiformen(authSession),
      fetchRechtsformen(authSession),
    ]);

  return {
    verfahren,
    kanzleiformen,
    rechtsformen,
  };
}

// =============================================================================
// Action
// =============================================================================

const ActionInputSchema = z.object({
  beteiligungen: z.array(BeteiligungFieldValuesSchema),
});

/**
 * The code lists used to resolve the CodeWert codes in the form values to the
 * CodeWert IDs expected by the API.
 */
type CodelistenForBuildingBeteiligungInput = {
  anschriftstypen: Anschriftstyp[];
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
  rollenbezeichnungen: Rollenbezeichnung[];
  staaten: Staat[];
  telekommunikationsarten: Telekommunikationsart[];
};

/**
 * The Rollen of the Beteiligungen managed by the form: the Parteien and their
 * Prozessbevollmächtigte.
 */
const FORM_ROLLENBEZEICHNUNG_CODES = [
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
];

function isManagedByForm(beteiligung: Beteiligung): boolean {
  return beteiligung.rollen.some((rolle) =>
    FORM_ROLLENBEZEICHNUNG_CODES.includes(rolle.rollenbezeichnung.code),
  );
}

/**
 * Builds the API input for a Beteiligung from its form values. If the
 * Beteiligung already exists, its data not editable in the form is kept.
 */
function beteiligungInputFromFormValues(
  fieldValues: BeteiligungFieldValues,
  existingBeteiligung: Beteiligung | undefined,
  codelisten: CodelistenForBuildingBeteiligungInput,
): BeteiligungInput {
  const input: BeteiligungInput = existingBeteiligung
    ? buildBeteiligungInputFromBeteiligung(existingBeteiligung)
    : {
        beteiligtenart: "natuerlichePerson",
        rollen: [],
        anschriften: [],
        telekommunikationen: [],
        vorname: null,
        titel: null,
        namensvorsatz: null,
        nachname: "",
      };

  setRolle(input, fieldValues, codelisten);
  setAnschrift(input, fieldValues, codelisten);
  settelekommunikationen(input, fieldValues, codelisten);
  setBeteiligtenartSpecificFields(input, fieldValues, codelisten);

  return input;
}

function setRolle(
  input: BeteiligungInput,
  fieldValues: BeteiligungFieldValues,
  codelisten: CodelistenForBuildingBeteiligungInput,
) {
  input.rollen = fieldValues.rollen.map((rolle) => ({
    rollennummer: rolle.rollennummer ?? null,
    rollenbezeichnungId: resolveCodeWertId(
      codelisten.rollenbezeichnungen,
      rolle.rollenbezeichnungCode,
    ),
    referenz: rolle.referenz,
    geschaeftszeichen: rolle.geschaeftszeichen ?? null,
  }));
}

function setAnschrift(
  input: BeteiligungInput,
  fieldValues: BeteiligungFieldValues,
  codelisten: CodelistenForBuildingBeteiligungInput,
) {
  input.anschriften ??= [];

  const primaryAnschriftstypCode =
    fieldValues.beteiligtenart === "natuerlichePerson"
      ? ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT
      : ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT;

  const newAnschrift: AnschriftInput = {
    anschriftstypId: resolveCodeWertId(
      codelisten.anschriftstypen,
      primaryAnschriftstypCode,
    ),
    strasse: fieldValues.strasse ?? "",
    hausnummer: fieldValues.hausnummer ?? "",
    postleitzahl: fieldValues.postleitzahl ?? "",
    ort: fieldValues.ort ?? "",
    postfachnummer: null,
    staatId: resolveCodeWertId(codelisten.staaten, STAAT_CODE_DEUTSCHLAND),
  };

  // Overwrite the Anschrift with the same Anschriftstyp if it exists.
  // Otherwise, add a new Anschrift. Possible other Anschriften are preserved.

  const existingAnschriftIndex = input.anschriften.findIndex(
    (anschrift) => anschrift.anschriftstypId === newAnschrift.anschriftstypId,
  );

  if (existingAnschriftIndex >= 0) {
    input.anschriften[existingAnschriftIndex] = newAnschrift;
  } else {
    input.anschriften.push(newAnschrift);
  }
}

function settelekommunikationen(
  input: BeteiligungInput,
  fieldValues: BeteiligungFieldValues,
  codelisten: CodelistenForBuildingBeteiligungInput,
) {
  setTelekommunikation(
    input,
    resolveCodeWertId(
      codelisten.telekommunikationsarten,
      TELEKOMMUNIKATIONSART_CODE_EMAIL,
    ),
    fieldValues.email,
  );
  setTelekommunikation(
    input,
    resolveCodeWertId(
      codelisten.telekommunikationsarten,
      TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
    ),
    fieldValues.telefon,
  );
}

function setTelekommunikation(
  input: BeteiligungInput,
  telekommunikationsartId: string,
  verbindung: string | null | undefined,
) {
  input.telekommunikationen ??= [];

  const telekommunikation = input.telekommunikationen.find(
    (a) => a.telekommunikationsartId === telekommunikationsartId,
  );

  if (verbindung) {
    if (telekommunikation) {
      telekommunikation.verbindung = verbindung;
    } else {
      input.telekommunikationen.push({
        telekommunikationsartId,
        verbindung,
      });
    }
  } else if (telekommunikation) {
    const anschlussIndex = input.telekommunikationen.indexOf(telekommunikation);
    input.telekommunikationen.splice(anschlussIndex, 1);
  }
}

function setBeteiligtenartSpecificFields(
  input: BeteiligungInput,
  fieldValues: BeteiligungFieldValues,
  codelisten: CodelistenForBuildingBeteiligungInput,
) {
  input.beteiligtenart = fieldValues.beteiligtenart;
  switch (input.beteiligtenart) {
    case "natuerlichePerson":
      input.vorname = fieldValues.vorname ?? null;
      input.nachname = fieldValues.nachname ?? "";
      break;
    case "organisation":
      input.bezeichnung = fieldValues.bezeichnung ?? "";
      break;
    case "raKanzlei":
      input.bezeichnung = fieldValues.bezeichnung ?? "";
      input.kanzleiformId = fieldValues.kanzleiformCode
        ? resolveCodeWertId(
            codelisten.kanzleiformen,
            fieldValues.kanzleiformCode,
          )
        : "";
      input.rechtsformId = fieldValues.rechtsformCode
        ? resolveCodeWertId(codelisten.rechtsformen, fieldValues.rechtsformCode)
        : null;
      break;
  }
}

/**
 * Saves the user-defined list of Beteilungen in the Verfahren.
 *
 * The array of Beteiligungen (conforming to {@link ActionInputSchema})
 * is expected form data, with of each Beteiligung's fields specified as
 * individual key-value pairs; the nesting is indicated using bracket notation,
 * e.g. "beteiligungen[0][vorname]".
 *
 * Existing Beteiligungen are referenced by their ID. The Parteien and
 * Prozessbevollmächtigte in the form data replace the existing ones, so those
 * missing from the form data are removed; other existing Beteiligungen (e.g.,
 * Streitverkündete) are kept unchanged.
 */
export async function action({ request, context }: Route.ActionArgs) {
  const authSession = requireAuthSession(context, "action");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );

  const input = safeParseActionFormData(
    await request.formData(),
    ActionInputSchema,
    { parseNestingSyntax: true },
  );

  if (!input.success) {
    logger.debug(input.error.data, "Invalid Beteiligungen update input");
    return input.error;
  }

  try {
    // Fetch the Klageeinreichung draft and the code lists required for
    // building the API inputs.
    const [
      { verfahren },
      { elemente: anschriftstypen },
      { elemente: kanzleiformen },
      { elemente: rechtsformen },
      { elemente: rollenbezeichnungen },
      { elemente: staaten },
      { elemente: telekommunikationsarten },
    ] = await Promise.all([
      loadKlageeinreichungDraft(authSession, verfahrenId),
      fetchAnschriftstypen(authSession),
      fetchKanzleiformen(authSession),
      fetchRechtsformen(authSession),
      fetchRollenbezeichnungen(authSession),
      fetchStaaten(authSession),
      fetchTelekommunikationsarten(authSession),
    ]);
    const codelisten: CodelistenForBuildingBeteiligungInput = {
      anschriftstypen,
      kanzleiformen,
      rechtsformen,
      rollenbezeichnungen,
      staaten,
      telekommunikationsarten,
    };

    // Build the Beteiligung inputs for the API from the form data. This
    // throws if the form data contains a code missing from its code list.
    const existingBeteiligungen = verfahren.beteiligungen ?? [];
    const existingBeteiligungenById = new Map(
      existingBeteiligungen.map((beteiligung) => [beteiligung.id, beteiligung]),
    );
    const submittedBeteiligungInputs = input.data.beteiligungen.map(
      (fieldValues) =>
        beteiligungInputFromFormValues(
          fieldValues,
          fieldValues.id
            ? existingBeteiligungenById.get(fieldValues.id)
            : undefined,
          codelisten,
        ),
    );

    // The API replaces all Beteiligungen, so keep the existing ones not
    // managed by the form (e.g., Streitverkündete) unchanged. Parteien and
    // Prozessbevollmächtigte missing from the form data are removed.
    const submittedIds = new Set(
      input.data.beteiligungen.map((fieldValues) => fieldValues.id),
    );
    const unchangedBeteiligungInputs = existingBeteiligungen
      .filter(
        (beteiligung) =>
          !isManagedByForm(beteiligung) && !submittedIds.has(beteiligung.id),
      )
      .map(buildBeteiligungInputFromBeteiligung);

    const beteiligungInputs = [
      ...submittedBeteiligungInputs,
      ...unchangedBeteiligungInputs,
    ];

    await updateVerfahren(
      authSession,
      verfahrenId,
      VerfahrenAendernInputSchema.parse({
        verfahrensgegenstand: verfahren.verfahrensgegenstand!,
        kurzrubrum: verfahren.kurzrubrum!,
        gerichtId: verfahren.gericht!.id,
        beteiligungen: beteiligungInputs,
      }),
    );
  } catch (error) {
    // Let redirects thrown by `loadKlageeinreichungDraft()` through (e.g. once
    // the Klageeinreichung has been submitted).
    if (error instanceof Response) {
      throw error;
    }
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
    });
  }

  return redirect(`/verfahren/${verfahrenId}`);
}

// =============================================================================
// Component
// =============================================================================

export default function VerfahrenNeuBeteiligte({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { verfahren, kanzleiformen, rechtsformen } = loaderData;

  const isInvalid = actionData?.status === "invalid";
  const isError = actionData?.status === "error";

  const { routes, buttons, shared } = useTranslations();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const errorAlertRef = useRef<HTMLDivElement>(null);
  const invalidAlertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isError) {
      errorAlertRef.current?.focus();
      // errorAlertRef.current?.scrollIntoView();
    } else if (isInvalid) {
      invalidAlertRef.current?.focus();
      invalidAlertRef.current?.scrollIntoView();
    }
  }, [isError, isInvalid]);

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
                method="post"
                encType="multipart/form-data"
                className="kern-gap-lg flex flex-col"
              >
                <div className="kern-gap-md flex flex-wrap items-start justify-between">
                  {/* Intro */}
                  <div>
                    <h2 className="kern-heading-medium">
                      {routes.verfahrenNeu.beteiligte.subline}
                    </h2>
                    <p className="kern-body">
                      {routes.verfahrenNeu.beteiligte.intro}
                    </p>
                  </div>

                  {/* Navigtion Buttons (Top) */}
                  <div className="kern-gap-md flex">
                    <Link
                      to={buildKlageeinreichungPath("details", {
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
                      label={routes.verfahrenNeu.beteiligte.navigation.next}
                      icon="arrow-forward"
                      iconPosition="trailing"
                    />
                  </div>
                </div>

                {isError && (
                  <Alert
                    ref={errorAlertRef}
                    type="error"
                    title={shared.form.submit.title}
                    message={actionData.error ?? shared.form.submit.message}
                  />
                )}

                {isInvalid && (
                  <Alert
                    ref={invalidAlertRef}
                    type="error"
                    title={shared.form.invalid.title}
                    message={shared.form.invalid.message}
                  />
                )}

                <div className="kern-gap-lg flex flex-col">
                  <VerfahrenCreationBeteiligungenEditForm
                    existingBeteiligungen={verfahren.beteiligungen ?? []}
                    kanzleiformen={kanzleiformen}
                    rechtsformen={rechtsformen}
                  />

                  {/* Navigation Buttons (Bottom) */}
                  <div className="kern-gap-md flex flex-wrap justify-end">
                    <div className="kern-gap-md flex">
                      <Link
                        to={buildKlageeinreichungPath("details", {
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
                        label={routes.verfahrenNeu.beteiligte.navigation.next}
                        icon="arrow-forward"
                        iconPosition="trailing"
                      />
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
