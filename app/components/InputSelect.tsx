import React from "react";

export default function InputSelect({
  label,
  name,
  options = [],
  selectedValue,
  onChange,
}: Readonly<{
  label: string;
  name: string;
  options: Array<{ id: string; wert: string }>;
  selectedValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}>) {
  return (
    <div className="kern-form-input">
      <label className="kern-label" htmlFor={name}>
        {label}
      </label>
      <div className="kern-form-input__select-wrapper">
        <select
          className="kern-form-input__select"
          name={name}
          id={name}
          onChange={onChange}
        >
          <option selected={!selectedValue}>Bitte auswählen</option>
          {options.map((option) => (
            <option
              key={option.id}
              value={option.id}
              selected={selectedValue === option.id}
            >
              {option.wert}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
