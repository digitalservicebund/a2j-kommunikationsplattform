import { Suspense } from "react";
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router";
import ContentPage from "~/components/ContentPage";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import { fetchVerfahrenFromNewApi } from "~/services/verfahren/prototype.fetchVerfahrenFromNewApi.server";

export const loader = withSessionLoader(
  async ({ request }: LoaderFunctionArgs) => {
    const newVerfahren = fetchVerfahrenFromNewApi(request);

    return {
      newVerfahren,
    };
  },
);

export default function KomPlaIdPTestPage() {
  const { newVerfahren } = useLoaderData<{
    newVerfahren: Promise<ReturnType<typeof fetchVerfahrenFromNewApi>>;
  }>();

  return (
    <ContentPage title="KomPla IdP Test">
      <p>Debug newVerfahren data</p>
      <hr />

      <Suspense fallback={<div>Loading</div>}>
        <Await resolve={newVerfahren}>
          {(resolvedVerfahren) =>
            resolvedVerfahren?.map((data, i) => (
              <div key={"resolvedVerfahren-test-" + i}>
                {JSON.stringify(data)}
              </div>
            ))
          }
        </Await>
      </Suspense>
    </ContentPage>
  );
}
