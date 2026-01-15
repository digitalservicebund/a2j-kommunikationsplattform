import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import { useLoadMore } from "~/components/hooks/useLoadMore";
import { useParamsState } from "~/components/hooks/useParamsState";
import InputSelect from "~/components/InputSelect";
import Search from "~/components/Search";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import { VerfahrenCounter } from "~/components/verfahren/VerfahrenCounter";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";
import { sortOptions, VERFAHREN_PAGE_LIMIT } from "~/config/verfahren";
import { VERFAHREN_SKELETONS } from "~/config/verfahrenSkeletons";
import { GerichtDTO, VerfahrenSchema } from "~/models/VerfahrenSchema";
import { authContext } from "~/services/auth/auth.context";
import { useTranslations } from "~/services/translations/context";
import fetchGerichteService from "~/services/verfahren/fetchGerichte.service";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";

export type Verfahren = z.infer<typeof VerfahrenSchema>;
export type Gericht = z.infer<typeof GerichtDTO>;

export type VerfahrenLoaderData = {
  items: Verfahren[];
  hasMoreItems: boolean;
};

export type LoaderData = {
  verfahren: Promise<VerfahrenLoaderData>;
  gerichte: Gericht[];
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  console.log("context in verfahren loader", context.get(authContext));
  const headersCookie = request.headers.get("Cookie") || "";
  console.log("headersCookie in verfahren loader", headersCookie);
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset") || "0");
  const gericht = url.searchParams.get("gericht");
  const sort = url.searchParams.get("sort") || sortOptions[0].value;
  const search_text = url.searchParams.get("search_text");

  console.log("search_text", search_text);
  // Fetch verfahren with one extra item to determine if there are more items
  const verfahrenPromise: Promise<VerfahrenLoaderData> = (async () => {
    const verfahren = await fetchVerfahren(request, {
      limit: VERFAHREN_PAGE_LIMIT + 1,
      offset,
      gericht,
      sort,
      search_text,
    });

    const hasMoreItems = verfahren.length > VERFAHREN_PAGE_LIMIT;
    const items = hasMoreItems
      ? verfahren.slice(0, VERFAHREN_PAGE_LIMIT)
      : verfahren;

    return { items, hasMoreItems };
  })();

  const gerichte = await fetchGerichteService(request);

  return {
    verfahren: verfahrenPromise,
    gerichte,
  };
};

export default function Verfahren() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <VerfahrenHeading />
      <div className="mt-kern-space-large space-y-kern-space-large flex flex-col">
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
  const { labels } = useTranslations();
  const { allItems, hasMoreItems, isLoading, handleLoadMore } =
    useLoadMore(initialData);
  const { getParamValue, updateParam } = useParamsState<{
    sort: "";
    gericht: "";
    search_text: "";
  }>();

  const gerichteOptions = gerichte.map((g) => ({ value: g.id, label: g.wert }));

  const hasFilters = Boolean(
    getParamValue("search_text") || Boolean(getParamValue("gericht")),
  );

  // isInputSelectDisabled when loading, or when no items have been returned and no filters are applied
  const isInputDisabled = isLoading || (!hasFilters && allItems.length === 0);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("search_text");

    updateParam("search_text", (value as string) || null);
  };

  return (
    <>
      <Search
        handleSearch={handleSearch}
        disabled={isInputDisabled}
        defaultValue={getParamValue(`search_text`) || ""}
        id="search_text"
      />
      <div className="space-x-kern-space-x-large flex items-start justify-between">
        <InputSelect
          label={labels.COURT_LABEL}
          id="gericht"
          placeholder={labels.SHOW_ALL_LABEL}
          options={gerichteOptions}
          onChange={(e) => updateParam("gericht", e.target.value || null)}
          disabled={isInputDisabled}
          selectedValue={getParamValue("gericht") || ""}
          className="grow"
        />
        <InputSelect
          label={labels.SORT_LABEL}
          id="sort"
          options={sortOptions}
          onChange={(e) =>
            updateParam("sort", e.target.value || sortOptions[0].value)
          }
          disabled={isInputDisabled}
          selectedValue={getParamValue("sort") || sortOptions[0].value}
          className="grow"
        />
      </div>
      <VerfahrenCounter count={allItems.length || 0} hasFilters={hasFilters} />
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
