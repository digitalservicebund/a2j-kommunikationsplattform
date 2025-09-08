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

export default function Dateiansicht() {
  const { id, dokumentId } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="kern-heading-large">
        Dateiansicht for Verfahren {id} , Document {dokumentId}
      </h1>
    </div>
  );
}
