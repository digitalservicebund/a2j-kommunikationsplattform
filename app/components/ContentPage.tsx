import { ReactNode } from "react";
import { PageMetadata } from "~/components/PageMetadata";

export default function ContentPage({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  return (
    <>
      <PageMetadata title={title} />
      <h1 className="kern-heading-display">{title}</h1>
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
          {children}
        </div>
      </div>
    </>
  );
}
