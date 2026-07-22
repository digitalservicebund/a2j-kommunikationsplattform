import { Suspense } from "react";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import VerfahrenTileSkeleton from "~/components/verfahren/VerfahrenTileSkeleton.static";
import fetchDokumente from "~/domains/verfahren/fetchDokumente";
import fetchEinreichungenById from "~/domains/verfahren/fetchEinreichungenById.server";
import fetchEinreichungStatus from "~/domains/verfahren/fetchEinreichungStatus.server";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import { DokumentSchema } from "~/domains/verfahren/schemas/dokumentSchema";
import { EinreichungSchema } from "~/domains/verfahren/schemas/einreichungSchema";
import { StatusSchema } from "~/domains/verfahren/schemas/statusSchema";
import { VerfahrenSchema } from "~/domains/verfahren/schemas/verfahrenSchema";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type Verfahren = z.infer<typeof VerfahrenSchema>;
type Einreichung = z.infer<typeof EinreichungSchema>;
type EinreichungStatus = z.infer<typeof StatusSchema>;
type Dokument = z.infer<typeof DokumentSchema>;
type EinreichungWithStatus = Einreichung & {
  einreichungsStatus: EinreichungStatus;
};
type LoaderData = {
  verfahren: Promise<Verfahren>;
  einreichungen: EinreichungWithStatus[];
  dokumente: Dokument[][];
  showDebugInfo: boolean;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({
  // request,
  context,
  params,
}: LoaderFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const { id } = params;

  if (!id) {
    throw new Error("No Verfahren ID provided in params");
  }

  const verfahrenDataPromise = fetchVerfahrenById(authData, {
    id,
  }) as Promise<Verfahren>;
  const einreichungenDataPromise = (await fetchEinreichungenById(authData, {
    id,
  })) as Einreichung[];

  const filteredEinreichungen = einreichungenDataPromise.filter((e) => {
    return e.verfahren_id === id;
  });

  const einreichungenWithStatus: EinreichungWithStatus[] = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => ({
      ...einreichung,
      einreichungsStatus: (await fetchEinreichungStatus(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      })) as EinreichungStatus,
    })),
  );

  const dokumenteDataPromise: Dokument[][] = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => {
      const dokumente = (await fetchDokumente(authData, {
        verfahrenId: einreichung.verfahren_id,
        einreichungId: einreichung.id,
      })) as Dokument[];

      if (!dokumente) {
        return [];
      }

      return dokumente;
    }),
  );

  return {
    verfahren: verfahrenDataPromise,
    einreichungen: einreichungenWithStatus,
    dokumente: dokumenteDataPromise,
  };
};

export default function Verfahrendetails() {
  const { verfahren } = useLoaderData<LoaderData>();
  const { alerts } = useTranslations();

  return (
    <>
      <h1 className="kern-heading-medium">Klagende Partei / Beklagte Partei</h1>
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
            {(resolvedData: Verfahren) => (
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
                      to={`/verfahren/${resolvedData.id}`}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">Zurück zur Übersicht</span>
                    </Link>
                  </div>
                </div>

                <VerfahrenTile {...resolvedData} withoutDetailsLink={true} />

                <div>
                  Noch nicht implementiert: Die Bearbeitung eines Verfahrens.
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
