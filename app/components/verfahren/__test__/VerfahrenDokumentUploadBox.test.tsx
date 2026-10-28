// @vitest-environment jsdom

import { fireEvent } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { makeDokument } from "~tests/utils/factories/dokument";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenDokumentUploadBox, {
  type VerfahrenDokumentUploadBoxProps,
} from "../VerfahrenDokumentUploadBox";

const baseProps: VerfahrenDokumentUploadBoxProps = {
  typ: "ANHANG",
  dokumente: [],
  verfahrenId: "verfahren-1",
  einreichungId: "einreichung-1",
  disabled: false,
  showFileError: false,
};

function renderBox(props: Partial<VerfahrenDokumentUploadBoxProps> = {}) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <VerfahrenDokumentUploadBox {...baseProps} {...props} />,
    },
  ]);
  return renderWithTestTranslations(<Stub />);
}

describe("VerfahrenDokumentUploadBox", () => {
  it("renders a titled group with a file input for its type", async () => {
    const { findByRole, getByLabelText, container } = renderBox({
      typ: "SIGNATURDATEI",
    });

    expect(
      await findByRole("group", { name: "Signaturdateien" }),
    ).toBeInTheDocument();
    expect(getByLabelText("Datei hochladen")).toHaveAttribute("name", "file");
    expect(container.querySelector('input[name="typ"]')).toHaveValue(
      "SIGNATURDATEI",
    );
  });

  it("shows the size limit without a format list for Signaturdateien", async () => {
    const { findByText, queryByText } = renderBox({ typ: "SIGNATURDATEI" });

    expect(
      await findByText("Maximale Dateigröße ist 104 MB."),
    ).toBeInTheDocument();
    expect(queryByText(/PDF, DOCX/)).toBeNull();
  });

  it("shows the format list for other types", async () => {
    expect(
      await renderBox({ typ: "ANHANG" }).findByText(/PDF, DOCX/),
    ).toBeInTheDocument();
  });

  it("lists the uploaded Dokumente with a delete button each", async () => {
    const { findByText, getAllByRole } = renderBox({
      dokumente: [
        makeDokument({ id: "a", anzeigename: "a.pdf", typ: "ANHANG" }),
        makeDokument({ id: "b", anzeigename: "b.pdf", typ: "ANHANG" }),
      ],
    });

    expect(await findByText("a.pdf")).toBeInTheDocument();
    expect(getAllByRole("button", { name: "Entfernen" })).toHaveLength(2);
  });

  it("lets the uploaded Dokumente be opened and downloaded", async () => {
    const { findByRole, getByRole } = renderBox({
      dokumente: [
        makeDokument({ id: "dok-1", anzeigename: "a.pdf", typ: "ANHANG" }),
      ],
    });

    const dateiPath =
      "/verfahren/verfahren-1/einreichungen/einreichung-1/dokumente/dok-1/datei";
    expect(
      await findByRole("link", { name: "a.pdf (öffnet in neuem Tab)" }),
    ).toHaveAttribute("href", `${dateiPath}?disposition=inline`);
    expect(getByRole("link", { name: "a.pdf herunterladen" })).toHaveAttribute(
      "href",
      `${dateiPath}?disposition=attachment`,
    );
  });

  it("hides the file input of a single-Dokument box once uploaded", async () => {
    const { findByText, queryByLabelText } = renderBox({
      typ: "SCHRIFTSTUECK",
      single: true,
      dokumente: [makeDokument({ anzeigename: "klage.pdf" })],
    });

    expect(await findByText("klage.pdf")).toBeInTheDocument();
    expect(queryByLabelText("Datei hochladen")).toBeNull();
  });

  it("keeps the file input of a multi-Dokument box after uploads", async () => {
    const { findByLabelText } = renderBox({
      dokumente: [makeDokument({ typ: "ANHANG" })],
    });

    expect(await findByLabelText("Datei hochladen")).toBeInTheDocument();
  });

  it("shows the file error and marks the input as disabled", async () => {
    const { findByLabelText } = renderBox({
      showFileError: true,
      disabled: true,
    });

    const input = await findByLabelText("Datei hochladen");
    expect(input).not.toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "file-anhang-hint file-anhang-error",
    );
  });

  it("blocks opening the file picker while disabled", async () => {
    const { findByLabelText } = renderBox({ disabled: true });

    const input = await findByLabelText("Datei hochladen");

    expect(fireEvent.click(input)).toBe(false);
  });

  it("uploads as soon as a file is selected", async () => {
    const requestSubmit = vi
      .spyOn(HTMLFormElement.prototype, "requestSubmit")
      .mockImplementation(() => {});
    const { findByLabelText } = renderBox();

    fireEvent.change(await findByLabelText("Datei hochladen"), {
      target: { files: [new File(["%PDF"], "a.pdf")] },
    });

    expect(requestSubmit).toHaveBeenCalledOnce();
    requestSubmit.mockRestore();
  });

  it("ignores a file selected while disabled", async () => {
    const requestSubmit = vi
      .spyOn(HTMLFormElement.prototype, "requestSubmit")
      .mockImplementation(() => {});
    const { findByLabelText } = renderBox({ disabled: true });

    fireEvent.change(await findByLabelText("Datei hochladen"), {
      target: { files: [new File(["%PDF"], "a.pdf")] },
    });

    expect(requestSubmit).not.toHaveBeenCalled();
    requestSubmit.mockRestore();
  });
});
