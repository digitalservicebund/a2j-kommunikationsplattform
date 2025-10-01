import de from "./de";
import en from "./en";

const translations = { de, en } as const;

export type Language = keyof typeof translations;
export type RouteName = keyof typeof de;

export function getTranslations(lang: Language) {
  return translations[lang] || translations.de;
}
