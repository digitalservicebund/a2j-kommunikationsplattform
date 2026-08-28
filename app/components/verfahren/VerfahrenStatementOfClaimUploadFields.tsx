import InputField from "~/components/InputField";
import InputFile from "~/components/InputFile";
import VerfahrenGerichteSelect, {
  type GerichtSelectItem,
} from "~/components/verfahren/VerfahrenGerichteSelect";
import { useTranslations } from "~/services/translations/context";

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
          className="bg-kern-feedback-info-background flex-1 self-end"
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
