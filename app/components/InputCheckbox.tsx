import { InputHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

export interface InputCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
  className?: string;
  optional?: boolean;
}

export default function InputCheckbox({
  label,
  id,
  className = "",
  optional,
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
      <InputLabel htmlFor={id} optional={optional}>
        {label}
      </InputLabel>
    </div>
  );
}
