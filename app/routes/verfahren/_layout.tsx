import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Verfahrensübersicht",
    icon: "kern-icon--icon--storage",
  },
};

export default function VerfahrenLayout() {
  return <Outlet />;
}
