import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "verfahrendetails",
  },
};

export default function VerfahrenDetailsLayout() {
  return <Outlet />;
}
