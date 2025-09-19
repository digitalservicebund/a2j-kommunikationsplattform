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
