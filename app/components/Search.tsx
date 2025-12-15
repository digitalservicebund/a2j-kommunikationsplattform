import InputText from "~/components/InputText";

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
  return (
    <search>
      <form onSubmit={handleSubmit}>
        <InputText
          onFocus={(e) => e.currentTarget.select()}
          label="Suche"
          placeholder="Freie Textsuche zum Beispiel nach Aktenzeichen, Parteien, Gerichten, ..."
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
          <span className="kern-label">Suchen</span>
        </button>
      </form>
    </search>
  );
}
