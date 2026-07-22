import { ChangeEvent } from "react";

export interface InputSelectOption {
  value: string;
  label: string;
}

interface InputSelectProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  options: InputSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  selectedValue: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
}

export default function InputSelect({
  id,
  label,
  hint,
  error,
  options = [],
  placeholder,
  disabled,
  selectedValue,
  onChange,
  className = "",
  required,
}: Readonly<InputSelectProps>) {
  return (
    <div
      className={`kern-form-input ${className} ${error && "kern-form-input--error"}`}
    >
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>

      {hint && (
        <div className="kern-hint" id={`select-hint-${id}`}>
          {hint}
        </div>
      )}

      <div className="kern-form-input__select-wrapper">
        <select
          className={`kern-form-input__select ${error && "kern-form-input__select--error"}`}
          name={id}
          id={id}
          value={selectedValue}
          onChange={onChange}
          required={required}
          aria-describedby={`${hint && `select-hint-${id}`} ${error && "kern-input-error"}`}
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
        <p className="kern-error" id="kern-input-error">
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
