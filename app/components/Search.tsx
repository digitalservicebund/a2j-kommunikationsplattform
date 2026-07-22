import InputText from "~/components/InputText";
import { useTranslations } from "~/services/translations/context";

export interface SearchProps {
  handleSearch: (event: React.SubmitEvent<HTMLFormElement>) => void;
  disabled: boolean;
  defaultValue: string;
  id: string;
}
export default function Search({
  handleSearch,
  disabled: shouldDisableInputs,
  defaultValue,
  id,
}: Readonly<SearchProps>) {
  const { shared, buttons } = useTranslations();
  return (
    <search>
      <form onSubmit={handleSearch}>
        <div className="space-x-kern-space-x-large flex items-start justify-between">
          {/* using type text as there is no search input in KERN yet*/}
          <InputText
            onFocus={(e) => e.currentTarget.select()} // Select all text on focus - useful for quick replacement
            label={shared.SEARCH_LABEL}
            placeholder={shared.form.search.placeholder}
            id={id}
            defaultValue={defaultValue}
            className="grow"
            disabled={shouldDisableInputs}
          />
          <button
            type="submit"
            className="kern-btn kern-btn--primary h-max flex-none self-end"
            disabled={shouldDisableInputs}
          >
            <span
              className="kern-icon kern-icon--search kern-icon--default"
              aria-hidden="true"
            ></span>
            <span className="kern-label">{buttons.SEARCH_BUTTON}</span>
          </button>
        </div>
      </form>
    </search>
  );
}
