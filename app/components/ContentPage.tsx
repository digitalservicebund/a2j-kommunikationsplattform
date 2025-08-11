import { KernHeading } from "@kern-ux-annex/kern-react-kit";
import { ReactNode } from "react";
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
      <KernHeading level={1} size="display">
        {title}
      </KernHeading>
      {children}
    </>
  );
}
