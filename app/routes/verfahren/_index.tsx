import { LoaderFunctionArgs, useLoaderData } from "react-router";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import type { Route } from "./+types/_index";

// Number of skeletons per page (could change in the future)
const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

export const loader = withSessionLoader(
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const offset = Number(url.searchParams.get("offset")) || 0;

    const verfahren = await fetchVerfahren({ limit, offset });
    return {
      verfahren,
    };
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
      <h1 className="kern-heading-large">Verfahren</h1>
      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        {SKELETONS.map((s) => (
          <VerfahrenTileSkeleton key={s.id} />
        ))}
      </div>
    </>
  );
}

export default function Verfahren() {
  const { verfahren } = useLoaderData<{
    verfahren: Awaited<ReturnType<typeof fetchVerfahren>>;
  }>();

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
