import { InputHTMLAttributes } from "react";

export interface InputCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
  className?: string;
}

export default function InputCheckbox({
  label,
  id,
  className = "",
  required,
  "aria-required": ariaRequired,
  ...inputProps
}: Readonly<InputCheckboxProps>) {
  return (
    <div className={`kern-form-check ${className}`.trim()}>
      <input
        type="checkbox"
        className="kern-form-check__checkbox"
        id={id}
        name={id}
        aria-required={required || ariaRequired || undefined}
        {...inputProps}
      />
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
