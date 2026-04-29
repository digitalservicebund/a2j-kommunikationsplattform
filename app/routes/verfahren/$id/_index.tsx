import { Suspense } from "react";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import { authContext } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const { id } = params;

  if (!id) {
    throw new Error("No Verfahren ID provided in params");
  }

  const dataPromise = fetchVerfahrenById(authData, { id });

  return {
    data: dataPromise,
  };
};

export default function Verfahrendetails() {
  const { data } = useLoaderData<{
    data: Promise<ReturnType<typeof fetchVerfahrenById>>;
  }>();

  const { alerts } = useTranslations();

  return (
    <>
      <h1 className="kern-heading-medium">Verfahrensdetails</h1>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        <Suspense fallback={<VerfahrenTileSkeleton />}>
          <Await resolve={data}>
            {(resolvedData) => (
              <div className="space-y-kern-space-large flex flex-col">
                <div className="flex justify-between">
                  <span
                    className={`kern-badge ${resolvedData.status === "ERSTELLT" ? "kern-badge--info" : "kern-badge--warning"}`}
                  >
                    <span className="kern-label kern-label--small">
                      {resolvedData.status === "ERSTELLT"
                        ? "Klage noch nicht eingereicht"
                        : "Klage eingereicht"}
                    </span>
                  </span>
                  <div className="space-x-kern-space-large">
                    <Link
                      to={`/verfahren/${resolvedData.id}/bearbeiten`}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">Bearbeiten</span>
                    </Link>
                    {resolvedData.status === "ERSTELLT" && (
                      <button
                        type="submit"
                        className="kern-btn kern-btn--primary"
                        onClick={() =>
                          alert(
                            "Klageeinreichung - Funktion noch nicht implementiert",
                          )
                        } // Placeholder for actual submission handler
                      >
                        <span className="kern-label">
                          Klage einreichen & Abgabe ans Gericht
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                <VerfahrenTile {...resolvedData} />
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
