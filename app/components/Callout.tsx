import { clsx } from "clsx";
import { ReactNode } from "react";

export type CalloutType = "info" | "warning";

export interface CalloutProps {
  type: CalloutType;
  title: string;
  children?: ReactNode;
}

export default function Callout({
  type,
  title,
  children,
}: Readonly<CalloutProps>) {
  const isInfo = type === "info";
  const isWarning = type === "warning";

  return (
    <div
      className={clsx(
        "kern-px-sm",
        "kern-py-md",
        "align-items-baseline",
        "kern-gap-md",
        "flex",
        "rounded-(--kern-metric-border-radius-default)",
        "border-s-(length:--kern-metric-border-width-bold)",
        // Info
        isInfo && "border-s-(--kern-color-feedback-info-contextual)",
        isInfo && "bg-(--kern-color-feedback-info-background-contextual)",
        // Warning
        isWarning && "border-s-(--kern-color-feedback-warning-contextual)",
        isWarning && "bg-(--kern-color-feedback-warning-background-contextual)",
      )}
    >
      {/* Icon */}
      <span
        className={clsx(
          "kern-icon",
          "kern-icon--default",
          // Info
          isInfo && "kern-icon--info",
          isInfo && "bg-(--kern-color-feedback-info-contextual)",
          // Warning
          isWarning && "kern-icon--warning",
          isWarning && "bg-(--kern-color-feedback-warning-contextual)",
        )}
        aria-hidden="true"
      ></span>

      <div>
        {/* Title */}
        <p
          className={clsx(
            "kern-heading-small",
            "pt-0",
            // Info
            isInfo && "text-(--kern-color-feedback-info-contextual)",
            // Warning
            isWarning && "text-(--kern-color-feedback-warning-contextual)",
          )}
        >
          {title}
        </p>

        {/* Content */}
        <p className="kern-body">{children}</p>
      </div>
    </div>
  );
}
