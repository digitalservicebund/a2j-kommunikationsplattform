import VerfahrenSelect, {
  type VerfahrenSelectProps,
} from "~/components/verfahren/VerfahrenSelect";
import {
  type DokumentType,
  UploadDokumentTypeSchema,
} from "~/domains/verfahren/entities/dokument/dokument.entity";

const dokumentTypeLabelByValue: Record<string, string> = {
  ANHANG: "Anhang",
  SCHRIFTSTUECK: "Schriftstück",
  SIGNATURDATEI: "Signaturdatei",
};

type VerfahrenDokumentTypeSelectProps = Omit<
  VerfahrenSelectProps,
  "options"
> & {
  // Defaults to every uploadable Dokument type.
  types?: readonly DokumentType[];
};

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
  types = UploadDokumentTypeSchema.options,
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
      options={types.map((value) => ({
        value,
        label: dokumentTypeLabelByValue[value] ?? value,
      }))}
    />
  );
}
