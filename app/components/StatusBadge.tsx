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

type StatusBadgeProps = {
  label: string;
  state: StatusBadgeState;
  small?: boolean;
  loading?: boolean;
  className?: string;
};

// Full class names so Tailwind's scanner can find them.
// The outline color is set for both border (regular) and inset ring (small);
// only the one with a width set in sizeClasses is visible.
const neutralClasses =
  "bg-feedback-default-bg border-feedback-default inset-ring-feedback-default";

const stateClasses: Record<StatusBadgeState, string> = {
  draft: neutralClasses,
  pending: "bg-feedback-info-bg border-feedback-info inset-ring-feedback-info",
  done: "bg-feedback-success-bg border-feedback-success inset-ring-feedback-success",
  attention:
    "bg-feedback-warning-bg border-feedback-warning inset-ring-feedback-warning",
  failed:
    "bg-feedback-danger-bg border-feedback-danger inset-ring-feedback-danger",
  closed: neutralClasses,
};

// KERN icons are masks over their background color, so bg-* sets the icon
// color. KERN has no icon for its "default" feedback color, so the neutral
// states (draft, closed) have none.
const stateIcons: Record<StatusBadgeState, string | null> = {
  draft: null,
  pending: "kern-icon--info bg-feedback-info",
  done: "kern-icon--success bg-feedback-success",
  attention: "kern-icon--warning bg-feedback-warning",
  failed: "kern-icon--danger bg-feedback-danger",
  closed: null,
};

// Small badges draw their outline as an inset ring instead of a border, like
// KERN's kern-badge--small, so the outline doesn't add to the badge's size.
const sizeClasses = {
  regular:
    "min-h-(--kern-metric-dimension-large) border-(length:--kern-metric-border-width-light) py-(--kern-metric-space-2x-small) pr-(--kern-metric-space-default) pl-(--kern-component-badge-space-left)",
  small:
    "min-h-(--kern-metric-dimension-default) inset-ring py-(--kern-metric-space-none) pr-(--kern-metric-space-small) pl-(--kern-metric-space-x-small)",
};

export default function StatusBadge({
  label,
  state,
  small = false,
  loading = false,
  className,
}: Readonly<StatusBadgeProps>) {
  const icon = stateIcons[state];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-(--kern-metric-border-radius-default)",
        small ? sizeClasses.small : sizeClasses.regular,
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
          className={clsx(
            "kern-loader kern-loader--visible m-(--kern-metric-space-2x-small) border-(length:--kern-3) before:hidden after:hidden",
            small
              ? "size-(--kern-metric-dimension-x-small)"
              : "size-(--kern-metric-dimension-small)",
          )}
          aria-hidden="true"
        ></span>
      ) : (
        icon && (
          <span
            className={clsx(
              "kern-icon",
              icon,
              small &&
                "size-(--kern-metric-dimension-small) min-h-(--kern-metric-dimension-small) min-w-(--kern-metric-dimension-small)",
              // Like KERN's badge: keep the icon visible in Windows High Contrast,
              // which would otherwise replace its background (= icon) color.
              "forced-colors:bg-kern-white forced-colors:forced-color-adjust-none",
            )}
            aria-hidden="true"
          ></span>
        )
      )}
      {/* Same label styles for both sizes, like KERN's kern-badge .kern-label. */}
      <span className="pl-(--kern-metric-space-x-small) font-(family-name:--kern-typography-font-family-default) text-(length:--kern-typography-font-size-small-static) leading-(--kern-typography-line-height-medium-static) font-(weight:--kern-typography-font-weight-label-default) tracking-(--kern-metric-space-none) text-layout-text-default not-italic slashed-zero tabular-nums">
        {label}
      </span>
    </span>
  );
}
