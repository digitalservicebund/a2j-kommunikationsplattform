import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("No Verfahren ID provided in params");
  }

  const dataPromise = fetchVerfahrenById(request, { id });

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
            {(resolvedData) => <VerfahrenTile {...resolvedData} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
