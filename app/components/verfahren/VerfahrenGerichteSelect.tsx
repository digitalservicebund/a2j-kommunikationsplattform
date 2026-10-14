import { useState } from "react";
import { InputSelectOption } from "~/components/InputSelect";
import VerfahrenSelect, {
  type VerfahrenSelectProps,
} from "~/components/verfahren/VerfahrenSelect";

export type GerichtSelectItem = {
  id?: string | null;
  wert?: string | null;
};

export const buildGerichteOptions = (
  gerichte: GerichtSelectItem[],
): InputSelectOption[] => {
  return gerichte.map((gericht) => ({
    value: gericht.id ?? "",
    label: gericht.wert ?? "Wert fehlt",
  }));
};

type VerfahrenGerichteSelectProps = Omit<
  VerfahrenSelectProps,
  "options" | "selectedValue" | "onChange"
> & {
  gerichte: GerichtSelectItem[];
  initialSelectedValue?: string;
  onValueChange?: (selectedValue: string) => void;
};

export default function VerfahrenGerichteSelect({
  id,
  label,
  hint,
  error,
  placeholder,
  className,
  required,
  disabled,
  gerichte,
  initialSelectedValue = "",
  onValueChange,
}: Readonly<VerfahrenGerichteSelectProps>) {
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  const handleValueChange = (nextValue: string) => {
    setSelectedValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <VerfahrenSelect
      id={id}
      label={label}
      hint={hint}
      error={error}
      placeholder={placeholder}
      className={className}
      required={required}
      disabled={disabled}
      options={buildGerichteOptions(gerichte)}
      selectedValue={selectedValue}
      onChange={(event) => handleValueChange(event.target.value)}
    />
  );
}
