import { Outlet } from "react-router";

export const handle = {
  breadcrumb: {
    title: "Übersicht",
    icon: "kern-icon--home",
  },
};

export default function UebersichtLayout() {
  return <Outlet />;
}
