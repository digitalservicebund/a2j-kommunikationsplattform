import { LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { id: params.id ?? "unknown" };
};

export const handle = {
  breadcrumb: {
    title: "Verfahrendetails",
    url: (params: Record<string, string>) => `/verfahren/${params?.id}`,
  },
};

export default function VerfahrenDetails() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="kern-heading-large">Verfahrendetails for {id}</h1>
    </div>
  );
}
