// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import VerfahrenBeklagterSection from "../VerfahrenBeklagterSection";

describe("VerfahrenBeklagterSection", () => {
  it("renders the defendant name and address fields with the given values", () => {
    const { getByText, getByLabelText } = renderWithTestTranslations(
      <VerfahrenBeklagterSection
        firstName="Max"
        lastName="Mustermann"
        anschrift={{ strasse: "Römerberg", hausnummer: "2" }}
        email="max@example.de"
        telefon="0123456789"
        errors={{}}
      />,
    );

    expect(getByText("Beklagte Partei")).toBeInTheDocument();
    expect((getByLabelText("Vorname") as HTMLInputElement).value).toBe("Max");
    expect((getByLabelText("Nachname") as HTMLInputElement).value).toBe(
      "Mustermann",
    );
    expect((getByLabelText("Straße") as HTMLInputElement).value).toBe(
      "Römerberg",
    );
  });
});
