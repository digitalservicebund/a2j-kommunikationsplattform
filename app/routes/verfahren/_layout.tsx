import { Outlet } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";
import { authMiddleware } from "~/middleware/auth.server";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Verfahren",
  },
};

export const middleware = [authMiddleware];

export function loader() {
  return null;
}

export default function VerfahrenLayout() {
  return <Outlet />;
}
