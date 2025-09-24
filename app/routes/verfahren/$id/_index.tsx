import { LoaderFunctionArgs, useLoaderData } from "react-router";
import VerfahrenTile from "~/components/VerfahrenTile";
import WorkInProgressAlert from "~/components/WorkInProgressAlert.static";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";

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
