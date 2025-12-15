import { InputSelectOption } from "~/components/InputSelect";

const VERFAHREN_PAGE_LIMIT = 100;
const TOO_MANY_RESULTS_THRESHOLD = 50;

const sortOptions: InputSelectOption[] = [
  { value: "eingereicht_am", label: "Neuste Einreichungen zuerst" },
  { value: "-eingereicht_am", label: "Älteste Einreichungen zuerst" },
  { value: "aktenzeichen_gericht", label: "Aktenzeichen des Gerichts (A↓Z)" },
  { value: "-aktenzeichen_gericht", label: "Aktenzeichen des Gerichts (Z↓A)" },
];

export { sortOptions, TOO_MANY_RESULTS_THRESHOLD, VERFAHREN_PAGE_LIMIT };
