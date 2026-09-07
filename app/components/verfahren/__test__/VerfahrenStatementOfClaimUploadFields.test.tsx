// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenStatementOfClaimUploadFields from "../VerfahrenStatementOfClaimUploadFields";

const baseProps = {
  errors: {},
  gerichtePromise: Promise.resolve([]),
  selectedGerichtId: "",
  onGerichtIdChange: vi.fn(),
};

describe("VerfahrenStatementOfClaimUploadFields", () => {
  it("renders the file input, verfahrensgegenstand and gericht select without an error", () => {
    const { getByLabelText, queryByText } = renderWithTestTranslations(
      <VerfahrenStatementOfClaimUploadFields {...baseProps} />,
    );

    expect(getByLabelText("Datei hochladen")).toBeInTheDocument();
    expect(getByLabelText("Verfahrensgegenstand")).toBeInTheDocument();
    expect(getByLabelText("Empfängergericht")).toBeInTheDocument();
    expect(queryByText(/104 MB/)).not.toBeNull();
  });

  it("shows the file error message when the file field has an error", () => {
    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenStatementOfClaimUploadFields
        {...baseProps}
        errors={{ file: ["Bitte laden Sie eine Datei hoch."] }}
      />,
    );

    expect(getByLabelText("Datei hochladen")).toHaveAttribute(
      "aria-describedby",
      "file-hint file-error",
    );
  });

  it("joins multiple messages for the same field into one error", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenStatementOfClaimUploadFields
        {...baseProps}
        errors={{ verfahrensgegenstand: ["Fehler eins.", "Fehler zwei."] }}
      />,
    );

    expect(getByText("Fehler eins. Fehler zwei.")).toBeInTheDocument();
  });
});
