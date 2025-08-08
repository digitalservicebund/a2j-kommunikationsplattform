import { KernColumn, KernContainer } from "@kern-ux-annex/kern-react-kit";
import { Outlet } from "react-router";
import PageFooter from "~/components/PageFooter";

export default function NarrowLayout() {
  return (
    <KernContainer>
      <KernColumn
        sizes={{
          sm: 10,
          md: 8,
          lg: 6,
          xl: 6,
          xxl: 4,
        }}
        offsets={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
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
