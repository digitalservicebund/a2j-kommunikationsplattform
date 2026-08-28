// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenStatementOfClaimUploadFields from "../VerfahrenStatementOfClaimUploadFields";

const baseProps = {
  hasFileError: false,
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

  it("shows the file error message when hasFileError is true", () => {
    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenStatementOfClaimUploadFields {...baseProps} hasFileError />,
    );

    expect(getByLabelText("Datei hochladen")).toHaveAttribute(
      "aria-describedby",
      "file-hint file-error",
    );
  });
});
