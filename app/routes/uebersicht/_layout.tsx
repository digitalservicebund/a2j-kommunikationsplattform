import { Outlet } from "react-router";

export const handle = {
  breadcrumb: {
    title: "Übersicht",
  },
};

export default function UebersichtLayout() {
  return <Outlet />;
}
