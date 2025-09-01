import { Breadcrumb } from "~/components/Breadcrumb";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const handle = {
  breadcrumb: (match: { params: { id?: string } }) => {
    console.log("match", match.params.id);
    return (
      <Breadcrumb
        title="verfahrensdetails"
        url={`/verfahren/${match.params.id}`}
      />
    );
  },
};

export default function VerfahrenDetails() {
  return (
    <div className="container">
      <Breadcrumbs />
      <h1 className="kern-heading-large">Verfahrendetails</h1>
    </div>
  );
}
