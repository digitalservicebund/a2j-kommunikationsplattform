import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function DefaultLayout() {
  return (
    <div className="kern-container">
      <main>
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
