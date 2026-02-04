import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Kitchensink",
  },
};

export default function KitchensinkLayout() {
  return <Outlet />;
}
