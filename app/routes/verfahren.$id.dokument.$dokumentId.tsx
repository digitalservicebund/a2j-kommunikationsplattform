import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/Breadcrumb";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id, dokumentId } = params;
  return { id, dokumentId };
};

export const handle = {
  breadcrumb: ({ params }) => {
    return (
      <Breadcrumb
        title="dateiansicht"
        url={`/verfahren/${params.id}/dokument/${params.dokumentId}`}
      />
    );
  },
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
