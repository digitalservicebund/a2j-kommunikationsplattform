import { ChangeEvent } from "react";
import InputSelect, { InputSelectOption } from "~/components/InputSelect";

export interface VerfahrenSelectProps {
  id: string;
  label: string;
  options: InputSelectOption[];
  selectedValue: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function VerfahrenSelect({
  id,
  label,
  options,
  selectedValue,
  onChange,
  hint,
  error,
  placeholder,
  className,
  required,
  disabled,
}: Readonly<VerfahrenSelectProps>) {
  return (
    <InputSelect
      id={id}
      label={label}
      options={options}
      selectedValue={selectedValue}
      onChange={onChange}
      hint={hint}
      error={error}
      placeholder={placeholder}
      className={className}
      required={required}
      disabled={disabled}
    />
  );
}
