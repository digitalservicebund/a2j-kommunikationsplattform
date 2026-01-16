import { Outlet } from "react-router";
import { authMiddleware } from "~/middleware/auth.server";

export const handle = {
  breadcrumb: {
    title: "Übersicht",
  },
};

// Protect all routes under this layout (/, /verfahren, etc.)
export const middleware = [authMiddleware];

export default function UebersichtLayout() {
  return <Outlet />;
}
