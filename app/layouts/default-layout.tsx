import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";
import PageHeader from "~/components/PageHeader";

export default function DefaultLayout() {
  return (
    <div className="kern-container vertical-padding-x-large">
      <PageHeader />
      <main className="defailt-layout-main">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
