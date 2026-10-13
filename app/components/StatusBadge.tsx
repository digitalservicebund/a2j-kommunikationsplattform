import { clsx } from "clsx";

// Where something is in its process:
// draft — not submitted yet; pending — waiting for someone else;
// done — confirmed or successful; attention — needs the user to act;
// failed — went wrong; closed — over, nothing more happens.
export type StatusBadgeState =
  | "draft"
  | "pending"
  | "done"
  | "attention"
  | "failed"
  | "closed";

// KERN icon names (kern-icon--<name>) a badge can show. Extend as needed.
export type StatusBadgeIcon =
  | "success"
  | "warning"
  | "danger"
  | "delete"
  | "draft"
  | "lock"
  | "schedule";

// What a badge shows. Every presentation helper (statusPresentation,
// validierungPresentation) returns this shape.
export type StatusBadgePresentation = {
  state: StatusBadgeState;
  label: string;
  // Overrides the state's default icon, for a status that deliberately looks
  // different from others in the same state.
  icon?: StatusBadgeIcon;
  loading?: boolean;
};

type StatusBadgeProps = StatusBadgePresentation & {
  className?: string;
};

// Full class names so Tailwind's scanner can find them.
const neutralClasses = "bg-feedback-default-bg border-feedback-default";

const stateClasses: Record<StatusBadgeState, string> = {
  draft: neutralClasses,
  pending: "bg-feedback-info-bg border-feedback-info",
  done: "bg-feedback-success-bg border-feedback-success",
  attention: "bg-feedback-warning-bg border-feedback-warning",
  failed: "bg-feedback-danger-bg border-feedback-danger",
  closed: neutralClasses,
};

// kern-icon--lock is a custom icon (see styles.css); the others ship with KERN.
const stateIcons: Record<StatusBadgeState, StatusBadgeIcon> = {
  draft: "draft",
  pending: "schedule",
  done: "success",
  attention: "warning",
  failed: "danger",
  closed: "lock",
};

// KERN icons are masks over their background color, so bg-* sets the icon
// color — always the state's, whichever icon is shown.
const iconColorClasses: Record<StatusBadgeState, string> = {
  draft: "bg-feedback-default",
  pending: "bg-feedback-info",
  done: "bg-feedback-success",
  attention: "bg-feedback-warning",
  failed: "bg-feedback-danger",
  closed: "bg-feedback-default",
};

export default function StatusBadge({
  label,
  state,
  icon = stateIcons[state],
  loading = false,
  className,
}: Readonly<StatusBadgeProps>) {
  return (
    <span
      className={clsx(
        "inline-flex min-h-(--kern-metric-dimension-large) items-center rounded-(--kern-metric-border-radius-default)",
        "border-(length:--kern-metric-border-width-light) py-(--kern-metric-space-2x-small) pr-(--kern-metric-space-default) pl-(--kern-component-badge-space-left)",
        stateClasses[state],
        className,
      )}
    >
      {loading ? (
        // KERN's loader is sized as a full-page spinner; shrink it to fit the
        // badge's icon slot and drop the pseudo-element caps that only line
        // up at the default size. The visible label carries the meaning.
        // There is no semantic KERN token for the 3px ring, so it uses the
        // --kern-3 primitive.
        <span
          className="kern-loader kern-loader--visible m-(--kern-metric-space-2x-small) size-(--kern-metric-dimension-small) border-(length:--kern-3) before:hidden after:hidden"
          aria-hidden="true"
        ></span>
      ) : (
        <span
          className={clsx(
            `kern-icon kern-icon--${icon}`,
            iconColorClasses[state],
            // Like KERN's badge: keep the icon visible in Windows High Contrast,
            // which would otherwise replace its background (= icon) color.
            "forced-colors:bg-kern-white forced-colors:forced-color-adjust-none",
          )}
          aria-hidden="true"
        ></span>
      )}
      {/* Same label styles as KERN's kern-badge .kern-label. */}
      <span className="pl-(--kern-metric-space-x-small) font-(family-name:--kern-typography-font-family-default) text-(length:--kern-typography-font-size-small-static) leading-(--kern-typography-line-height-medium-static) font-(weight:--kern-typography-font-weight-label-default) tracking-(--kern-metric-space-none) text-layout-text-default not-italic slashed-zero tabular-nums">
        {label}
      </span>
    </span>
  );
}
