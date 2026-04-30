import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Klage manuell erstellen",
  },
};

export default function VerfahrenLayout() {
  return <Outlet />;
}
