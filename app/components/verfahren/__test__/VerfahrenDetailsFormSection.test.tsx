// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenDetailsFormSection from "../VerfahrenDetailsFormSection";

describe("VerfahrenDetailsFormSection", () => {
  it("renders the verfahren detail fields with the given values", () => {
    const { getByText, getByLabelText } = renderWithTestTranslations(
      <VerfahrenDetailsFormSection
        kurzrubrum="Müller ./. Weber"
        claimReference="AZ-TEST-001"
        verfahrensgegenstand="Zahlungsklage"
        courtId=""
        gerichte={[]}
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
});
