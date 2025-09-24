import { LoaderFunctionArgs, useLoaderData } from "react-router";
import VerfahrenTile from "~/components/VerfahrenTile";
import { withSessionLoader } from "~/services/auth/withSessionLoader";
import fetchVerfahren from "~/services/verfahren/fetchVerfahren.server";

export const loader = withSessionLoader(
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const offset = Number(url.searchParams.get("offset")) || 0;

    const verfahren = await fetchVerfahren({ limit, offset });
    return {
      verfahren,
    };
  },
);

export default function Verfahren() {
  const { verfahren } = useLoaderData<{
    verfahren: Awaited<ReturnType<typeof fetchVerfahren>>;
  }>();

  return (
    <>
      <h1 className="kern-heading-large">Verfahren</h1>

      <div className="my-kern-space-large gap-y-kern-space-large flex flex-col">
        {verfahren.map((data) => (
          <VerfahrenTile key={data.id} {...data} />
        ))}
      </div>
    </>
  );
}
