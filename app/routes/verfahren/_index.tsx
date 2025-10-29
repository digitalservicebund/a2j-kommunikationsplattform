import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";

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

    const verfahren = fetchVerfahren({ limit, offset });

    return {
      verfahren,
    };
  },
);

export default function Verfahren() {
  const { verfahren } = useLoaderData<{
    verfahren: Promise<ReturnType<typeof fetchVerfahren>>;
  }>();

  return (
    <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
      <Suspense
        fallback={SKELETONS.map((s) => (
          <VerfahrenTileSkeleton key={s.id} />
        ))}
      >
        <Await resolve={verfahren}>
          {(resolvedVerfahren) =>
            resolvedVerfahren.map((data) => (
              <VerfahrenTile key={data.id} {...data} />
            ))
          }
        </Await>
      </Suspense>
    </div>
  );
}

export function ErrorBoundary() {
  const { errorMessages } = useTranslations();
  return (
    <Alert
      type="error"
      title={errorMessages.GENERIC_ERROR_LABEL}
      message={errorMessages.VERFAHREN_ERROR_MESSAGE}
    />
  );
}
