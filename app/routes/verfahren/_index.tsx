import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";

import z from "zod";
import { useLoadMore } from "~/components/hooks/useLoadMore";
import { useParamsState } from "~/components/hooks/useParamsState";
import InputSelect from "~/components/InputSelect";
import InputText from "~/components/InputText";
import { VerfahrenCounter } from "~/components/verfahren/VerfahrenCounter";
import { sortOptions, VERFAHREN_PAGE_LIMIT } from "~/constants/verfahren";
import { VERFAHREN_SKELETONS } from "~/constants/verfahrenSkeletons";
import { GerichtDTO, VerfahrenSchema } from "~/models/VerfahrenSchema";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchGerichteService from "~/services/verfahren/fetchGerichte.service";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Route } from "./+types/_index";

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

export const loader = withSessionLoader(
  async ({ request }: Route.LoaderArgs): Promise<LoaderData> => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || "0");
    const gericht = url.searchParams.get("gericht") || "";
    const sort = url.searchParams.get("sort") || sortOptions[0].value;

    // Fetch verfahren with one extra item to determine if there are more items
    const verfahrenPromise: Promise<VerfahrenLoaderData> = (async () => {
      const verfahren = await fetchVerfahren(request, {
        limit: VERFAHREN_PAGE_LIMIT + 1,
        offset,
        gericht,
        sort,
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
  },
);

export default function Verfahren() {
  const data = useLoaderData<LoaderData>();

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
  const { labels } = useTranslations();
  const { allItems, hasMoreItems, isLoading, handleLoadMore } =
    useLoadMore(initialData);
  const { getParamValue, updateParams, searchParams } = useParamsState({
    sort: sortOptions[0].value, // default sort=eingereicht_am
    gericht: "",
    search_text: "",
  });

  const hasFilters = false;
  console.log("hasFilters:", hasFilters);

  const gerichteOptions = gerichte.map((g) => ({ value: g.id, label: g.wert }));

  // isInputSelectDisabled when loading, or no options, or no filters and no items
  const isInputSelectDisabled =
    isLoading ||
    gerichteOptions.length === 0 ||
    (!hasFilters && allItems.length === 0);

  console.log(
    "paramsObject",
    Object.fromEntries(Array.from(searchParams.entries())),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("search_text") || "";

    updateParams({ search_text: (value as string) || null }, true); // we don't accept files here, so it's safe to cast a string
  };

  console.log("params.search_text", getParamValue(`search_text`));

  return (
    <>
      <search>
        <form onSubmit={handleSubmit}>
          <InputText
            label="Suche"
            placeholder="Freie Textsuche zum Beispiel nach Aktenzeichen, Parteien, Gerichten, ..."
            id="search_text"
            defaultValue={getParamValue(`search_text`) || ""}
          />
          <button type="submit" className="kern-btn kern-btn--primary">
            <span
              className="kern-icon kern-icon--search kern-icon--default"
              aria-hidden="true"
            ></span>
            <span className="kern-label">Suchen</span>
          </button>
        </form>
      </search>
      <InputSelect
        label="Sortierung"
        id="sort"
        options={sortOptions}
        onChange={(e) =>
          updateParams({ sort: e.target.value || sortOptions[0].value })
        }
        disabled={isInputSelectDisabled}
        selectedValue={getParamValue("sort") || sortOptions[0].value}
      />
      <InputSelect
        label="Zuständiges Gericht"
        id="gericht"
        placeholder={labels.SHOW_ALL_LABEL}
        options={gerichteOptions}
        onChange={(e) => updateParams({ gericht: e.target.value || null })}
        disabled={isInputSelectDisabled}
        selectedValue={getParamValue("gericht") || ""}
      />
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
