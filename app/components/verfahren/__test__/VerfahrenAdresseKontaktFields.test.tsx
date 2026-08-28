// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import VerfahrenAdresseKontaktFields from "../VerfahrenAdresseKontaktFields";

describe("VerfahrenAdresseKontaktFields", () => {
  it("renders all six fields with the given id/name prefixes and values", () => {
    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenAdresseKontaktFields
        idPrefix="klagende-partei"
        namePrefix="klagendePartei"
        strasse="Bockenheimer Landstraße"
        hausnummer="42"
        postleitzahl="60323"
        ort="Frankfurt am Main"
        email="emilia@example.de"
        telefon="0123456789"
      />,
    );

    const strasse = getByLabelText("Straße") as HTMLInputElement;
    expect(strasse.id).toBe("klagende-partei-strasse");
    expect(strasse.name).toBe("klagendeParteiStrasse");
    expect(strasse.value).toBe("Bockenheimer Landstraße");

    const hausnummer = getByLabelText("Hausnummer") as HTMLInputElement;
    expect(hausnummer.id).toBe("klagende-partei-hausnummer");
    expect(hausnummer.name).toBe("klagendeParteiHausnummer");
    expect(hausnummer.value).toBe("42");

    const email = getByLabelText("E-Mail (optional)") as HTMLInputElement;
    expect(email.id).toBe("klagende-partei-email");
    expect(email.name).toBe("klagendeParteiEmail");
    expect(email.value).toBe("emilia@example.de");
  });

  it("gives the postleitzahl field a numeric input mode", () => {
    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenAdresseKontaktFields
        idPrefix="klagende-partei"
        namePrefix="klagendePartei"
        strasse=""
        hausnummer=""
        postleitzahl="60323"
        ort=""
        email=""
        telefon=""
      />,
    );

    expect(getByLabelText("Postleitzahl")).toHaveAttribute(
      "inputmode",
      "numeric",
    );
  });
});
