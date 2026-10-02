// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { it } from "vitest";
import { useTranslations } from "~/services/translations/context";
import { renderWithTestTranslations } from "./translationsUtil";

function TestComponent() {
  const t = useTranslations();
  return <span>{t.shared.cancel}</span>;
}

it("provides German translations context", () => {
  renderWithTestTranslations(<TestComponent />);
  expect(screen.getByText("Abbrechen")).toBeInTheDocument();
});
