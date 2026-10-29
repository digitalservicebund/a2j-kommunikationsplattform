import { InputHTMLAttributes } from "react";

export interface InputRadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  // Being required is a property of the whole group (ARIA only defines
  // aria-required on the radiogroup), not of a single radio
  "type" | "required" | "aria-required"
> {
  label: string;
  id: string;
  // Shared by all radios of a group, so it can't default to the id
  name: string;
  className?: string;
}

export default function InputRadio({
  label,
  id,
  className = "",
  ...inputProps
}: Readonly<InputRadioProps>) {
  return (
    <div className={`kern-form-check ${className}`.trim()}>
      <input
        type="radio"
        className="kern-form-check__radio"
        id={id}
        {...inputProps}
      />
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
