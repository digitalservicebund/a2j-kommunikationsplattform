import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "~/utils/apiError";
import { makeAuthSession } from "~tests/utils/factories/authSession";

const mocks = vi.hoisted(() => ({
  uploadDokumentWithSignaturdatei: vi.fn(),
  fetchDokument: vi.fn(),
  deleteDokumentFromEinreichung: vi.fn(),
  updateDokumentSichtbarkeit: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => mocks,
);

import {
  type EinreichungDokumentActionContext,
  handleDokumentDelete,
  handleDokumentSichtbarkeit,
  handleDokumentUpload,
} from "../einreichungDokumentActions.server";

const authSession = makeAuthSession();
const context: EinreichungDokumentActionContext = {
  authSession,
  verfahrenId: "v-1",
  redirectTo: "/verfahren/v-1",
};

function buildFormData(entries: Record<string, string | File>) {
  const formData = new FormData();
  Object.entries(entries).forEach(([key, value]) => formData.set(key, value));
  return formData;
}

function expectRedirect(response: unknown, location: string) {
  expect(response).toBeInstanceOf(Response);
  expect((response as Response).headers.get("Location")).toBe(location);
}

const pdfFile = new File(["%PDF-1.7"], "a.pdf", { type: "application/pdf" });
const signaturdatei = new File(["signature"], "signatur.p7s", {
  type: "application/pkcs7-signature",
});

describe("einreichungDokumentActions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("handleDokumentUpload", () => {
    it("uploads the Dokument and continues on the page", async () => {
      const response = await handleDokumentUpload(
        buildFormData({ einreichungId: "e-1", typ: "ANHANG", file: pdfFile }),
        context,
      );

      expect(mocks.uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
        authSession,
        {
          verfahrenId: "v-1",
          einreichungId: "e-1",
          file: expect.any(File),
          typ: "ANHANG",
          signaturdatei: undefined,
        },
      );
      expectRedirect(response, "/verfahren/v-1");
    });

    it.each([
      ["a signature", new File(["signature"], "signatur.p7s")],
      [
        "an image named like a PDF",
        new File(["png"], "a.pdf", { type: "image/png" }),
      ],
    ])("rejects %s as the Schriftstück", async (_, file) => {
      const result = await handleDokumentUpload(
        buildFormData({ einreichungId: "e-1", typ: "SCHRIFTSTUECK", file }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { file: [expect.any(String)] },
        },
      });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("accepts any file as an Anlage", async () => {
      const image = new File(["png"], "foto.png", { type: "image/png" });

      const response = await handleDokumentUpload(
        buildFormData({ einreichungId: "e-1", typ: "ANHANG", file: image }),
        context,
      );

      expect(mocks.uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
        authSession,
        expect.objectContaining({ typ: "ANHANG", file: expect.any(File) }),
      );
      expectRedirect(response, "/verfahren/v-1");
    });

    it("rejects a Signaturdatei that isn't a detached signature", async () => {
      const result = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "ANHANG",
          file: pdfFile,
          signaturdatei: new File(["signed"], "a.pdf.p7m"),
        }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { signaturdatei: [expect.any(String)] },
        },
      });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("rejects a Signaturdatei whose MIME type isn't a signature's", async () => {
      const result = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "ANHANG",
          file: pdfFile,
          signaturdatei: new File(["%PDF-1.7"], "signatur.p7s", {
            type: "application/pdf",
          }),
        }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { signaturdatei: [expect.any(String)] },
        },
      });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("uploads the Dokument with its Signaturdatei", async () => {
      const response = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "SCHRIFTSTUECK",
          file: pdfFile,
          signaturdatei: new File(["signature"], "SIGNATUR.PKCS7"),
        }),
        context,
      );

      expect(mocks.uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
        authSession,
        expect.objectContaining({
          typ: "SCHRIFTSTUECK",
          signaturdatei: expect.objectContaining({ name: "SIGNATUR.PKCS7" }),
        }),
      );
      expectRedirect(response, "/verfahren/v-1");
    });

    it("ignores an empty Signaturdatei input", async () => {
      await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "ANHANG",
          file: pdfFile,
          signaturdatei: new File([], ""),
        }),
        context,
      );

      expect(mocks.uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
        authSession,
        expect.objectContaining({ signaturdatei: undefined }),
      );
    });

    it("rejects a Signaturdatei uploaded on its own", async () => {
      const result = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "SIGNATURDATEI",
          file: signaturdatei,
        }),
        context,
      );

      expect(result).toMatchObject({ data: { status: "invalid" } });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("explains the API's refusal of a second Schriftstück", async () => {
      mocks.uploadDokumentWithSignaturdatei.mockRejectedValue(
        new ApiError("conflict", {
          status: 409,
          problemDetails: { type: "/problems/dokument-typ-already-exists" },
        }),
      );

      const result = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "SCHRIFTSTUECK",
          file: pdfFile,
        }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "error",
          error: expect.stringContaining("bereits ein Schriftstück"),
          data: { formType: "upload", typ: "SCHRIFTSTUECK" },
        },
        init: { status: 409 },
      });
    });

    it("reports other conflicts as a failed upload", async () => {
      mocks.uploadDokumentWithSignaturdatei.mockRejectedValue(
        new ApiError("conflict", {
          status: 409,
          problemDetails: {
            type: "/problems/wrong-state-dokument-einreichung-locked",
          },
        }),
      );

      const result = await handleDokumentUpload(
        buildFormData({ einreichungId: "e-1", typ: "ANHANG", file: pdfFile }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "error",
          error: "Das Dokument konnte nicht hochgeladen werden.",
        },
        init: { status: 409 },
      });
    });

    it("reports a failed upload for the uploaded type", async () => {
      mocks.uploadDokumentWithSignaturdatei.mockRejectedValue(
        new ApiError("rejected", { status: 422 }),
      );

      const result = await handleDokumentUpload(
        buildFormData({ einreichungId: "e-1", typ: "ANHANG", file: pdfFile }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "error",
          data: { formType: "upload", typ: "ANHANG" },
        },
        init: { status: 422 },
      });
    });

    it("reports a missing file as field error", async () => {
      const result = await handleDokumentUpload(
        buildFormData({
          einreichungId: "e-1",
          typ: "ANHANG",
          file: new File([], ""),
        }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { file: [expect.any(String)] },
        },
      });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("rejects an upload without Einreichung", async () => {
      const result = await handleDokumentUpload(
        buildFormData({ typ: "ANHANG", file: pdfFile }),
        context,
      );

      expect(result).toMatchObject({ init: { status: 400 } });
      expect(mocks.uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });
  });

  describe("handleDokumentDelete", () => {
    it("deletes the Dokument and continues on the page", async () => {
      mocks.deleteDokumentFromEinreichung.mockResolvedValue({
        status: "deleted",
      });

      const response = await handleDokumentDelete(
        buildFormData({ einreichungId: "e-1", dokumentId: "d-1" }),
        { ...context, allowSchriftstueckDeletion: true },
      );

      expect(mocks.deleteDokumentFromEinreichung).toHaveBeenCalledWith({
        authSession,
        verfahrenId: "v-1",
        einreichungId: "e-1",
        dokumentId: "d-1",
        allowSchriftstueckDeletion: true,
      });
      expectRedirect(response, "/verfahren/v-1");
    });

    it.each([
      ["protected-dokument", 403],
      ["delete-failed", 500],
    ])("reports a %s result for the Dokument", async (status, httpStatus) => {
      mocks.deleteDokumentFromEinreichung.mockResolvedValue({ status });

      const result = await handleDokumentDelete(
        buildFormData({ einreichungId: "e-1", dokumentId: "d-1" }),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "error",
          error: "Löschen fehlgeschlagen.",
          data: { formType: "delete", dokumentId: "d-1" },
        },
        init: { status: httpStatus },
      });
    });

    it("rejects a deletion without Dokument", async () => {
      const result = await handleDokumentDelete(
        buildFormData({ einreichungId: "e-1" }),
        context,
      );

      expect(result).toMatchObject({ data: { status: "invalid" } });
      expect(mocks.deleteDokumentFromEinreichung).not.toHaveBeenCalled();
    });
  });

  describe("handleDokumentSichtbarkeit", () => {
    const sichtbarkeitFormData = (sichtbarkeitAlle: string) =>
      buildFormData({
        einreichungId: "e-1",
        dokumentId: "d-1",
        sichtbarkeitAlle,
      });

    it("changes the Sichtbarkeit using the current eTag", async () => {
      mocks.fetchDokument.mockResolvedValue({ eTag: "etag-1" });

      const result = await handleDokumentSichtbarkeit(
        sichtbarkeitFormData("false"),
        context,
      );

      expect(mocks.updateDokumentSichtbarkeit).toHaveBeenCalledWith(
        authSession,
        {
          verfahrenId: "v-1",
          einreichungId: "e-1",
          id: "d-1",
          sichtbarkeitAlle: false,
          eTag: "etag-1",
        },
      );
      expect(result).toMatchObject({
        status: "success",
        data: { formType: "sichtbarkeit", dokumentId: "d-1" },
      });
    });

    it("reports a failed change", async () => {
      mocks.fetchDokument.mockResolvedValue({ eTag: "etag-1" });
      mocks.updateDokumentSichtbarkeit.mockRejectedValue(
        new ApiError("already submitted", { status: 409 }),
      );

      const result = await handleDokumentSichtbarkeit(
        sichtbarkeitFormData("false"),
        context,
      );

      expect(result).toMatchObject({
        data: {
          status: "error",
          error: "Die Sichtbarkeit konnte nicht geändert werden.",
        },
        init: { status: 409 },
      });
    });

    it("rejects an invalid Sichtbarkeit", async () => {
      const result = await handleDokumentSichtbarkeit(
        sichtbarkeitFormData("maybe"),
        context,
      );

      expect(result).toMatchObject({ data: { status: "invalid" } });
      expect(mocks.updateDokumentSichtbarkeit).not.toHaveBeenCalled();
    });
  });
});
