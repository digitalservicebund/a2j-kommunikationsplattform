import { clsx } from "clsx";
import { HTMLAttributes } from "react";

export interface LoaderProps extends HTMLAttributes<HTMLElement> {
  accessibilityLabel?: string;
}

export default function Loader({
  accessibilityLabel,
  className,
  ...props
}: Readonly<LoaderProps>) {
  return (
    <div
      // While an <output> element would have the desired `role="status"`, it
      // is a form-associated element, so its use here might lead to surprising
      // behavior when a loader is rendered within a <form>.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="status"
      className={clsx("kern-loader", "kern-loader--visible", className)}
      {...props}
    >
      <span className="kern-sr-only">{accessibilityLabel}</span>
    </div>
  );
}
