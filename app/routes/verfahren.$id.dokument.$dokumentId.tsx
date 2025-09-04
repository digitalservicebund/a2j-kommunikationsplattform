import { LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id, dokumentId } = params;
  return { id, dokumentId };
};

export const handle = {
  breadcrumb: ({ params }: LoaderFunctionArgs) => ({
    title: "Dateiansicht",
    url: `/verfahren/${params?.id}/dokument/${params?.dokumentId}`,
  }),
};

export default function Dateiansicht() {
  const { id, dokumentId } = useLoaderData<typeof loader>();
  return (
    <div className="kern-container">
      <h1 className="kern-heading-large">
        Dateiansicht for Verfahren {id} , Document {dokumentId}
      </h1>
    </div>
  );
}
