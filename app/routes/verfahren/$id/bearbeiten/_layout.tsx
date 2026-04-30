import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Verfahren bearbeiten",
  },
};

export default function VerfahrenBasisdatenLayout() {
  return <Outlet />;
}
