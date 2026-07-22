import VerfahrenSelect, {
  type VerfahrenSelectProps,
} from "~/components/verfahren/VerfahrenSelect";
import { DokumentTypeSchema } from "~/domains/verfahren/schemas/dokumentSchema";

const dokumentTypeLabelByValue: Record<string, string> = {
  ANHANG: "Anhang",
  SCHRIFTSTUECK: "Schriftstück",
  XJUSTIZ: "XJustiz",
};

const dokumentTypeOptions = DokumentTypeSchema.options.map((value) => ({
  value,
  label: dokumentTypeLabelByValue[value] ?? value,
}));

type VerfahrenDokumentTypeSelectProps = Omit<VerfahrenSelectProps, "options">;

export default function VerfahrenDokumentTypeSelect({
  id,
  label,
  selectedValue,
  onChange,
  hint,
  error,
  placeholder,
  className,
  required,
  disabled,
}: Readonly<VerfahrenDokumentTypeSelectProps>) {
  return (
    <VerfahrenSelect
      id={id}
      label={label}
      selectedValue={selectedValue}
      onChange={onChange}
      hint={hint}
      error={error}
      placeholder={placeholder}
      className={className}
      required={required}
      disabled={disabled}
      options={dokumentTypeOptions}
    />
  );
}
