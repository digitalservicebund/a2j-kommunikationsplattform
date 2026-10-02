// @vitest-environment jsdom

import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import VerfahrenUploadedKlageschrift from "../VerfahrenUploadedKlageschrift";

const klageschrift: Dokument = {
  id: "dok-1",
  status: "ERSTELLT",
  validierungslaufStatus: "AUSSTEHEND",
  dateiname: "klage.pdf",
  anzeigename: "Klage.pdf",
  sizeInBytes: 2048,
  contentType: "application/pdf",
  hash: "hash",
  hashAlgorithmus: "SHA-256",
  typ: "SCHRIFTSTUECK",
  gesendetAm: null,
  eingereichtAm: null,
  erstelltVon: "user-1",
  erstelltAm: "2026-01-01T00:00:00.000Z",
  sichtbarkeitAlle: true,
};

describe("VerfahrenUploadedKlageschrift", () => {
  it("renders the uploaded document's name, size and the hidden form fields", () => {
    const { getByText, getByRole, container } = renderWithTestTranslations(
      <VerfahrenUploadedKlageschrift
        klageschrift={klageschrift}
        verfahrenId="verfahren-1"
        einreichungId="einreichung-1"
        isSubmitting={false}
      />,
    );

    expect(getByText("Klage.pdf")).toBeInTheDocument();
    expect(getByRole("button", { name: "Entfernen" })).not.toBeDisabled();
    expect(container.querySelector('input[name="verfahrenId"]')).toHaveValue(
      "verfahren-1",
    );
    expect(container.querySelector('input[name="einreichungId"]')).toHaveValue(
      "einreichung-1",
    );
    expect(container.querySelector('input[name="dokumentId"]')).toHaveValue(
      "dok-1",
    );
  });

  it("disables the delete button while submitting", () => {
    const { getByRole } = renderWithTestTranslations(
      <VerfahrenUploadedKlageschrift
        klageschrift={klageschrift}
        verfahrenId="verfahren-1"
        einreichungId="einreichung-1"
        isSubmitting
      />,
    );

    expect(getByRole("button", { name: "Entfernen" })).toBeDisabled();
  });
});
