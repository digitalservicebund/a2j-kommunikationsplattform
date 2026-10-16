import { ElementType, ReactNode } from "react";

export interface FieldsetCardProps {
  title: ReactNode;
  subline?: ReactNode;
  children: ReactNode;
  TitleComponent?: ElementType;
  id?: string;
}

/**
 * A variant of the KERN UX Card component which wraps the card content in
 * a `<fieldset>`. The card title is rendered inside a `<legend>` so that
 * its content becomes the fieldset's accessibility label.
 */
export default function FieldsetCard({
  title,
  subline,
  children,
  id,
  TitleComponent = "span",
}: FieldsetCardProps) {
  return (
    <div className="kern-card mx-0" id={id}>
      <fieldset className="kern-card__container kern-mb-sm border-none">
        <legend className="kern-card__header kern-pt-lg kern-px-none">
          <TitleComponent className="kern-title pbs-0">{title}</TitleComponent>
        </legend>
        <div className="kern-card__body">
          {subline && (
            <p className="kern-subline -mbs-(--kern-metric-space-default) mbe-(--kern-metric-space-default)">
              {subline}
            </p>
          )}
          {children}
        </div>
      </fieldset>
    </div>
  );
}
