import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";

export const loader = withSessionLoader(
  async ({ params }: LoaderFunctionArgs) => {
    if (params.id) {
      return {
        data: fetchVerfahrenById({ id: params.id }),
      };
    } else {
      throw new Response(
        "Das Verfahrensdetail konnte nicht abgerufen werden.",
        {
          status: 500,
        },
      );
    }
  },
);

export default function Verfahrendetails() {
  const { data } = useLoaderData<{
    data: Promise<ReturnType<typeof fetchVerfahrenById>>;
  }>();

  const { alerts } = useTranslations();

  return (
    <>
      <h1 className="kern-heading-large">Verfahrensdetails</h1>
      <Alert
        type="warning"
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
