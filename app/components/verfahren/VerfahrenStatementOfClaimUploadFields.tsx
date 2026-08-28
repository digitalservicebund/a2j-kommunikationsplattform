import InputField from "~/components/InputField";
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
      <div
        className={
          hasFileError
            ? "kern-form-input--error kern-form-input"
            : "kern-form-input"
        }
      >
        <label className="kern-label" htmlFor="file">
          {shared.form.uploadDokument.label}
        </label>
        <div className="kern-hint" id="input-file-hint">
          {shared.form.uploadDokument.hint}
        </div>
        <input
          className={
            hasFileError
              ? "kern-form-input__input kern-form-input__input--error"
              : "kern-form-input__input"
          }
          id="file"
          name="file"
          type="file"
          aria-describedby={
            hasFileError
              ? "input-file-hint file-input-error"
              : "input-file-hint"
          }
          required
        />
        {hasFileError && (
          <p className="kern-error" id="file-input-error">
            <span
              className="kern-icon kern-icon--danger kern-icon--md"
              aria-hidden="true"
            ></span>
            <span className="kern-body">
              {shared.form.uploadDokument.error}
            </span>
          </p>
        )}
      </div>

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
