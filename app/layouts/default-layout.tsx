import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function DefaultLayout() {
  return (
    <div className="kern-container" data-testid="default-layout">
      <main>
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
