import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: "primary" | "secondary" | "tertiary";
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  label?: string;
  children?: ReactNode;
}

export default function Button({
  appearance,
  size,
  label,
  children,
  className = "",
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={clsx(
        "kern-btn",
        `kern-btn--${appearance}`,
        !!size && size !== "default" && `kern-btn--${size}`,
        className,
      )}
      {...props}
    >
      {children}
      {label && <span className="kern-label">{label}</span>}
    </button>
  );
}
