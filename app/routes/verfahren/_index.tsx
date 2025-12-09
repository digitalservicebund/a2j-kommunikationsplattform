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
import { VerfahrenCountInfo } from "~/components/verfahren/VerfahrenCountInfo";
import { VERFAHREN_PAGE_LIMIT } from "~/constants/verfahren";
import { VERFAHREN_SKELETONS } from "~/constants/verfahrenSkeletons";
import { GerichtDTO, newVerfahrenSchema } from "~/models/VerfahrenSchema";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import fetchGerichteService from "~/services/verfahren/fetchGerichte.service";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";
import { Route } from "./+types/_index";

export type Verfahren = z.infer<typeof newVerfahrenSchema>;
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
    // We can add more filters here later ⬆️

    // Fetch verfahren with one extra item to determine if there are more items
    const verfahrenPromise: Promise<VerfahrenLoaderData> = (async () => {
      const verfahren = await fetchVerfahren(request, {
        limit: VERFAHREN_PAGE_LIMIT + 1,
        offset,
        gericht,
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
  const { params, setParam } = useParamsState({
    gericht: "",
  });

  const gerichteOptions = gerichte.map((g) => ({ value: g.id, label: g.wert }));

  return (
    <>
      <InputSelect
        label="Zuständiges Gericht"
        name="gericht"
        selectedValue={params.gericht || ""} // gerichtID
        placeholder={labels.SHOW_ALL_LABEL}
        options={gerichteOptions}
        onChange={(e) => setParam("gericht", e.target.value || "")}
        disabled={isLoading || gerichteOptions.length === 0} // TODO: add the condition for 0 results in initial load, see https://digitalservicebund.atlassian.net/browse/KOMMPLA-910
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
