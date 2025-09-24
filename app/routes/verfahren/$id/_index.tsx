import { LoaderFunctionArgs, useLoaderData } from "react-router";
import VerfahrenTile from "~/components/VerfahrenTile";
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

      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        <div
          className="kern-alert kern-alert--warning my-kern-space-default"
          role="alert"
        >
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--warning kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">Work in progress</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">
              Diese Seite ist noch in der Entwicklung. Darstellungen und Layouts
              können sich jederzeit ändern.
            </p>
          </div>
        </div>
        <VerfahrenTile {...data} />
      </div>
    </>
  );
}
