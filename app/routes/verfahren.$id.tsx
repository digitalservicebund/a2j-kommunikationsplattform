import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/Breadcrumb";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { id: params.id ?? "unknown" };
};

export const handle = {
  breadcrumb: ({ params }: { params: Request<string, string> }) => {
    return (
      <Breadcrumb title="verfahrensdetails" url={`/verfahren/${params.id}`} />
    );
  },
};

export default function VerfahrenDetails() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <h1 className="kern-heading-large">Verfahrendetails for {id}</h1>
    </div>
  );
}
