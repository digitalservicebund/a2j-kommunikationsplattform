type BadgeTone = "success" | "warning" | "danger" | "info";

type VerfahrenStatusBadgeProps = {
  label: string;
  tone: BadgeTone;
  small?: boolean;
};

export default function VerfahrenStatusBadge({
  label,
  tone,
  small = false,
}: Readonly<VerfahrenStatusBadgeProps>) {
  const badgeSizeClass = small ? " kern-badge--small" : "";

  return (
    <span className={`kern-badge${badgeSizeClass} kern-badge--${tone}`}>
      <span
        className={`kern-icon kern-icon--${tone}`}
        aria-hidden="true"
      ></span>
      <span className="kern-label">{label}</span>
    </span>
  );
}
