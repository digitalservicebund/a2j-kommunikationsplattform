import VerfahrenTile from "~/components/VerfahrenTile";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const offset = Number(url.searchParams.get("offset")) || 0;

  return {
    verfahren: await fetchVerfahren({ limit, offset }),
  };
}

export default function Verfahren({ loaderData }: Route.ComponentProps) {
  const { verfahren } = loaderData;

  return (
    <>
      <h1 className="kern-heading-large">Verfahren</h1>

      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        {verfahren.map((data) => (
          <VerfahrenTile key={data.id} {...data} />
        ))}
      </div>
    </>
  );
}
