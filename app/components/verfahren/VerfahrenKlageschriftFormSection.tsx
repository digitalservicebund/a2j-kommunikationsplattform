import InputField from "~/components/InputField";
import InputFile from "~/components/InputFile";
import VerfahrenGerichteSelect, {
  type GerichtSelectItem,
} from "~/components/verfahren/VerfahrenGerichteSelect";
import { useTranslations } from "~/services/translations/context";

const ACCEPTED_KLAGESCHRIFT_FILE_TYPES = [
  // Word
  ".docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // PDF
  ".pdf",
  "application/pdf",
].join(",");

export type VerfahrenKlageschriftFormSectionProps = {
  errors: Record<string, string[]>;
  gerichte: GerichtSelectItem[];
  selectedGerichtId: string;
  onGerichtIdChange: (selectedValue: string) => void;
};

export default function VerfahrenKlageschriftFormSection({
  errors,
  gerichte,
  selectedGerichtId,
  onGerichtIdChange,
}: Readonly<VerfahrenKlageschriftFormSectionProps>) {
  const { shared } = useTranslations();

  return (
    <>
      <InputFile
        label={shared.form.uploadDokument.label}
        id="file"
        hint={shared.form.uploadDokument.hint}
        accept={ACCEPTED_KLAGESCHRIFT_FILE_TYPES}
        error={errors.file ? shared.form.uploadDokument.error : undefined}
      />

      <div className="kern-gap-md flex w-full">
        <InputField
          label={shared.form.labels.verfahrensgegenstand}
          id="verfahrensgegenstand"
          errors={errors}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <VerfahrenGerichteSelect
          id="gerichtId"
          label={shared.form.labels.empfaengergericht}
          className="bg-kern-feedback-info-background flex-1 self-end"
          placeholder={shared.form.select.placeholder}
          gerichte={gerichte}
          initialSelectedValue={selectedGerichtId}
          onValueChange={onGerichtIdChange}
          error={errors.gerichtId?.join(" ")}
        />
      </div>
    </>
  );
}
