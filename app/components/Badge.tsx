import { clsx } from "clsx";

export type BadgeTone = "success" | "warning" | "danger" | "info";

type BadgeProps = {
  label: string;
  tone: BadgeTone;
  small?: boolean;
  loading?: boolean;
  className?: string;
};

export default function Badge({
  label,
  tone,
  small = false,
  loading = false,
  className,
}: Readonly<BadgeProps>) {
  return (
    <span
      className={clsx(
        "kern-badge",
        small && "kern-badge--small",
        `kern-badge--${tone}`,
        className,
      )}
    >
      {loading ? (
        // KERN's loader is sized as a full-page spinner; shrink it to fit the
        // badge's icon slot and drop the pseudo-element caps that only line
        // up at the default size. The visible label carries the meaning.
        <span
          className={clsx(
            "kern-loader kern-loader--visible m-0.5 border-[3px] before:hidden after:hidden",
            small ? "size-4" : "size-5",
          )}
          aria-hidden="true"
        ></span>
      ) : (
        <span
          className={`kern-icon kern-icon--${tone}`}
          aria-hidden="true"
        ></span>
      )}
      <span className="kern-label">{label}</span>
    </span>
  );
}
