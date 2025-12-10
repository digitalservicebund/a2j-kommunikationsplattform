import { InputSelectOption } from "~/components/InputSelect";

const VERFAHREN_PAGE_LIMIT = 10;
const TOO_MANY_RESULTS_THRESHOLD = 50;
const MAX_EXACT_COUNT_DISPLAY = 100;

const sortOptions: InputSelectOption[] = [
  { value: "eingereicht_am", label: "Neuste Einreichungen zuerst" },
  { value: "-eingereicht_am", label: "Älteste Einreichungen zuerst" },
  { value: "aktenzeichen_gericht", label: "Aktenzeichen des Gerichts (A↓Z)" },
  { value: "-aktenzeichen_gericht", label: "Aktenzeichen des Gerichts (Z↓A)" },
];

export {
  MAX_EXACT_COUNT_DISPLAY,
  sortOptions,
  TOO_MANY_RESULTS_THRESHOLD,
  VERFAHREN_PAGE_LIMIT,
};
