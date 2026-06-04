import { Suspense } from "react";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import VerfahrenTileSkeleton from "~/components/verfahren/VerfahrenTileSkeleton.static";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import fetchDokumenteById from "~/domains/verfahren/prototype.fetchDokumenteById.server";
import fetchEinreichungenById from "~/domains/verfahren/prototype.fetchEinreichungenById.server";
import fetchEinreichungStatus from "~/domains/verfahren/prototype.fetchEinreichungStatus.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({
  request,
  context,
  params,
}: LoaderFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const url = new URL(request.url);

  const { id } = params;

  if (!id) {
    throw new Error("No Verfahren ID provided in params");
  }

  const verfahrenDataPromise = fetchVerfahrenById(authData, { id });
  const einreichungenDataPromise = await fetchEinreichungenById(authData, {
    id,
  });

  const filteredEinreichungen = einreichungenDataPromise.filter((e) => {
    return e.verfahren_id === id;
  });

  const einreichungenWithStatus = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => ({
      ...einreichung,
      einreichungsStatus: await fetchEinreichungStatus(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      }),
    })),
  );

  const dokumenteDataPromise = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => {
      const dokumente = await fetchDokumenteById(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      });

      if (!dokumente) {
        return [];
      }

      return dokumente;
    }),
  );

  console.log("Loader: Fetching data for Verfahren ID", id);
  console.log("Loader: Verfahren data promise", verfahrenDataPromise);
  console.log(
    "Loader: Einreichungen with Status for this Verfahren",
    einreichungenWithStatus,
  );

  return {
    verfahren: verfahrenDataPromise,
    einreichungen: einreichungenWithStatus,
    dokumente: dokumenteDataPromise,
    showDebugInfo: url.searchParams.get("showDebug") === "true",
  };
};

export default function Verfahrendetails() {
  const { verfahren, einreichungen, dokumente, showDebugInfo } = useLoaderData<{
    verfahren: Promise<ReturnType<typeof fetchVerfahrenById>>;
    einreichungen: Awaited<
      ReturnType<typeof fetchEinreichungenById>
    > extends Array<infer Einreichung>
      ? Array<
          Einreichung & {
            einreichungsStatus: Awaited<
              ReturnType<typeof fetchEinreichungStatus>
            >;
          }
        >
      : never;
    dokumente: Awaited<ReturnType<typeof fetchDokumenteById>>[];
    showDebugInfo: boolean;
  }>();

  const { alerts, routes } = useTranslations();

  return (
    <>
      <h1 className="kern-heading-medium">
        {routes.verfahrenDetails.headline}
      </h1>
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
          <Alert
            type="info"
            title={alerts.WORK_IN_PROGRESS_TITLE}
            message={alerts.WORK_IN_PROGRESS_MESSAGE}
          />
        </div>
      </div>

      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        <Suspense fallback={<VerfahrenTileSkeleton />}>
          <Await resolve={verfahren}>
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
                          alert("API-Aufruf ist noch nicht implementiert")
                        }
                      >
                        <span className="kern-label">
                          Klage einreichen & Abgabe ans Gericht
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <VerfahrenTile {...resolvedData} withoutDetailsLink={true} />

                {showDebugInfo && (
                  <div>
                    verfahren
                    <br />
                    <code className="whitespace-pre-wrap">
                      {JSON.stringify(resolvedData)}
                    </code>
                  </div>
                )}
              </div>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<div> Lade Einreichungen...</div>}>
          <Await resolve={einreichungen}>
            {(resolvedData) => (
              <>
                {showDebugInfo && (
                  <>
                    <div>
                      einreichungen
                      <br />
                      <code className="whitespace-pre-wrap">
                        {JSON.stringify(resolvedData)}
                      </code>
                    </div>
                    {resolvedData.length === 0 ? (
                      <div>Keine Einreichungen vorhanden.</div>
                    ) : (
                      resolvedData.map((einreichung) => (
                        <div
                          key={einreichung.id}
                          className="kern-border kern-bg-secondary p-kern-space-medium rounded"
                        >
                          <div className="kern-label kern-label--small">
                            Einreichung ID: {einreichung.id} / Verfahren ID:{" "}
                            {einreichung.verfahren_id} / Name:{" "}
                            {einreichung.name}
                          </div>
                          <div className="kern-label kern-label--small">
                            Status: {einreichung.status}
                          </div>
                          <div className="kern-label kern-label--small">
                            Validierungsstatus:{" "}
                            {einreichung.einreichungsStatus.status}
                          </div>
                          <div className="kern-copy">
                            {einreichung.einreichungsStatus.validation_messages
                              .length > 0 ? (
                              <ul className="list-none pl-5">
                                {einreichung.einreichungsStatus.validation_messages.map(
                                  (message, index) => (
                                    <li key={index}>
                                      {message.message
                                        ? message.message
                                        : "no message"}
                                    </li>
                                  ),
                                )}
                              </ul>
                            ) : (
                              <span>Keine Validierungsmeldungen</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<div> Lade Dokumente...</div>}>
          <Await resolve={dokumente}>
            {(resolvedData) => (
              <>
                {showDebugInfo && (
                  <>
                    <div>
                      dokumente
                      <br />
                      <code className="whitespace-pre-wrap">
                        {JSON.stringify(resolvedData)}
                      </code>
                    </div>
                    {resolvedData.length === 0 ? (
                      <div>Keine Dokumente vorhanden.</div>
                    ) : (
                      resolvedData.map((dokumente) => (
                        <div
                          key={dokumente[0].id}
                          className="kern-border kern-bg-secondary p-kern-space-medium rounded"
                        >
                          <div className="kern-label kern-label--small">
                            Dokumente sind vorhanden
                          </div>
                          <div>
                            Dokument ID: {dokumente[0].id} / Dokument name:{" "}
                            {dokumente[0].name} / Dokument size_in_bytes:{" "}
                            {dokumente[0].size_in_bytes}
                          </div>
                          <div>Dokument status: {dokumente[0].status}</div>
                          <div>Dokument type: {dokumente[0].type}</div>
                          <div>
                            Dokument viren_scan_status:{" "}
                            {dokumente[0].viren_scan_status}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
