import { ChangeEvent, SyntheticEvent } from "react";
import InputSelect from "~/components/InputSelect";
import Search from "~/components/Search";
import { sortOptions } from "~/components/verfahren/presentation/sortOptions";
import type { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenFilterBarProps = {
  gerichte: CodeWert[];
  isInputDisabled: boolean;
  searchDefaultValue: string;
  onSearch: (event: SyntheticEvent<HTMLFormElement>) => void;
  gerichtValue: string;
  onGerichtChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  sortValue: string;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function VerfahrenFilterBar({
  gerichte,
  isInputDisabled,
  searchDefaultValue,
  onSearch,
  gerichtValue,
  onGerichtChange,
  sortValue,
  onSortChange,
}: Readonly<VerfahrenFilterBarProps>) {
  const { shared } = useTranslations();

  const gerichteOptions = gerichte.map((g) => ({
    value: g.id,
    label: g.wert || "",
  }));

  return (
    <div className="bg-kern-layout-background-default pt-kern-space-large space-y-kern-space-large sticky top-0 z-40 flex flex-col">
      <div className="gap-kern-space-x-large grid grid-cols-1 items-start lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Search
            handleSearch={onSearch}
            disabled={isInputDisabled}
            defaultValue={searchDefaultValue}
            id="search_text"
          />
        </div>
        <InputSelect
          label={shared.COURT_LABEL}
          id="gericht"
          placeholder={shared.SHOW_ALL_LABEL}
          options={gerichteOptions}
          onChange={onGerichtChange}
          disabled={isInputDisabled}
          selectedValue={gerichtValue}
        />
        <InputSelect
          label={shared.SORT_LABEL}
          id="sort"
          options={sortOptions}
          onChange={onSortChange}
          disabled={isInputDisabled}
          selectedValue={sortValue}
        />
      </div>
      <hr
        className="kern-divider border-kern-layout-border w-full"
        aria-hidden="true"
      />
    </div>
  );
}
