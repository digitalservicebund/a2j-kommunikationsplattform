// @vitest-environment jsdom

import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import type { Dokument } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import VerfahrenDocumentsFormSection from "../VerfahrenDocumentsFormSection";

const buildDokument = (overrides: Partial<Dokument> = {}): Dokument => ({
  id: "dok-1",
  status: "ERSTELLT",
  validierungslaufStatus: "AUSSTEHEND",
  dateiname: "klage.pdf",
  anzeigename: "Klage.pdf",
  sizeInBytes: 1024,
  contentType: "application/pdf",
  hash: "hash",
  hashAlgorithmus: "SHA-256",
  typ: "SCHRIFTSTUECK",
  gesendetAm: null,
  eingereichtAm: null,
  erstelltVon: "user-1",
  erstelltAm: "2026-01-01T00:00:00.000Z",
  sichtbarkeitAlle: true,
  ...overrides,
});

const baseProps = {
  submitState: "idle",
  showFileInputError: false,
  uploadFileInputRef: createRef<HTMLInputElement>(),
  onFileInputChange: vi.fn(),
  selectedDokumentType: "",
  onDokumentTypeChange: vi.fn(),
  dokumentTypeError: undefined,
  onDeleteDokument: vi.fn(),
};

describe("VerfahrenDocumentsFormSection", () => {
  it("renders the upload controls", () => {
    const { getByLabelText, getByRole } = renderWithTestTranslations(
      <VerfahrenDocumentsFormSection
        {...baseProps}
        dokumente={[]}
        uploadedDokumente={[]}
      />,
    );

    expect(getByLabelText("Datei hochladen")).toBeInTheDocument();
    expect(getByRole("button", { name: "Hochladen" })).toBeInTheDocument();
  });

  it("renders uploaded documents and calls onDeleteDokument when deleted", async () => {
    const user = userEvent.setup();
    const onDeleteDokument = vi.fn();
    const dokument = buildDokument();

    const { findByRole } = renderWithTestTranslations(
      <VerfahrenDocumentsFormSection
        {...baseProps}
        dokumente={[dokument, buildDokument({ id: "dok-2" })]}
        uploadedDokumente={[dokument]}
        onDeleteDokument={onDeleteDokument}
      />,
    );

    const deleteButton = await findByRole("button", { name: "Entfernen" });
    await user.click(deleteButton);

    expect(onDeleteDokument).toHaveBeenCalledWith(dokument);
  });
});
