import { render } from "@testing-library/react";
import React from "react";
import { dictionaries, Language } from "~/services/translations";
import { TranslationsProvider } from "~/services/translations/context";

const TEST_LANGUAGE: Language = "de";

export function getTestTranslations() {
  // Returning DE translations for tests, but in the future we might want to make this configurable to work with other languages
  return dictionaries[TEST_LANGUAGE];
}

/**
 * Returns the translations object for tests.
 * Currently returns German translations, but can be made configurable for other languages in the future.
 */

/**
 * Renders a React element wrapped in the TranslationsProvider for testing.
 * Uses the test language defined in DEFAULT_LANGUAGE.
 */
export function renderWithTestTranslations(ui: React.ReactElement) {
  return render(
    <TranslationsProvider value={getTestTranslations()}>
      {ui}
    </TranslationsProvider>,
  );
}
