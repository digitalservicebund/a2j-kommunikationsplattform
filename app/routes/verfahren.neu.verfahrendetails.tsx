import { Form, Link, redirect, useNavigation } from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { PageMetadata } from "~/components/PageMetadata";
import Progress from "~/components/Progress";
import VerfahrenDetailsFormSection from "~/components/verfahren/VerfahrenDetailsFormSection";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import loadKlageeinreichungDraft, {
  requireVerfahrenSearchParam,
} from "~/domains/verfahren/application/loadKlageeinreichungDraft.server";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import {
  fetchVerfahrenById,
  updateVerfahren,
} from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VerfahrenAendernInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.input.schema";
import buildBeteiligungenInputFromVerfahren from "~/domains/verfahren/services/buildBeteiligungenInputFromVerfahren";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import de from "~/services/translations/de";
import {
  safeParseActionFormData,
  safeParseActionInput,
} from "~/utils/actionInput";
import { actionResultFromApiError } from "~/utils/actionResult";
import { Route } from "./+types/verfahren.neu.verfahrendetails";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export async function loader({ request, context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );

  const { verfahren, dokumente } = await loadKlageeinreichungDraft(
    authSession,
    verfahrenId,
  );

  // The Klageschrift is required before the Klage can be described further
  if (!dokumente.some(({ typ }) => typ === "SCHRIFTSTUECK")) {
    throw redirect(
      buildKlageeinreichungPath("dokumente", { verfahren: verfahrenId }),
    );
  }

  return { verfahren };
}

const VerfahrenDetailsInputSchema = z.object({
  subjectMatterOfTheProceedings: z.string().min(1, {
    error:
      de.routes.verfahrenNeu.verfahrendetails.form.validation
        .verfahrensgegenstand,
  }),
  claimRubrum: z.string().optional(),
});

// Persists the Verfahrensdetails and continues with the Beteiligten.
export async function action({ request, context }: Route.ActionArgs) {
  const authSession = requireAuthSession(context, "action");
  const verfahrenId = requireVerfahrenSearchParam(
    new URL(request.url).searchParams,
  );
  const actionResultData = { formType: "submit" } as const;

  const input = safeParseActionFormData(
    await request.formData(),
    VerfahrenDetailsInputSchema,
    { errorResultData: actionResultData },
  );

  if (!input.success) {
    return input.error;
  }

  const { subjectMatterOfTheProceedings, claimRubrum } = input.data;

  try {
    // The court is fixed once the Verfahren has been created, and the
    // Beteiligungen (already entered when coming back from the next step) are
    // resent unchanged, as the update replaces them
    const verfahren = await fetchVerfahrenById(authSession, {
      id: verfahrenId,
    });

    const verfahrenUpdateInput = safeParseActionInput(
      {
        verfahrensgegenstand: subjectMatterOfTheProceedings,
        kurzrubrum: claimRubrum || null,
        gerichtId: verfahren.gericht?.id,
        beteiligungen: buildBeteiligungenInputFromVerfahren(
          verfahren.beteiligungen,
        ),
      },
      VerfahrenAendernInputSchema,
      { errorResultData: actionResultData },
    );

    if (!verfahrenUpdateInput.success) {
      return verfahrenUpdateInput.error;
    }

    await updateVerfahren(authSession, verfahrenId, verfahrenUpdateInput.data);
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
      data: actionResultData,
    });
  }

  return redirect(
    buildKlageeinreichungPath("beteiligte", { verfahren: verfahrenId }),
  );
}

export default function VerfahrenNeuVerfahrendetails({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { verfahren } = loaderData;

  const { shared, routes, buttons } = useTranslations();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const isError = actionData?.status === "error";
  const fieldErrors =
    actionData?.status === "invalid" ? actionData.fieldErrors : undefined;

  return (
    <>
      <PageMetadata />

      <div
        className={`${isSubmitting ? "pointer-events-none opacity-50" : ""} relative`}
      >
        <div className="kern-row">
          <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
            <h1 className="kern-heading-large">
              {routes.verfahrenNeu.verfahrendetails.headline}
            </h1>
            <Progress
              id="progress-2"
              label={routes.verfahrenNeu.verfahrendetails.progress}
              value={2}
              max={3}
            />

            <Form
              method="post"
              className="kern-pt-xl kern-gap-lg flex flex-col"
            >
              {isError && (
                <Alert
                  type="error"
                  title={shared.form.submit.title}
                  message={actionData.error ?? shared.form.submit.message}
                />
              )}

              <VerfahrenDetailsFormSection
                kurzrubrum={verfahren.kurzrubrum ?? ""}
                claimReference={verfahren.aktenzeichenGericht ?? ""}
                verfahrensgegenstand={verfahren.verfahrensgegenstand ?? ""}
                gericht={verfahren.gericht}
                errors={fieldErrors}
              />

              <div className="kern-gap-md flex flex-wrap justify-end">
                <Link
                  to={buildKlageeinreichungPath("dokumente", {
                    verfahren: verfahren.id,
                  })}
                  className="kern-btn kern-btn--secondary"
                >
                  <span className="kern-label">{buttons.prev}</span>
                </Link>
                <Button
                  appearance="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="kern-label">
                    {routes.verfahrenNeu.verfahrendetails.navigation.next}
                  </span>
                  <span
                    className="kern-icon kern-icon--arrow-forward"
                    aria-hidden="true"
                  ></span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <VerfahrenLoader active={isSubmitting} label={shared.loading} />
      </div>
    </>
  );
}
