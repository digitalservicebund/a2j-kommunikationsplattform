import VerfahrenTile from "~/components/VerfahrenTile";
import fetchVerfahrenById from "~/services/fetchVerfahrenById.server";
import { Route } from "./+types/_index";

export async function loader({ params, request }: Route.LoaderArgs) {
  /* temporary code START */
  const url = new URL(request.url);
  const dummyData = url.searchParams.get("dummy") === "true";
  if (dummyData) console.warn("Using dummy data!");
  /* temporary code END */

  return {
    data: await fetchVerfahrenById({ id: params.id, dummyData }),
  };
}

export default function Verfahrensdetails({
  loaderData,
}: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <div>
      <h1 className="kern-heading-large mb-kern-space-large">
        Verfahrensdetails
      </h1>
      <div className="flex">
        <VerfahrenTile {...data} />
      </div>
    </div>
  );
}
