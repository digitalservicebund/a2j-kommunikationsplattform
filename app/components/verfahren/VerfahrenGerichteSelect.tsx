import { Suspense, useState } from "react";
import { Await } from "react-router";
import { InputSelectOption } from "~/components/InputSelect";
import VerfahrenSelect, {
  type VerfahrenSelectProps,
} from "~/components/verfahren/VerfahrenSelect";

export type GerichtSelectItem = {
  code?: string | null;
  wert?: string | null;
};

export const buildGerichteOptions = (
  gerichte: GerichtSelectItem[],
): InputSelectOption[] => {
  return gerichte.map((gericht) => ({
    value: gericht.code ?? "",
    label: gericht.wert ?? "Wert fehlt",
  }));
};

type VerfahrenGerichteSelectProps = Omit<
  VerfahrenSelectProps,
  "options" | "selectedValue" | "onChange"
> & {
  gerichtePromise: Promise<GerichtSelectItem[]>;
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
  gerichtePromise,
  initialSelectedValue = "",
  onValueChange,
}: Readonly<VerfahrenGerichteSelectProps>) {
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  const handleValueChange = (nextValue: string) => {
    setSelectedValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <Suspense
      fallback={
        <VerfahrenSelect
          id={id}
          label={label}
          hint={hint}
          error={error}
          placeholder={placeholder}
          className={className}
          required={required}
          disabled
          options={[]}
          selectedValue={selectedValue}
          onChange={() => {}}
        />
      }
    >
      <Await resolve={gerichtePromise}>
        {(gerichte: GerichtSelectItem[]) => (
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
        )}
      </Await>
    </Suspense>
  );
}
