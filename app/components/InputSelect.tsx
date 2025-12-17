import { ChangeEvent } from "react";

export interface InputSelectOption {
  value: string;
  label: string;
}

interface InputSelectProps {
  label: string;
  id: string;
  options: InputSelectOption[];
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  selectedValue: string;
  className?: string;
}

export default function InputSelect({
  label,
  id,
  options = [],
  placeholder,
  onChange,
  disabled,
  selectedValue,
  className = "",
}: Readonly<InputSelectProps>) {
  return (
    <div className={`kern-form-input ${className}`}>
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>

      <div className="kern-form-input__select-wrapper">
        <select
          className="kern-form-input__select"
          name={id}
          id={id}
          value={selectedValue}
          onChange={onChange}
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
    </div>
  );
}
