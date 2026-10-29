// @vitest-environment jsdom

import { fireEvent } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenDokumentUploadForm, {
  type VerfahrenDokumentUploadFormProps,
} from "../VerfahrenDokumentUploadForm";

const baseProps: VerfahrenDokumentUploadFormProps = {
  einreichungId: "einreichung-1",
  hasSchriftstueck: false,
  disabled: false,
};

function renderForm(
  props: Partial<VerfahrenDokumentUploadFormProps> = {},
  actionResult: unknown = null,
) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <VerfahrenDokumentUploadForm {...baseProps} {...props} />
      ),
      action: () => actionResult,
    },
  ]);
  return renderWithTestTranslations(<Stub />);
}

describe("VerfahrenDokumentUploadForm", () => {
  it("preselects the Schriftstück until one exists", async () => {
    const { findByRole } = renderForm({ schriftstueckLabel: "Klageschrift" });

    expect(await findByRole("radio", { name: "Klageschrift" })).toBeChecked();
  });

  it("preselects the Anlage and marks the Schriftstück as unavailable once one exists", async () => {
    const { findByRole, getByRole } = renderForm({ hasSchriftstueck: true });

    expect(await findByRole("radio", { name: "Anlage" })).toBeChecked();
    const schriftstueck = getByRole("radio", {
      name: "Schriftstück (bereits hochgeladen)",
    });
    expect(schriftstueck).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(schriftstueck);

    expect(schriftstueck).not.toBeChecked();
    expect(getByRole("radio", { name: "Anlage" })).toBeChecked();
  });

  it("adapts the hint and accepted files to the chosen type", async () => {
    const { findByLabelText, getByRole, findByText } = renderForm();

    expect(await findByLabelText("Datei hochladen")).toHaveAttribute(
      "accept",
      expect.stringContaining(".pdf"),
    );

    fireEvent.click(getByRole("radio", { name: "Signaturdatei" }));

    expect(
      await findByText("Maximale Dateigröße ist 104 MB."),
    ).toBeInTheDocument();
    expect(await findByLabelText("Datei hochladen")).not.toHaveAttribute(
      "accept",
    );
  });

  it("submits the chosen type and the Einreichung", async () => {
    const { findByRole, container } = renderForm();

    fireEvent.click(await findByRole("radio", { name: "Signaturdatei" }));

    expect(container.querySelector("form")).toHaveFormValues({
      formType: "upload",
      einreichungId: "einreichung-1",
      typ: "SIGNATURDATEI",
    });
  });

  it("sends no Einreichung before it exists", async () => {
    const { findByLabelText, container } = renderForm({
      einreichungId: undefined,
    });

    await findByLabelText("Datei hochladen");
    expect(container.querySelector('input[name="einreichungId"]')).toBeNull();
  });

  it("uploads as soon as a file is selected", async () => {
    const requestSubmit = vi
      .spyOn(HTMLFormElement.prototype, "requestSubmit")
      .mockImplementation(() => {});
    const { findByLabelText } = renderForm();

    fireEvent.change(await findByLabelText("Datei hochladen"), {
      target: { files: [new File(["%PDF"], "a.pdf")] },
    });

    expect(requestSubmit).toHaveBeenCalledOnce();
    requestSubmit.mockRestore();
  });

  it("keeps everything focusable but blocks it while disabled", async () => {
    const requestSubmit = vi
      .spyOn(HTMLFormElement.prototype, "requestSubmit")
      .mockImplementation(() => {});
    const { findByLabelText, getByRole } = renderForm({ disabled: true });

    const input = await findByLabelText("Datei hochladen");
    expect(input).not.toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(fireEvent.click(input)).toBe(false);

    fireEvent.change(input, {
      target: { files: [new File(["%PDF"], "a.pdf")] },
    });
    expect(requestSubmit).not.toHaveBeenCalled();

    fireEvent.click(getByRole("radio", { name: "Anlage" }));
    expect(getByRole("radio", { name: "Schriftstück" })).toBeChecked();
    requestSubmit.mockRestore();
  });

  it("shows the file error of an invalid upload", async () => {
    const { findByLabelText, container } = renderForm(
      {},
      {
        status: "invalid",
        fieldErrors: { file: ["Bitte laden Sie eine Datei hoch."] },
        data: { formType: "upload", typ: "SCHRIFTSTUECK" },
      },
    );

    const input = await findByLabelText("Datei hochladen");
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);

    await vi.waitFor(() =>
      expect(input).toHaveAttribute(
        "aria-describedby",
        "dokument-upload-file-hint dokument-upload-file-error",
      ),
    );
  });

  it("shows a refused upload", async () => {
    const { findByText, findByLabelText, container } = renderForm(
      {},
      {
        status: "error",
        error: "Es wurde bereits ein Schriftstück hochgeladen.",
        data: { formType: "upload", typ: "SCHRIFTSTUECK" },
      },
    );

    await findByLabelText("Datei hochladen");
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);

    expect(
      await findByText("Es wurde bereits ein Schriftstück hochgeladen."),
    ).toBeInTheDocument();
  });
});
