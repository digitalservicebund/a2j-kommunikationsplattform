// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { it } from "vitest";

import { useTranslations } from "~/services/translations/context";
import { renderWithTestTranslations } from "./translationsUtil";

function TestComponent() {
  const { shared } = useTranslations();
  return <span>{shared.LOGGED_IN_AS_LABEL}</span>;
}

it("provides German translations context", () => {
  renderWithTestTranslations(<TestComponent />);
  expect(screen.getByText("Angemeldet als:")).toBeInTheDocument();
});
