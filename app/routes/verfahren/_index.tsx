import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import { z } from "zod";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";

import { useVerfahrenState } from "~/components/hooks/useVerfahrenState";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Paginated, paginateWithPeek } from "~/util/pagination";
import { Route } from "./+types/_index";

export type Verfahren = z.infer<typeof VerfahrenSchema>;

const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

export const VERFAHREN_PAGE_LIMIT = 5;

export const loader = withSessionLoader(
  async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset")) || 0;

    const verfahrenPromise = fetchVerfahren({
      // Fetch one more item than the page limit to check for "hasMore"
      limit: VERFAHREN_PAGE_LIMIT + 1,
      offset,
    }).then((items) => paginateWithPeek(items, VERFAHREN_PAGE_LIMIT));

    // If this is a fetcher request (has offset), return resolved data
    if (offset > 0) {
      return await verfahrenPromise;
    }
    // For initial load, return deferred promise for Suspense
    return {
      verfahren: verfahrenPromise,
    };
  },
);

export default function Verfahren() {
  const data = useLoaderData<{ verfahren: Promise<Paginated<Verfahren>> }>();

  return (
    <>
      <VerfahrenHeading />
      <div className="my-kern-space-large space-y-kern-space-large flex flex-col">
        <Suspense
          fallback={SKELETONS.map((s) => (
            <VerfahrenTileSkeleton key={s.id} />
          ))}
        >
          <Await resolve={data.verfahren}>
            {(data) => <VerfahrenContent initialData={data} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function VerfahrenContent({
  initialData,
}: Readonly<{
  initialData: Paginated<Verfahren>;
}>) {
  const { allItems, hasMore, isLoading, handleLoadMore } =
    useVerfahrenState(initialData);

  return (
    <>
      <p className="kern-body kern-body--muted">
        {`${allItems.length} Verfahren`}
      </p>
      {/* Filters can be added here in the future */}
      <VerfahrenList verfahrenItems={allItems} isLoading={isLoading} />
      {hasMore && <VerfahrenLoadMoreButton loadMore={handleLoadMore} />}
    </>
  );
}

const VerfahrenHeading = () => (
  <h1 className="kern-heading-medium">Verfahren</h1>
);

export function ErrorBoundary() {
  const { errorMessages } = useTranslations();
  return (
    <div className="space-y-kern-space-large">
      <VerfahrenHeading />
      <Alert
        type="error"
        title={errorMessages.GENERIC_ERROR_LABEL}
        message={errorMessages.API_GET_VERFAHREN_ERROR_MESSAGE}
      />
    </div>
  );
}
