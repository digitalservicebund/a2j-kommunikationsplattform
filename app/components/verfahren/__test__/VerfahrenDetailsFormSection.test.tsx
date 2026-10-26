// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenDetailsFormSection from "../VerfahrenDetailsFormSection";

const gericht = { id: "gericht-1", wert: "Amtsgericht Bremen" };

describe("VerfahrenDetailsFormSection", () => {
  it("renders the verfahren detail fields with the given values", () => {
    const { getByText, getByLabelText } = renderWithTestTranslations(
      <VerfahrenDetailsFormSection
        kurzrubrum="Müller ./. Weber"
        claimReference="AZ-TEST-001"
        verfahrensgegenstand="Zahlungsklage"
        gericht={gericht}
      />,
    );

    expect(getByText("Verfahrensdetails")).toBeInTheDocument();
    expect((getByLabelText("Rubrum") as HTMLInputElement).value).toBe(
      "Müller ./. Weber",
    );
    expect(
      (getByLabelText("Verfahrensgegenstand") as HTMLInputElement).value,
    ).toBe("Zahlungsklage");
  });

  it("shows the given court as the only, disabled option", () => {
    const { getByLabelText, getAllByRole } = renderWithTestTranslations(
      <VerfahrenDetailsFormSection
        kurzrubrum=""
        claimReference=""
        verfahrensgegenstand=""
        gericht={gericht}
      />,
    );

    const select = getByLabelText("Empfängergericht") as HTMLSelectElement;
    expect(select.value).toBe("gericht-1");
    expect(select).toHaveAttribute("aria-disabled", "true");
    expect(getAllByRole("option")).toHaveLength(1);
  });

  it("shows field errors by field name", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenDetailsFormSection
        kurzrubrum=""
        claimReference=""
        verfahrensgegenstand=""
        gericht={gericht}
        errors={{ subjectMatterOfTheProceedings: ["Pflichtfeld."] }}
      />,
    );

    expect(getByText("Pflichtfeld.")).toBeInTheDocument();
  });
});
