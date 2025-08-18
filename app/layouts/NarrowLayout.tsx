import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function NarrowLayout() {
  return (
    <div className="kern-container">
      <div className="kern-row kern-justify-content-center">
        <div
          className="kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xxl-4"
          data-testid="narrow-layout"
        >
          <main>
            <Outlet />
          </main>
          <PageFooter />
        </div>
      </div>
    </div>
  );
}
