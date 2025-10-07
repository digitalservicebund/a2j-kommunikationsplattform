// @vitest-environment jsdom
import { screen } from "@testing-library/react";

import { useTranslations } from "~/services/translations/context";
import { renderWithTestTranslations } from "~/util/testUtils";

function TestComponent() {
  const { labels } = useTranslations();
  return <span>{labels.LOGGED_IN_AS_LABEL}</span>;
}

it("provides German translations context", () => {
  renderWithTestTranslations(<TestComponent />);
  expect(screen.getByText("Angemeldet als:")).toBeInTheDocument();
});
