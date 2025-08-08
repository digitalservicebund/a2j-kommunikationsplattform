import { KernColumn, KernContainer } from "@kern-ux-annex/kern-react-kit";
import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function DefaultLayout() {
  return (
    <KernContainer>
      <KernColumn
        sizes={{
          sm: 10,
          md: 8,
        }}
        offsets={{
          sm: 1,
          md: 2,
        }}
      >
        <main>
          <Outlet />
        </main>
        <PageFooter />
      </KernColumn>
    </KernContainer>
  );
}
