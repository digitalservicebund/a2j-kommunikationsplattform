import { KernHeading } from "@kern-ux-annex/kern-react-kit";
import { ReactNode } from "react";
import { DefaultPageLayout } from "~/components/DefaultPageLayout";
import { PageMetadata } from "~/components/PageMetadata";

export default function ContentPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageMetadata title={title} />
      <DefaultPageLayout>
        <KernHeading level={1} size="display">
          {title}
        </KernHeading>
        {children}
      </DefaultPageLayout>
    </>
  );
}
