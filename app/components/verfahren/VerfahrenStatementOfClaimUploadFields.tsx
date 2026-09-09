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

type VerfahrenStatementOfClaimUploadFieldsProps = {
  hasFileError: boolean;
  gerichtePromise: Promise<GerichtSelectItem[]>;
  selectedGerichtId: string;
  onGerichtIdChange: (selectedValue: string) => void;
};

export default function VerfahrenStatementOfClaimUploadFields({
  hasFileError,
  gerichtePromise,
  selectedGerichtId,
  onGerichtIdChange,
}: Readonly<VerfahrenStatementOfClaimUploadFieldsProps>) {
  const { shared } = useTranslations();

  return (
    <>
      <InputFile
        label={shared.form.uploadDokument.label}
        id="file"
        hint={shared.form.uploadDokument.hint}
        error={hasFileError ? shared.form.uploadDokument.error : undefined}
        accept={ACCEPTED_KLAGESCHRIFT_FILE_TYPES}
        required
      />

      <div className="kern-gap-md flex w-full">
        <InputField
          label={shared.form.labels.verfahrensgegenstand}
          id="verfahrensgegenstand"
          required
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <VerfahrenGerichteSelect
          id="gerichtId"
          label={shared.form.labels.recipientCourt}
          className="flex-1 self-end bg-(--kern-color-feedback-info-background)"
          placeholder={shared.form.select.placeholder}
          gerichtePromise={gerichtePromise}
          initialSelectedValue={selectedGerichtId}
          onValueChange={onGerichtIdChange}
          required
        />
      </div>
    </>
  );
}
