import React, { Ref, RefObject, Suspense, useRef } from "react";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import { useLoadMore } from "~/components/hooks/useLoadMore";
import { useParamsState } from "~/components/hooks/useParamsState";
import ScrollToTopButton from "~/components/ScrollToTopButton";
import { sortOptions } from "~/components/verfahren/presentation/sortOptions";
import { VERFAHREN_SKELETONS } from "~/components/verfahren/presentation/verfahrenSkeletons";
import { VerfahrenCounter } from "~/components/verfahren/VerfahrenCounter";
import VerfahrenFilterBar from "~/components/verfahren/VerfahrenFilterBar";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";
import VerfahrenTileSkeleton from "~/components/verfahren/VerfahrenTileSkeleton.static";
import { requireAuthData } from "~/domains/verfahren/application/routeContext.server";
import type { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import {
  fetchVerfahren,
  FetchVerfahrenOptions,
} from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VERFAHREN_PAGE_LIMIT } from "~/domains/verfahren/services/verfahrenListOptions";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

export type VerfahrenLoaderData = {
  items: Verfahren[];
  hasMoreItems: boolean;
};

export type LoaderData = {
  verfahren: Promise<VerfahrenLoaderData>;
  gerichte: Promise<CodeWert[]>;
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authData = requireAuthData(context, "loader");

  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset") || "0");
  const gericht = url.searchParams.get("gericht");
  const sort = (url.searchParams.get("sort") ||
    sortOptions[0].value) as FetchVerfahrenOptions["sort"];
  const search_text = url.searchParams.get("search_text");

  // TODO: refactor the handling of below promises
  // Fetch verfahren with one extra item to determine if there are more items
  const verfahrenPromise = (async () => {
    const verfahren = await fetchVerfahren(authData, {
      limit: VERFAHREN_PAGE_LIMIT + 1,
      offset,
      gericht,
      sort,
      search_text,
    });

    const hasMoreItems = verfahren.elemente.length > VERFAHREN_PAGE_LIMIT;
    const items: Verfahren[] = hasMoreItems
      ? verfahren.elemente.slice(0, VERFAHREN_PAGE_LIMIT)
      : verfahren.elemente;

    return { items, hasMoreItems };
  })();

  const gerichtePromise = (async () => {
    const { elemente } = await fetchGerichte(authData);

    return elemente;
  })();

  return {
    data: Promise.all([verfahrenPromise, gerichtePromise]),
    showDebugInfo: url.searchParams.get("showDebug") === "true",
  };
};

export default function VerfahrenRoute() {
  const { data, showDebugInfo } = useLoaderData<{
    data: Promise<[VerfahrenLoaderData, CodeWert[]]>;
    showDebugInfo: boolean;
  }>();
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className="mb-kern-dimension-small flex justify-between">
        <VerfahrenHeading ref={headingRef} />
        <Link
          to="/verfahren/neu"
          className="kern-btn kern-btn--secondary my-2.5"
        >
          <span className="kern-label">Neues Verfahren anlegen</span>
          <span
            className="kern-icon kern-icon--arrow-forward"
            aria-hidden="true"
          ></span>
        </Link>
      </div>
      <div className="space-y-kern-space-large flex flex-col">
        <Suspense
          fallback={VERFAHREN_SKELETONS.map((s) => (
            <VerfahrenTileSkeleton key={s.id} />
          ))}
        >
          <Await resolve={data}>
            {([verfahrenData, gerichte]) => (
              <>
                {showDebugInfo && (
                  <>
                    verfahren
                    <br />
                    <code>{JSON.stringify(verfahrenData, null, 2)}</code>
                    <hr
                      className="kern-divider border-kern-layout-border w-full"
                      aria-hidden="true"
                    />
                    gerichte
                    <br />
                    <code>{JSON.stringify(gerichte, null, 2)}</code>
                    <hr
                      className="kern-divider border-kern-layout-border w-full"
                      aria-hidden="true"
                    />
                  </>
                )}
                <VerfahrenContent
                  initialData={verfahrenData}
                  gerichte={gerichte}
                  ref={headingRef}
                />
              </>
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
  ref,
}: Readonly<{
  initialData: VerfahrenLoaderData;
  gerichte: CodeWert[];
  ref: RefObject<HTMLHeadingElement | null>;
}>) {
  const { allItems, hasMoreItems, isLoading, handleLoadMore } =
    useLoadMore(initialData);
  const { getParamValue, updateParam } = useParamsState<{
    sort: "";
    gericht: "";
    search_text: "";
  }>();

  const hasFilters = Boolean(
    getParamValue("search_text") || Boolean(getParamValue("gericht")),
  );

  // isInputSelectDisabled when loading, or when no items have been returned and no filters are applied
  const isInputDisabled = isLoading || (!hasFilters && allItems.length === 0);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("search_text");

    updateParam("search_text", (value as string) || null);
  };

  return (
    <>
      <VerfahrenFilterBar
        gerichte={gerichte}
        isInputDisabled={isInputDisabled}
        searchDefaultValue={getParamValue("search_text") || ""}
        onSearch={handleSearch}
        gerichtValue={getParamValue("gericht") || ""}
        onGerichtChange={(e) => updateParam("gericht", e.target.value || null)}
        sortValue={getParamValue("sort") || sortOptions[0].value}
        onSortChange={(e) =>
          updateParam("sort", e.target.value || sortOptions[0].value)
        }
      />
      <VerfahrenCounter count={allItems.length || 0} hasFilters={hasFilters} />
      <VerfahrenList verfahrenItems={allItems} isLoading={isLoading} />
      <ScrollToTopButton refElement={ref} />
      {hasMoreItems && <VerfahrenLoadMoreButton loadMore={handleLoadMore} />}
    </>
  );
}

const VerfahrenHeading = ({ ref }: { ref?: Ref<HTMLHeadingElement> }) => {
  const { routes } = useTranslations();
  return (
    <h1 ref={ref} className="kern-heading-medium">
      {routes.index.headline}
    </h1>
  );
};

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
