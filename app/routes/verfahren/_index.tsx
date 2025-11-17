import { Suspense, useEffect, useState } from "react";
import { Await, useFetcher, useLoaderData } from "react-router";
import { z } from "zod";

import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import { VERFAHREN_PAGE_LIMIT } from "~/constants/verfahren";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Route } from "./+types/_index";

type Verfahren = z.infer<typeof VerfahrenSchema>;

const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

export const loader = withSessionLoader(
  async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || VERFAHREN_PAGE_LIMIT;
    const offset = Number(url.searchParams.get("offset")) || 0;

    const verfahren = fetchVerfahren({ limit, offset });

    // If this is a fetcher request (has offset), return resolved data
    if (offset > 0) {
      return await verfahren;
    }

    // For initial load, return deferred promise for Suspense
    return { verfahren };
  },
);

export default function Verfahren() {
  const { verfahren } = useLoaderData<typeof fetchVerfahren>();

  return (
    <>
      <VerfahrenHeading />
      <div className="my-kern-space-large space-y-kern-space-large flex flex-col">
        <Suspense
          fallback={SKELETONS.map((s) => (
            <VerfahrenTileSkeleton key={s.id} />
          ))}
        >
          <Await resolve={verfahren}>
            {(data) => <VerfahrenList initialData={data} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function VerfahrenList({
  initialData,
}: Readonly<{
  initialData: Awaited<ReturnType<typeof fetchVerfahren>>;
}>) {
  const fetcher = useFetcher<Awaited<ReturnType<typeof fetchVerfahren>>>();
  const [allVerfahren, setAllVerfahren] = useState<Verfahren[]>(
    initialData.verfahren,
  );
  const [hasMore, setHasMore] = useState<boolean>(initialData.hasMore);
  console.log("Initial VerfahrenList data:", initialData);

  useEffect(() => {
    const data = fetcher.data;
    console.log("Fetcher data changed:", data);
    if (!data) return;
    setAllVerfahren((prev) => [...prev, ...data.verfahren]);
    setHasMore(data.hasMore);
  }, [fetcher.data]);

  const handleLoadMore = () => {
    const formData = new FormData();
    formData.set("limit", String(VERFAHREN_PAGE_LIMIT));
    formData.set("offset", String(allVerfahren.length));
    fetcher.submit(formData, { method: "get" });
  };

  const isLoading = fetcher.state === "loading";

  return (
    <>
      <p className="kern-body kern-body--muted">
        {`${allVerfahren.length} Verfahren`}
      </p>
      {allVerfahren.map((data) => (
        <VerfahrenTile key={data.id} {...data} />
      ))}
      {isLoading && SKELETONS.map((s) => <VerfahrenTileSkeleton key={s.id} />)}
      {hasMore && (
        <div className="flex justify-center">
          <button type="button" className="kern-btn kern-btn--tertiary">
            <span
              className="kern-icon kern-icon--arrow-down kern-icon--default"
              aria-hidden="true"
            ></span>
            <span className="kern-label" onClick={handleLoadMore}>
              Weitere Verfahren laden
            </span>
          </button>
        </div>
      )}
    </>
  );
}

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

const VerfahrenHeading = () => (
  <h1 className="kern-heading-medium">Verfahren</h1>
);
