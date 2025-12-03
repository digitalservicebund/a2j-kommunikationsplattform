import { ChangeEvent } from "react";

type InputSelectOption = {
  value: string;
  label: string;
};

type InputSelectProps = Readonly<{
  placeholder?: string;
  label: string;
  name: string;
  options?: InputSelectOption[];
  selectedValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}>;

export default function InputSelect({
  placeholder,
  label,
  name,
  options = [],
  selectedValue,
  onChange,
  disabled,
}: InputSelectProps) {
  const selectId = name;

  return (
    <div className="kern-form-input">
      <label className="kern-label" htmlFor={selectId}>
        {label}
      </label>

      <div className="kern-form-input__select-wrapper">
        <select
          className="kern-form-input__select"
          name={name}
          id={selectId}
          value={selectedValue ?? ""}
          onChange={onChange}
          aria-disabled={disabled} // using aria-disabled as recommended in https://www.kern-ux.de/komponenten/form-inputs/#disabled-attribut
        >
          <option value="">{placeholder ?? "Bitte auswählen"}</option>

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
