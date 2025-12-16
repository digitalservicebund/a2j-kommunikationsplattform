import InputText from "~/components/InputText";
import { useTranslations } from "~/services/translations/context";

export interface SearchProps {
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  defaultValue: string;
}
export default function Search({
  submit: handleSubmit,
  disabled: shouldDisableInputs,
  defaultValue,
}: Readonly<SearchProps>) {
  const { placeholders, labels, buttons } = useTranslations();
  return (
    <search>
      <form onSubmit={handleSubmit}>
        <InputText
          onFocus={(e) => e.currentTarget.select()} // Select all text on focus - useful for quick replacement
          label={labels.SEARCH_LABEL}
          placeholder={placeholders.SEARCH_PLACEHOLDER}
          id="search_text"
          defaultValue={defaultValue}
        />
        <button
          type="submit"
          className="kern-btn kern-btn--primary"
          disabled={shouldDisableInputs}
        >
          <span
            className="kern-icon kern-icon--search kern-icon--default"
            aria-hidden="true"
          ></span>
          <span className="kern-label">{buttons.SEARCH_BUTTON}</span>
        </button>
      </form>
    </search>
  );
}
