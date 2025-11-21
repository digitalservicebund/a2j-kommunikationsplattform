import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import Alert from "~/components/Alert";
import ContentPage from "~/components/ContentPage";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/VerfahrenTile";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { useTranslations } from "~/services/translations/context";
import { fetchVerfahrenFromNewApi } from "~/services/verfahren/prototype.fetchVerfahrenFromNewApi.server";

// Number of skeletons per page (could change in the future)
const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

export const loader = withSessionLoader(
  async ({ request }: LoaderFunctionArgs) => {
    const newVerfahren = fetchVerfahrenFromNewApi(request);

    return {
      newVerfahren,
    };
  },
);

export default function KomPlaIdPTestPage() {
  type NewVerfahrenPromise = ReturnType<typeof fetchVerfahrenFromNewApi>;
  type NewVerfahren = Awaited<NewVerfahrenPromise>;

  const { newVerfahren } = useLoaderData<{
    newVerfahren: NewVerfahrenPromise;
  }>();

  return (
    <ContentPage title="KomPla IdP Test">
      <p>Debug newVerfahren data</p>
      <hr />

      <VerfahrenHeading />
      <div className="my-kern-space-large space-y-kern-space-large flex flex-col">
        <Suspense
          fallback={SKELETONS.map((s) => (
            <VerfahrenTileSkeleton key={s.id} />
          ))}
        >
          <Await resolve={newVerfahren}>
            {(resolvedVerfahren: NewVerfahren | null) =>
              (resolvedVerfahren ?? []).map((data) => (
                <VerfahrenTile key={data.id} {...data} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </ContentPage>
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
