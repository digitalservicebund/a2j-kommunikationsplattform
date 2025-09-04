import { Outlet } from "react-router";

export const handle = {
  breadcrumb: () => ({
    title: "Verfahren",
    url: "/verfahren",
    icon: "kern-icon--icon--storage",
  }),
};

export default function Verfahren() {
  return <Outlet />;
}
