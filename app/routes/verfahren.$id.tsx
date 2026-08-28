import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { useEinreichenSubmission } from "~/components/hooks/useEinreichenSubmission";
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
  einreichungen: EinreichungSummary[];
  initialEinreichung: InitialEinreichungData | null;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { authData, verfahrenId } = requireAuthAndVerfahrenId(
    context,
    params,
    "loader",
  );

  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  );

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
    return { verfahren, einreichungen, initialEinreichung: null };
  }

  const { einreichung, dokumente } = initialEinreichungData;

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
    einreichungen,
    initialEinreichung: {
      einreichung,
      dokumente: dokumenteWithValidierungsstatus,
      beleg,
    },
  };
};

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
  const formType = formData.get("formType");

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

    return redirect(`/verfahren/${verfahrenId}`);
  }

  if (formType === "einreichen") {
    const einreichungId = formData.get("einreichungId") as string;

    await submitEinreichungIfNeeded(authData, { verfahrenId, einreichungId });

    return redirect(`/verfahren/${verfahrenId}`);
  }

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

export default function VerfahrenId() {
  const { verfahren, einreichungen, initialEinreichung } =
    useLoaderData<LoaderData>();
  const { routes } = useTranslations();

  console.log("verfahren", verfahren);
  console.log("einreichungen", einreichungen);

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
    useEinreichenSubmission({ isValidating, isBelegPending });

  return (
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
              fehler={
                initialEinreichung?.einreichung.einreichungsStatus.fehler ?? []
              }
            />

            <VerfahrenOverviewCard verfahren={verfahren} />

            <section className="space-y-kern-space-default">
              <h3 className="kern-heading-medium">
                {routes.verfahrenId.headline}
              </h3>
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
  );
}
