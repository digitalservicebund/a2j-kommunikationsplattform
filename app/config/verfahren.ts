import { InputSelectOption } from "~/components/InputSelect";
import { dictionaries } from "~/services/translations";

const VERFAHREN_PAGE_LIMIT = 100;
const TOO_MANY_RESULTS_THRESHOLD = 50;

const sortOptions: InputSelectOption[] = [
  {
    value: "eingereicht_am",
    label: dictionaries.de.labels.VERFAHREN_EINREICHUNGEN_LATEST_FIRST_LABEL,
  },
  {
    value: "-eingereicht_am",
    label: dictionaries.de.labels.VERFAHREN_EINREICHUNGEN_OLDEST_FIRST_LABEL,
  },
  {
    value: "aktenzeichen_gericht",
    label: dictionaries.de.labels.VERFAHREN_AKTENZEICHEN_ASC_LABEL,
  },
  {
    value: "-aktenzeichen_gericht",
    label: dictionaries.de.labels.VERFAHREN_AKTENZEICHEN_DESC_LABEL,
  },
];

export { sortOptions, TOO_MANY_RESULTS_THRESHOLD, VERFAHREN_PAGE_LIMIT };
