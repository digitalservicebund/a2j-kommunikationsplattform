import VerfahrenTile from "~/components/VerfahrenTile";
import fetchVerfahrenById from "~/services/verfahren/fetchVerfahrenById.server";
import { Route } from "./+types/_index";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    data: await fetchVerfahrenById({ id: params.id }),
  };
}

export default function Verfahrensdetails({
  loaderData,
}: Route.ComponentProps) {
  const { data } = loaderData;

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
