import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function NarrowLayout() {
  return (
    <div className="kern-container vertical-padding-x-large">
      <div className="kern-row kern-justify-content-center">
        <div className="kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xxl-4">
          <main className="narrow-layout-main">
            <Outlet />
          </main>
          <PageFooter />
        </div>
      </div>
    </div>
  );
}
