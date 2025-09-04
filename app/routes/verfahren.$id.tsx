import { LoaderFunctionArgs, Outlet } from "react-router";

export const handle = {
  breadcrumb: ({ params }: LoaderFunctionArgs) => ({
    title: "Verfahrendetails",
    url: `/verfahren/${params.id}`,
  }),
};

export default function VerfahrenDetails() {
  return <Outlet />;
}
