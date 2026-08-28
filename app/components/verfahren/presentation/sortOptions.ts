import { InputSelectOption } from "~/components/InputSelect";
import { SORT_VALUES } from "~/domains/verfahren/services/verfahrenListOptions";
import { dictionaries } from "~/services/translations";

const sortLabels: Record<(typeof SORT_VALUES)[number], string> = {
  eingereichtAm:
    dictionaries.de.shared.VERFAHREN_EINREICHUNGEN_LATEST_FIRST_LABEL,
  "-eingereichtAm":
    dictionaries.de.shared.VERFAHREN_EINREICHUNGEN_OLDEST_FIRST_LABEL,
  aktenzeichenGericht: dictionaries.de.shared.VERFAHREN_AKTENZEICHEN_ASC_LABEL,
  "-aktenzeichenGericht":
    dictionaries.de.shared.VERFAHREN_AKTENZEICHEN_DESC_LABEL,
};

export const sortOptions: InputSelectOption[] = SORT_VALUES.map((value) => ({
  value,
  label: sortLabels[value],
}));
