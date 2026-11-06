import { clsx } from "clsx";
import { ReactNode, SelectHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

export interface InputSelectOption {
  value: string;
  label: string;
}

export interface InputSelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "defaultValue" | "children" | "name"
> {
  id: string;
  // ReactNode, e.g. to add visually hidden context to the accessible name
  label: ReactNode;
  // Keeps the label for screen readers only, e.g. in a compact row
  hideLabel?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  options: InputSelectOption[];
  placeholder?: string;
  selectedValue: string;
  className?: string;
}

export default function InputSelect({
  id,
  label,
  hideLabel = false,
  optional,
  hint,
  error,
  options,
  placeholder,
  disabled,
  selectedValue,
  className,
  required,
  "aria-required": ariaRequired,
  ...selectProps
}: Readonly<InputSelectProps>) {
  const errorId = `${id}-error`;

  return (
    <div
      className={clsx("kern-form-input", className, {
        "kern-form-input--error": error,
      })}
    >
      <InputLabel
        htmlFor={id}
        optional={optional}
        className={clsx({ "kern-sr-only": hideLabel })}
      >
        {label}
      </InputLabel>

      {hint && (
        <div className="kern-hint" id={`select-hint-${id}`}>
          {hint}
        </div>
      )}

      <div className="kern-form-input__select-wrapper">
        <select
          {...selectProps}
          className={clsx("kern-form-input__select", {
            "kern-form-input__select--error": error,
          })}
          name={id}
          id={id}
          value={selectedValue}
          aria-required={required || ariaRequired || undefined}
          aria-disabled={disabled} // using aria-disabled as recommended in https://www.kern-ux.de/komponenten/form-inputs/#disabled-attribut
        >
          {placeholder && (
            <option key={placeholder} value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="kern-error" id={errorId}>
          <span
            className="kern-icon kern-icon--danger kern-icon--md"
            aria-hidden="true"
          ></span>
          <span className="kern-body">{error}</span>
        </p>
      )}
    </div>
  );
}
