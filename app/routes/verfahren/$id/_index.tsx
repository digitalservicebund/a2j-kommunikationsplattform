import { LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { id: params.id || "unknown" };
};

export default function Verfahrendetails() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="kern-heading-large">Verfahrendetails for {id}</h1>
    </div>
  );
}
