import clsx from "clsx";
import { HTMLAttributes } from "react";

export type IconName =
  // Icons included in KERN
  // (see: https://www.kern-ux.de/komponenten/icon)
  | "account-circle"
  | "add"
  | "arrow-back"
  | "arrow-down"
  | "arrow-forward"
  | "arrow-up"
  | "autorenew"
  | "check"
  | "checklist"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "content-copy"
  | "danger"
  | "dehaze"
  | "delete"
  | "download"
  | "draft"
  | "drive-folder-upload"
  | "easy-language"
  | "edit"
  | "home"
  | "info"
  | "keyboard-double-arrow-left"
  | "keyboard-double-arrow-right"
  | "language"
  | "logout"
  | "mail"
  | "more-vert"
  | "open-in-new"
  | "question-mark"
  | "search"
  | "sign-language"
  | "success"
  | "visibility"
  | "visibility-off"
  | "warning"
  // Additional icons imported from Material Design
  // (see: app/styles.css)
  | "network_node"
  | "insert-drive-file"
  | "storage"
  | "lock"
  | "schedule"
  | "description"
  | "attach-file"
  | "signature";

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
  name: IconName;
  size?: "small" | "default" | "large" | "x-large";
};

export default function Icon({
  name,
  size = "default",
  className,
  ...props
}: IconProps) {
  return (
    <span
      className={clsx(
        "kern-icon",
        `kern-icon--${size}`,
        `kern-icon--${name}`,
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
