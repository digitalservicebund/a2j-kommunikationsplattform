import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { withSessionLoader } from "~/services/auth/withSessionLoader";

export const loader = withSessionLoader(
  async ({ params }: LoaderFunctionArgs) => {
    return { id: params.id || "unknown" };
  },
);

export default function Verfahrendetails() {
  const { id } = useLoaderData<{ id: string }>();

  return (
    <div>
      <h1 className="kern-heading-large">Verfahrendetails for {id}</h1>
    </div>
  );
}
