import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Klageschrift erstellen",
  },
};

export default function VerfahrenLayout() {
  return <Outlet />;
}
