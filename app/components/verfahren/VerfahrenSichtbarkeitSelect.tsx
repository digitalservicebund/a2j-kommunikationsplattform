import InputSelect from "~/components/InputSelect";
import { useTranslations } from "~/services/translations/context";

type VerfahrenSichtbarkeitSelectProps = {
  id: string;
  // Added to the accessible name, when there's a select for each of
  // several Dokumente
  dokumentName?: string;
  sichtbarkeitAlle: boolean;
  onChange: (sichtbarkeitAlle: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

/**
 * Selects who can see a Dokument: all Beteiligten of the Verfahren
 * (sichtbarkeitAlle) or only the Gericht and the associated Partei.
 */
export default function VerfahrenSichtbarkeitSelect({
  id,
  dokumentName,
  sichtbarkeitAlle,
  onChange,
  disabled,
  error,
  className,
}: Readonly<VerfahrenSichtbarkeitSelectProps>) {
  const { shared } = useTranslations();
  const labels = shared.form.sichtbarkeit;

  return (
    <InputSelect
      id={id}
      label={
        <>
          {labels.label}
          {dokumentName && (
            <span className="kern-sr-only">
              {" "}
              {labels.dokumentLabelSuffix.replace("{{name}}", dokumentName)}
            </span>
          )}
        </>
      }
      options={[
        { value: "true", label: labels.alleParteien },
        { value: "false", label: labels.nurGerichtUndPartei },
      ]}
      selectedValue={String(sichtbarkeitAlle)}
      onChange={(event) => onChange(event.target.value === "true")}
      disabled={disabled}
      error={error}
      className={className}
    />
  );
}
