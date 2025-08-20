import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function DefaultLayout() {
  return (
    <div className="kern-container vertical-padding-x-large">
      <main className="defailt-layout-main">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
