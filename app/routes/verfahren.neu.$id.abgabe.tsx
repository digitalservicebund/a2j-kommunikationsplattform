import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
import { resolveReadinessPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import VerfahrenAktuelleEinreichungSection from "~/components/verfahren/VerfahrenAktuelleEinreichungSection";
import { DokumentWithValidierungsstatus } from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenEinreichungOutcomeBanner from "~/components/verfahren/VerfahrenEinreichungOutcomeBanner";
import VerfahrenLoader from "~/components/verfahren/VerfahrenLoader.static";
import VerfahrenOverviewCard from "~/components/verfahren/VerfahrenOverviewCard";
import VerfahrenPrototypeHint from "~/components/verfahren/VerfahrenPrototypeHint.static";
import loadVerfahrenEinreichungBundle, {
  EinreichungWithStatus,
  Verfahren,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { requireAuthAndVerfahrenId } from "~/domains/verfahren/application/routeContext.server";
import submitEinreichungIfNeeded from "~/domains/verfahren/application/submitEinreichungIfNeeded.server";
import { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import {
  fetchBelegDownloadLink,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  deleteDokumentFromEinreichung,
  fetchDokumentValidierungsstatus,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type LoaderData = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: DokumentWithValidierungsstatus[];
  beleg: Beleg | null;
};

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

  return {
    verfahren,
    einreichung,
    dokumente: dokumenteWithValidierungsstatus,
    beleg,
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

  // 1) Handle delete flow for an already uploaded document
  if (formType === "delete") {
    const deleteResult = await deleteDokumentFromEinreichung({
      authData,
      verfahrenId,
      einreichungId: formData.get("einreichungId"),
      dokumentId: formData.get("dokumentId"),
    });

    if (deleteResult.status === "invalid-form-data") {
      return redirect(`/verfahren/${verfahrenId}`);
    }

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  // 2) Handle Einreichung submission (no-op if already submitted)
  if (formType === "einreichen") {
    const einreichungId = formData.get("einreichungId") as string;

    await submitEinreichungIfNeeded(authData, { verfahrenId, einreichungId });

    return redirect(`/verfahren/neu/${verfahrenId}/abgabe`);
  }

  // 3) Handle Beleg download link requests
  if (formType === "download-beleg") {
    const belegId = formData.get("belegId") as string;

    const downloadUrl = await fetchBelegDownloadLink(authData, {
      verfahrenId,
      id: belegId,
      dispositionType: "ATTACHMENT",
    });

    return { downloadUrl };
  }

  return redirect(`/verfahren/${verfahrenId}`);
};

export default function VerfahrenNeuBearbeiten() {
  const { verfahren, einreichung, dokumente, beleg } =
    useLoaderData<LoaderData>();
  const { routes, buttons } = useTranslations();

  console.log("einreichung", einreichung);
  console.log("dokumente", dokumente);
  console.log("beleg", beleg);

  console.log("verfahren", verfahren);

  const dokumenteValidierungsstatus = dokumente.map(
    (dokument) => dokument.validierungsstatus,
  );

  const readinessPresentation = resolveReadinessPresentation(
    einreichung.einreichungsStatus,
    routes.verfahrenNeu.step3.summary.badgeLabels,
    dokumenteValidierungsstatus,
  );
  const { readinessLabel, readinessBadgeClass } = readinessPresentation;
  const isValidating = readinessBadgeClass === "info";
  const isBelegReady = beleg !== null && beleg.status === "ERSTELLT";
  const isBelegPending = beleg !== null && !isBelegReady;

  const validationErgebnis = einreichung.einreichungsStatus.ergebnis;
  const hasValidationIssues =
    validationErgebnis === "ROT" || validationErgebnis === "GELB";

  const { formRef, isSubmitting, error, handleSubmit } =
    useEinreichenSubmission({ isValidating, isBelegPending });

  return (
    <div
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
    >
      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
          <h1 className="kern-heading-large">
            {routes.verfahrenNeu.step3.headline}
          </h1>
          <div className="kern-progress">
            <label className="kern-label" htmlFor="progress1">
              {routes.verfahrenNeu.step3.progress}
            </label>
            <progress id="progress-3" value="3" max="3"></progress>
          </div>
          <div className="pt-kern-space-x-large">
            <div className="kern-gap-lg flex flex-col">
              <div className="gap-kern-space-default flex flex-col lg:flex-row">
                <div>
                  <h2 className="kern-heading-medium">
                    {routes.verfahrenNeu.step3.subline}
                  </h2>
                </div>
                {beleg === null && (
                  <div className="kern-justify-content-end flex grow">
                    <div className="gap-kern-space-default flex">
                      <div>
                        <Link
                          to={`/verfahren/neu/${verfahren.id}/bearbeiten`}
                          className="kern-btn kern-btn--secondary"
                        >
                          <span className="kern-label">{buttons.prev}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <VerfahrenPrototypeHint />

              <VerfahrenEinreichungOutcomeBanner
                hasSubmitError={error}
                beleg={beleg}
                isValidating={isValidating}
                hasValidationIssues={hasValidationIssues}
                isValidationErrorFatal={validationErgebnis === "ROT"}
                readinessLabel={readinessLabel}
                fehler={einreichung.einreichungsStatus.fehler}
              />

              <VerfahrenOverviewCard verfahren={verfahren} />

              <section className="space-y-kern-space-default">
                <h3 className="kern-heading-medium">
                  {routes.verfahrenNeu.step3.proceduralSteps.headline}
                </h3>
                <VerfahrenAktuelleEinreichungSection
                  initialEinreichung={{ einreichung, dokumente, beleg }}
                  verfahren={verfahren}
                  readinessPresentation={readinessPresentation}
                  hasValidationIssues={hasValidationIssues}
                  isValidating={isValidating}
                  isSubmitting={isSubmitting}
                  formRef={formRef}
                  handleSubmit={handleSubmit}
                />
              </section>
            </div>
          </div>
          <VerfahrenLoader
            active={isSubmitting === "submitting"}
            label="Wird geladen..."
          />
        </div>
      </div>
    </div>
  );
}
