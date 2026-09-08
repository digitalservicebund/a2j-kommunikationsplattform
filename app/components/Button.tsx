import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: "primary" | "secondary" | "tertiary";
  label?: string;
  children?: ReactNode;
}

export default function Button({
  appearance,
  label,
  children,
  className = "",
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`kern-btn kern-btn--${appearance} ${className}`.trim()}
      {...props}
    >
      {children}
      {label && <span className="kern-label">{label}</span>}
    </button>
  );
}
