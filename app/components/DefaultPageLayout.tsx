import { KernColumn, KernContainer } from "@kern-ux-annex/kern-react-kit";
import { ReactNode } from "react";
import PageFooter from "./PageFooter";

export function DefaultPageLayout({ children }: { children: ReactNode }) {
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
        <main>{children}</main>
        <PageFooter />
      </KernColumn>
    </KernContainer>
  );
}
