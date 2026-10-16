import { useState } from "react";
import { InputSelectOption } from "~/components/InputSelect";
import VerfahrenSelect, {
  type VerfahrenSelectProps,
} from "~/components/verfahren/VerfahrenSelect";

export type KanzleiformSelectItem = {
  id?: string | null;
  wert?: string | null;
};

export const buildKanzleiformOptions = (
  kanzleiformen: KanzleiformSelectItem[],
): InputSelectOption[] => {
  return kanzleiformen.map((kanzleiform) => ({
    value: kanzleiform.id ?? "",
    label: kanzleiform.wert ?? "Wert fehlt",
  }));
};

type VerfahrenKanzleiformSelectProps = Omit<
  VerfahrenSelectProps,
  "options" | "selectedValue" | "onChange"
> & {
  kanzleiformen: KanzleiformSelectItem[];
  initialSelectedValue?: string;
  onValueChange?: (selectedValue: string) => void;
};

export default function VerfahrenKanzleiformSelect({
  id,
  label,
  hint,
  error,
  placeholder,
  className,
  required,
  disabled,
  kanzleiformen,
  initialSelectedValue = "",
  onValueChange,
}: Readonly<VerfahrenKanzleiformSelectProps>) {
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
      options={buildKanzleiformOptions(kanzleiformen)}
      selectedValue={selectedValue}
      onChange={(event) => handleValueChange(event.target.value)}
    />
  );
}
