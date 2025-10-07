import React, { useContext } from "react";
import { dictionaries, Translations } from "~/services/translations/index";

export const TranslationsContext = React.createContext<Translations>(
  dictionaries.de,
);

export function TranslationsProvider({
  children,
  value = dictionaries.de,
}: {
  children: React.ReactNode;
  value?: Translations;
}) {
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}
export function useTranslations() {
  return useContext(TranslationsContext);
}
