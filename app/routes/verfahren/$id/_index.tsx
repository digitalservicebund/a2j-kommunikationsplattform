import { LoaderFunctionArgs, useLoaderData } from "react-router";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import WorkInProgressAlert from "~/components/WorkInProgressAlert.static";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";
import type { Route } from "../../../../.react-router/types/app/routes/verfahren/$id/+types/_index";

export const loader = withSessionLoader(
  async ({ params }: LoaderFunctionArgs) => {
    if (params.id) {
      return {
        data: await fetchVerfahrenById({ id: params.id }),
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

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return await serverLoader();
}

// Enable client-side hydration for this loader.
// This ensures that HydrateFallback is shown during loading and the data is rehydrated after navigation.
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <>
      <h1 className="kern-heading-large">Verfahrensdetails</h1>
      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        <VerfahrenTileSkeleton />
      </div>
    </>
  );
}

export default function Verfahrendetails() {
  const { data } = useLoaderData<{
    data: Awaited<ReturnType<typeof fetchVerfahrenById>>;
  }>();
  return (
    <>
      <h1 className="kern-heading-large">Verfahrensdetails</h1>
      <WorkInProgressAlert />
      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        <VerfahrenTile {...data} />
      </div>
    </>
  );
}
