import { LoaderFunctionArgs, useLoaderData } from "react-router";
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

const SkeletonBlock = () => (
  <div className="space-y-kern-space-x-large w-full">
    <div className="space-y-kern-space-small">
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-352"></div>
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-224"></div>
    </div>
    <div className="space-y-kern-space-small">
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-352"></div>
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-224"></div>
    </div>
  </div>
);

const VerfahrenTileSkeleton = () => {
  return (
    <div className="gap-kern-space-large py-kern-dimension-large px-kern-space-default border-kern-layout-border rounded-kern-default pulse flex w-full flex-col items-center border">
      <div className="space-x-kern-space-small flex w-full">
        <SkeletonBlock />
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
      <div className="bg-kern-feedback-loader-background rounded-kern-default h-1 w-full"></div>
      <div className="flex w-full">
        <div className="space-y-kern-space-x-large w-full">
          <div className="bg-kern-feedback-loader-background h-kern-dimension-x-large rounded-kern-default w-352"></div>
        </div>
      </div>
    </div>
  );
};
