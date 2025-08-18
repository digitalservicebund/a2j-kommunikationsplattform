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
      <h1 className="kern-heading-display">{title}</h1>
      {children}
    </>
  );
}
