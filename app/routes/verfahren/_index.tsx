import VerfahrenTile from "~/components/VerfahrenTile";
import fetchVerfahren from "~/services/fetchVerfahren.server";
import { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const offset = Number(url.searchParams.get("offset")) || 0;

  /* temporary code START */
  const dummyData = url.searchParams.get("dummy") === "true";
  if (dummyData) console.warn("Using dummy data!");
  /* temporary code END */

  return {
    verfahren: await fetchVerfahren({ limit, offset, dummyData }),
  };
}

export default function Verfahren({ loaderData }: Route.ComponentProps) {
  const { verfahren } = loaderData;
  return (
    <>
      {/* TODO: For future reference, add new components here  */}
      <h1 className="kern-heading-large">Verfahren</h1>
      <hr className="kern-divider" aria-hidden />
      <h1 className="kern-heading-large">Suche</h1>
      <hr className="kern-divider my-kern-space-large" aria-hidden />

      <div className="mb-kern-space-large gap-y-kern-space-large flex flex-col">
        {verfahren.map((data) => (
          <VerfahrenTile key={data.id} {...data} />
        ))}
      </div>
    </>
  );
}
