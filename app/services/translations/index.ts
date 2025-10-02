import de from "./de";
import en from "./en";

export const dictionaries = { de, en } as const;

export type Language = keyof typeof dictionaries;
//This converts all properties from DE translations to strings, hence making the type usable for type safety in other languages without enforcing the german text
export type Stringified<T> = {
  [K in keyof T]: T[K] extends object ? Stringified<T[K]> : string;
};
export type Translations = Stringified<typeof de>;
