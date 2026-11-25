import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon, { IconName } from "./Icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: "primary" | "secondary" | "tertiary";
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  label?: string;
  icon?: IconName;
  iconPosition?: "leading" | "trailing";
  children?: ReactNode;
}

export default function Button({
  appearance,
  size,
  label,
  icon,
  iconPosition = "leading",
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
      {icon && iconPosition === "leading" && <Icon name={icon} />}
      {label && <span className="kern-label">{label}</span>}
      {icon && iconPosition === "trailing" && <Icon name={icon} />}
    </button>
  );
}
