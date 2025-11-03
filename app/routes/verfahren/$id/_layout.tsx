import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Verfahrendetails",
  },
};

export default function VerfahrenDetailsLayout() {
  return (
    <>
      <h1 className="kern-heading-medium">Verfahrensdetails</h1>
      <Outlet />
    </>
  );
}
