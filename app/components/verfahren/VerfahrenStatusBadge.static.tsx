import { clsx } from "clsx";

type BadgeTone = "success" | "warning" | "danger" | "info";

type VerfahrenStatusBadgeProps = {
  label: string;
  tone: BadgeTone;
  small?: boolean;
  className?: string;
};

export default function VerfahrenStatusBadge({
  label,
  tone,
  small = false,
  className,
}: Readonly<VerfahrenStatusBadgeProps>) {
  const badgeSizeClass = small ? " kern-badge--small" : "";

  return (
    <span
      className={clsx(
        `kern-badge${badgeSizeClass}`,
        `kern-badge--${tone}`,
        className,
      )}
    >
      <span
        className={`kern-icon kern-icon--${tone}`}
        aria-hidden="true"
      ></span>
      <span className="kern-label">{label}</span>
    </span>
  );
}
