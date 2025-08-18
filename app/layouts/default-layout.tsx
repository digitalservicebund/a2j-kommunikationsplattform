import { KernContainer } from "@kern-ux-annex/kern-react-kit";
import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function DefaultLayout() {
  return (
    <KernContainer>
      <main>
        <Outlet />
      </main>
      <PageFooter />
    </KernContainer>
  );
}
