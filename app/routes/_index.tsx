import React, { Ref, RefObject, Suspense, useRef } from "react";
import { Await, Link, useLoaderData } from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import { useLoadMore } from "~/components/hooks/useLoadMore";
import { useParamsState } from "~/components/hooks/useParamsState";
import Loader from "~/components/Loader";
import { PageMetadata } from "~/components/PageMetadata";
import ScrollToTopButton from "~/components/ScrollToTopButton";
import { sortOptions } from "~/components/verfahren/presentation/sortOptions";
import { VerfahrenCounter } from "~/components/verfahren/VerfahrenCounter";
import VerfahrenFilterBar from "~/components/verfahren/VerfahrenFilterBar";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";
import { VerfahrenTable } from "~/components/verfahren/VerfahrenTable";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import type { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import {
  fetchVerfahren,
  FetchVerfahrenOptionsSchema,
} from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { VERFAHREN_PAGE_LIMIT } from "~/domains/verfahren/services/verfahrenListOptions";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import { Route } from "./+types/_index";

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

const SearchParamsSchema = FetchVerfahrenOptionsSchema.pick({
  offset: true,
  gericht: true,
  sort: true,
  search_text: true,
}).extend({
  showDebugInfo: z.boolean().default(false),
});

export const loader = async ({ context, url }: Route.LoaderArgs) => {
  const authSession = requireAuthSession(context, "loader");

  let { data: searchParams } = SearchParamsSchema.safeParse({
    offset: url.searchParams.get("offset"),
    gericht: url.searchParams.get("gericht"),
    sort: url.searchParams.get("sort"),
  });

  if (!searchParams) {
    searchParams = {
      offset: 0,
      showDebugInfo: false,
    };
  }

  const { offset, gericht, sort, search_text, showDebugInfo } = searchParams;

  const verfahrenPromise = (async () => {
    const verfahren = await fetchVerfahren(authSession, {
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
    const { elemente } = await fetchGerichte(authSession);

    return elemente;
  })();

  return {
    data: Promise.all([verfahrenPromise, gerichtePromise]),
    showDebugInfo,
  };
};

export default function VerfahrenRoute() {
  const t = useTranslations();
  const { data, showDebugInfo } = useLoaderData<{
    data: Promise<[VerfahrenLoaderData, CodeWert[]]>;
    showDebugInfo: boolean;
  }>();
  const { routes } = useTranslations();
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <PageMetadata />

      <div className="mb-(--kern-metric-dimension-small) flex justify-between">
        <VerfahrenHeading ref={headingRef} />

        <div className="kern-gap-md flex">
          <Link to="/beitreten" className="kern-btn kern-btn--secondary">
            <span
              className="kern-icon kern-icon--arrow-forward"
              aria-hidden="true"
            ></span>
            <span className="kern-label">
              {routes.index.redeemBeitrittscode}
            </span>
          </Link>

          <Link to="/verfahren/neu" className="kern-btn kern-btn--primary">
            <span
              className="kern-icon kern-icon--add"
              aria-hidden="true"
            ></span>
            <span className="kern-label">{routes.index.createVerfahren}</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col space-y-(--kern-metric-space-large)">
        <Suspense fallback={<Loader accessibilityLabel={t.shared.loading} />}>
          <Await resolve={data}>
            {([verfahrenData, gerichte]) => (
              <>
                {showDebugInfo && (
                  <>
                    verfahren
                    <br />
                    <code>{JSON.stringify(verfahrenData, null, 2)}</code>
                    <hr
                      className="kern-divider w-full border-(--kern-color-layout-border)"
                      aria-hidden="true"
                    />
                    gerichte
                    <br />
                    <code>{JSON.stringify(gerichte, null, 2)}</code>
                    <hr
                      className="kern-divider w-full border-(--kern-color-layout-border)"
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
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const value = formData.get("search_text") as string | null;
    updateParam("search_text", value || null);
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
      <VerfahrenTable items={allItems} isLoading={isLoading} />
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
    <div className="space-y-(--kern-metric-space-large)">
      <VerfahrenHeading />
      <Alert
        type="error"
        title={errorMessages.GENERIC_ERROR_LABEL}
        message={errorMessages.API_GET_VERFAHREN_ERROR_MESSAGE}
      />
    </div>
  );
}
