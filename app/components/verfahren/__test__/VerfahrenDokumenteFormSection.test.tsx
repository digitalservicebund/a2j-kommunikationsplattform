// @vitest-environment jsdom

import { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { makeDokument } from "~tests/utils/factories/dokument.ts";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import VerfahrenDokumenteFormSection, {
  VerfahrenDokumenteFormSectionProps,
} from "../VerfahrenDokumenteFormSection.tsx";

const baseProps: VerfahrenDokumenteFormSectionProps = {
  disabled: false,
  uploading: false,
  showFileInputError: false,
  uploadFileInputRef: createRef<HTMLInputElement>(),
  onFileInputChange: vi.fn(),
  selectedDokumentType: "",
  onDokumentTypeChange: vi.fn(),
  dokumentTypeError: undefined,
  onDeleteDokument: vi.fn(),
  uploadedDokumente: [],
};

describe(VerfahrenDokumenteFormSection, () => {
  const t = getTestTranslations();

  function getFileInput({ getByLabelText }: RenderResult) {
    return getByLabelText(t.shared.form.uploadDokument.label);
  }

  function getUploadButton({ getByRole }: RenderResult) {
    return getByRole("button", {
      name: (name) =>
        name === t.shared.form.uploadDokument.submit ||
        name === t.shared.form.uploadDokument.submitting,
    });
  }

  function queryDokumentTypOption({ queryByRole }: RenderResult, name: string) {
    return queryByRole("option", { name });
  }

  function findUploadedDokumentDeleteButton({ findByRole }: RenderResult) {
    return findByRole("button", { name: "Entfernen" });
  }

  it("renders the upload controls", () => {
    const result = renderWithTestTranslations(
      <VerfahrenDokumenteFormSection {...baseProps} />,
    );

    const fileInput = getFileInput(result);
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).not.toBeDisabled();

    const uploadButton = getUploadButton(result);
    expect(uploadButton).toBeInTheDocument();
    expect(uploadButton).not.toBeDisabled();
    expect(uploadButton).toHaveAccessibleName(
      t.shared.form.uploadDokument.submit,
    );
  });

  it("disables upload controls if disabled", () => {
    const result = renderWithTestTranslations(
      <VerfahrenDokumenteFormSection {...baseProps} disabled={true} />,
    );

    expect(getFileInput(result)).toBeDisabled();
    expect(getUploadButton(result)).toBeDisabled();
  });

  it("disables upload controls and adjusts while uploading", () => {
    const result = renderWithTestTranslations(
      <VerfahrenDokumenteFormSection {...baseProps} uploading={true} />,
    );

    const fileInput = getFileInput(result);
    expect(fileInput).toBeDisabled();

    const uploadButton = getUploadButton(result);
    expect(uploadButton).toBeDisabled();
    expect(uploadButton).toHaveAccessibleName(
      t.shared.form.uploadDokument.submitting,
    );
  });

  it("doesn't offer uploading another Schriftstück, since the Klageschrift is the only one", () => {
    const result = renderWithTestTranslations(
      <VerfahrenDokumenteFormSection {...baseProps} />,
    );

    expect(queryDokumentTypOption(result, "Anhang")).toBeInTheDocument();
    expect(queryDokumentTypOption(result, "Schriftstück")).toBeNull();
  });

  it("renders delete button on uploaded document and calls onDeleteDokument when deleted", async () => {
    const user = userEvent.setup();
    const onDeleteDokument = vi.fn();
    const dokument = makeDokument();

    const result = renderWithTestTranslations(
      <VerfahrenDokumenteFormSection
        {...baseProps}
        uploadedDokumente={[makeDokument()]}
        onDeleteDokument={onDeleteDokument}
      />,
    );

    const deleteButton = await findUploadedDokumentDeleteButton(result);
    await user.click(deleteButton);

    expect(onDeleteDokument).toHaveBeenCalledWith(dokument);
  });
});
