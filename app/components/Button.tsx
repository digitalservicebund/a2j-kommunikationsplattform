import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary" | "tertiary";
  label?: string;
  children?: ReactNode;
}

export default function Button({ ...props }: Readonly<ButtonProps>) {
  const { appearance, label, children } = props;
  return (
    <button
      className={`kern-button kern-btn kern-btn--${appearance}`}
      {...props}
    >
      {label && <span className="kern-label">{label}</span>}
      {children}
    </button>
  );
}
