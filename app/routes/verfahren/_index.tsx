import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";

import z from "zod";
import { useVerfahrenState } from "~/components/hooks/useVerfahrenState";
import InputSelect from "~/components/InputSelect";
import { VerfahrenCountInfo } from "~/components/verfahren/VerfahrenCountInfo";
import { VERFAHREN_SKELETONS } from "~/constants/verfahrenSkeletons";
import { CodeWertSchema, newVerfahrenSchema } from "~/models/VerfahrenSchema";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchGerichteService from "~/services/verfahren/fetchGerichte.service";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Route } from "./+types/_index";

export type Verfahren = z.infer<typeof newVerfahrenSchema>;
export type Gericht = z.infer<typeof CodeWertSchema>;

export type VerfahrenLoaderData = {
  items: Verfahren[];
  hasMoreItems: boolean;
};

export type DeferredVerfahrenData = {
  verfahren: Promise<VerfahrenLoaderData>;
  gerichte: Gericht[]; // No longer a promise
};

export const VERFAHREN_PAGE_LIMIT = 10;

export const loader = withSessionLoader(
  async ({
    request,
  }: Route.LoaderArgs): Promise<
    VerfahrenLoaderData | DeferredVerfahrenData
  > => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset")) || 0;

    const verfahrenPromise = fetchVerfahren(request, {
      limit: VERFAHREN_PAGE_LIMIT + 1,
      offset,
    }).then((verfahren) => {
      const hasMoreItems = verfahren.length > VERFAHREN_PAGE_LIMIT;
      const paginatedItems = hasMoreItems
        ? verfahren.slice(0, VERFAHREN_PAGE_LIMIT)
        : verfahren;

      return { items: paginatedItems, hasMoreItems };
    });

    const gerichte = await fetchGerichteService(request); // Await here

    if (offset > 0) {
      const verfahrenData = await verfahrenPromise;
      return { ...verfahrenData, gerichte };
    }

    return {
      verfahren: verfahrenPromise,
      gerichte, // Already resolved
    };
  },
);

export default function Verfahren() {
  const data = useLoaderData<DeferredVerfahrenData>();

  return (
    <>
      <VerfahrenHeading />
      <div className="my-kern-space-large space-y-kern-space-large flex flex-col">
        <Suspense
          fallback={VERFAHREN_SKELETONS.map((s) => (
            <VerfahrenTileSkeleton key={s.id} />
          ))}
        >
          <Await resolve={data.verfahren}>
            {(verfahrenData) => (
              <VerfahrenContent
                initialData={verfahrenData}
                gerichte={data.gerichte}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function VerfahrenContent({
  initialData,
  gerichte,
}: Readonly<{
  initialData: VerfahrenLoaderData;
  gerichte: Gericht[];
}>) {
  console.log("gerichte:", gerichte);
  const { allItems, hasMoreItems, isLoading, handleLoadMore } =
    useVerfahrenState(initialData);

  return (
    <>
      {/* Filters can be added here in the future */}
      <InputSelect
        label="Zuständiges Gericht"
        defaultOption="Alle anzeigen"
        options={gerichte}
      />
      <VerfahrenCountInfo count={allItems.length || 0} />
      <VerfahrenList verfahrenItems={allItems} isLoading={isLoading} />
      {hasMoreItems && <VerfahrenLoadMoreButton loadMore={handleLoadMore} />}
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
