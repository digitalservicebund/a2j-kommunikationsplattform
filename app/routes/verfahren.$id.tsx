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
                      <span className="kern-label">
                        {resolvedData.status === "ERSTELLT"
                          ? "Bearbeitung"
                          : "Weitere Optionen"}
                      </span>
                    </Link>
                    {resolvedData.status === "ERSTELLT" && (
                      <button
                        type="submit"
                        className="kern-btn kern-btn--primary"
                        onClick={() =>
                          alert(
                            "POST /api/v1/verfahren/{verfahren-id}/* ist an dieser Stelle noch nicht verfügbar. Wir arbeiten daran.",
                          )
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
                {resolvedData.length === 0 ? (
                  <div>Keine Einreichungen vorhanden.</div>
                ) : (
                  <div className="kern-table-responsive">
                    <table className="kern-table kern-table--striped">
                      <caption className="kern-title kern-title--small">
                        Einreichungen
                      </caption>

                      <thead className="kern-table__head">
                        <tr className="kern-table__row">
                          <th scope="col" className="kern-table__header">
                            ID
                          </th>
                          <th scope="col" className="kern-table__header">
                            Verfahren ID
                          </th>
                          <th scope="col" className="kern-table__header">
                            Name
                          </th>
                          <th scope="col" className="kern-table__header">
                            Status
                          </th>
                          <th scope="col" className="kern-table__header">
                            Validierungsinfo
                          </th>
                        </tr>
                      </thead>

                      <tbody className="kern-table__body">
                        {resolvedData.map((einreichung) => (
                          <tr key={einreichung.id} className="kern-table__row">
                            <td className="kern-table__cell">
                              {einreichung.id}
                            </td>
                            <td className="kern-table__cell">
                              {einreichung.verfahren_id}
                            </td>
                            <td className="kern-table__cell">
                              {einreichung.name}
                            </td>
                            <td className="kern-table__cell">
                              {einreichung.einreichungsStatus.status}
                            </td>
                            <td className="kern-table__cell">
                              {einreichung.einreichungsStatus
                                .validation_messages.length > 0 ? (
                                einreichung.einreichungsStatus.validation_messages.map(
                                  (message, index) => (
                                    <span key={einreichung.id + index}>
                                      {message.message
                                        ? message.message
                                        : "no message"}
                                    </span>
                                  ),
                                )
                              ) : (
                                <span>Keine Validierungsmeldungen</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {showDebugInfo && (
                  <div>
                    einreichungen
                    <br />
                    <code className="whitespace-pre-wrap">
                      {JSON.stringify(resolvedData)}
                    </code>
                  </div>
                )}
              </>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<div> Lade Dokumente...</div>}>
          <Await resolve={dokumente}>
            {(resolvedData) => (
              <>
                {resolvedData.length === 0 ? (
                  <div>Keine Dokumente vorhanden.</div>
                ) : (
                  <div className="kern-table-responsive">
                    <table className="kern-table kern-table--striped">
                      <caption className="kern-title kern-title--small">
                        Dokumente
                      </caption>

                      <thead className="kern-table__head">
                        <tr className="kern-table__row">
                          <th scope="col" className="kern-table__header">
                            ID
                          </th>
                          <th scope="col" className="kern-table__header">
                            Name
                          </th>
                          <th scope="col" className="kern-table__header">
                            Größe in Bytes
                          </th>
                          <th scope="col" className="kern-table__header">
                            Status
                          </th>
                          <th scope="col" className="kern-table__header">
                            Virenscanstatus
                          </th>
                        </tr>
                      </thead>

                      <tbody className="kern-table__body">
                        {resolvedData.map((dokumente) => (
                          <tr key={dokumente[0].id} className="kern-table__row">
                            <td className="kern-table__cell">
                              {dokumente[0].id}
                            </td>
                            <td className="kern-table__cell">
                              {dokumente[0].name}
                            </td>
                            <td className="kern-table__cell">
                              {dokumente[0].size_in_bytes}
                            </td>
                            <td className="kern-table__cell">
                              {dokumente[0].status}
                            </td>
                            <td className="kern-table__cell">
                              {dokumente[0].viren_scan_status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {showDebugInfo && (
                  <div>
                    dokumente
                    <br />
                    <code className="whitespace-pre-wrap">
                      {JSON.stringify(resolvedData)}
                    </code>
                  </div>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
