import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id, dokumentId } = params;
  return { id, dokumentId };
};

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Dateiansicht",
  },
};

type LoaderData = { id?: string; dokumentId?: string };

export default function Dateiansicht() {
  const { id, dokumentId } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1 className="kern-heading-medium">
        Dateiansicht for Verfahren {id} , Document {dokumentId}
      </h1>
    </div>
  );
}
