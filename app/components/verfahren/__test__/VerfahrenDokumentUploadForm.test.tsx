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
  // The action can't parse the request in jsdom (its File isn't the one
  // Node's fetch expects), so the submitted values are captured from the
  // form's submit event instead
  const submissions: FormData[] = [];
  const action = vi.fn(() => actionResult);
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <VerfahrenDokumentUploadForm {...baseProps} {...props} />
      ),
      action,
    },
  ]);
  const result = renderWithTestTranslations(<Stub />);
  result.container.addEventListener("submit", ({ target, submitter }) => {
    submissions.push(new FormData(target as HTMLFormElement, submitter));
  });

  return { ...result, submissions, action };
}

const pdfFile = new File(["%PDF"], "a.pdf", { type: "application/pdf" });

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

  it("offers only the Schriftstück and the Anlage as types", async () => {
    const { findAllByRole } = renderForm();

    expect(
      (await findAllByRole("radio")).map((radio) =>
        radio.getAttribute("value"),
      ),
    ).toEqual(["SCHRIFTSTUECK", "ANHANG"]);
  });

  it("limits the Dokument to PDF and DOCX and its Signaturdatei to signatures", async () => {
    const { findByLabelText } = renderForm();

    const dokumentInput = await findByLabelText("Datei hochladen");
    expect(dokumentInput).toHaveAttribute(
      "accept",
      expect.stringContaining(".pdf"),
    );
    expect(dokumentInput).toHaveAttribute(
      "accept",
      expect.stringContaining(".docx"),
    );

    const signaturdateiInput = await findByLabelText(
      "Zugehörige Signaturdatei (optional)",
    );
    expect(signaturdateiInput).toHaveAttribute("name", "signaturdatei");
    expect(signaturdateiInput).toHaveAttribute(
      "accept",
      ".p7s,.pkcs7,.p7,application/pkcs7-signature,application/x-pkcs7-signature",
    );
    expect(signaturdateiInput).not.toHaveAttribute("aria-required");
  });

  it("submits the chosen type and the Einreichung", async () => {
    const { findByRole, container } = renderForm();

    fireEvent.click(await findByRole("radio", { name: "Anlage" }));

    expect(container.querySelector("form")).toHaveFormValues({
      formType: "upload",
      einreichungId: "einreichung-1",
      typ: "ANHANG",
    });
  });

  it("sends no Einreichung before it exists", async () => {
    const { findByLabelText, container } = renderForm({
      einreichungId: undefined,
    });

    await findByLabelText("Datei hochladen");
    expect(container.querySelector('input[name="einreichungId"]')).toBeNull();
  });

  it("doesn't upload when a file is selected", async () => {
    const { findByLabelText, submissions } = renderForm();

    fireEvent.change(await findByLabelText("Datei hochladen"), {
      target: { files: [pdfFile] },
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(submissions).toHaveLength(0);
  });

  it("uploads with the type chosen last, in any order, on clicking Hochladen", async () => {
    const { findByLabelText, getByRole, submissions, action } = renderForm();

    // File first, then the type
    fireEvent.change(await findByLabelText("Datei hochladen"), {
      target: { files: [pdfFile] },
    });
    fireEvent.click(getByRole("radio", { name: "Anlage" }));
    fireEvent.click(getByRole("button", { name: "Hochladen" }));

    await vi.waitFor(() => expect(submissions).toHaveLength(1));
    expect(submissions[0]?.get("typ")).toBe("ANHANG");
    expect(submissions[0]?.get("formType")).toBe("upload");
    await vi.waitFor(() => expect(action).toHaveBeenCalledOnce());
  });

  it("keeps everything focusable but blocks it while disabled", async () => {
    const { findByLabelText, getByRole, submissions } = renderForm({
      disabled: true,
    });

    for (const label of [
      "Datei hochladen",
      "Zugehörige Signaturdatei (optional)",
    ]) {
      const input = await findByLabelText(label);
      expect(input).not.toBeDisabled();
      expect(input).toHaveAttribute("aria-disabled", "true");
      expect(fireEvent.click(input)).toBe(false);
    }

    fireEvent.click(getByRole("radio", { name: "Anlage" }));
    expect(getByRole("radio", { name: "Schriftstück" })).toBeChecked();

    const button = getByRole("button", { name: "Hochladen" });
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(fireEvent.click(button)).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(submissions).toHaveLength(0);
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

  it("shows an invalid Signaturdatei at its own input", async () => {
    const { findByLabelText, getByLabelText, container } = renderForm(
      {},
      {
        status: "invalid",
        fieldErrors: { signaturdatei: ["Invalid input"] },
        data: { formType: "upload", typ: "SCHRIFTSTUECK" },
      },
    );

    const input = await findByLabelText("Zugehörige Signaturdatei (optional)");
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);

    await vi.waitFor(() =>
      expect(input).toHaveAttribute(
        "aria-describedby",
        "dokument-upload-signaturdatei-hint dokument-upload-signaturdatei-error",
      ),
    );
    expect(getByLabelText("Datei hochladen")).toHaveAttribute(
      "aria-describedby",
      "dokument-upload-file-hint",
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
