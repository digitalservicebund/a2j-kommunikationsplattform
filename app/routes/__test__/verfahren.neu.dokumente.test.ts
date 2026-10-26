import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "~/utils/apiError";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeDokument } from "~tests/utils/factories/dokument";
import { makeGericht } from "~tests/utils/factories/gericht";
import { makeVerfahren } from "~tests/utils/factories/verfahren";

const mocks = vi.hoisted(() => ({
  fetchGerichte: vi.fn(),
  createVerfahren: vi.fn(),
  createEinreichung: vi.fn(),
  uploadDokument: vi.fn(),
  fetchDokument: vi.fn(),
  deleteDokument: vi.fn(),
  loadVerfahrenEinreichungBundle: vi.fn(),
  fetchLatestBelegForEinreichung: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server",
  () => ({ fetchGerichte: mocks.fetchGerichte }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server",
  () => ({ createVerfahren: mocks.createVerfahren }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({ createEinreichung: mocks.createEinreichung }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => ({
    uploadDokument: mocks.uploadDokument,
    fetchDokument: mocks.fetchDokument,
    deleteDokument: mocks.deleteDokument,
  }),
);
vi.mock(
  "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server",
  () => ({ default: mocks.loadVerfahrenEinreichungBundle }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/belegRepository.server",
  () => ({
    fetchLatestBelegForEinreichung: mocks.fetchLatestBelegForEinreichung,
  }),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action, loader } from "../verfahren.neu.dokumente";

const authSession = makeAuthSession();
const gericht = makeGericht();
const context = { get: () => authSession, set: () => {} };
const BASE_URL = "http://localhost:3000/verfahren/neu/dokumente";

function callLoader(search: string) {
  return loader({
    request: new Request(`${BASE_URL}${search}`),
    params: {},
    context,
  } as unknown as LoaderFunctionArgs);
}

function callAction(search: string, entries: Record<string, string | File>) {
  const formData = new FormData();
  Object.entries(entries).forEach(([key, value]) => formData.set(key, value));

  return action({
    request: new Request(`${BASE_URL}${search}`, {
      method: "POST",
      body: formData,
    }),
    params: {},
    context,
  } as unknown as ActionFunctionArgs);
}

async function catchThrown(promise: Promise<unknown>) {
  return promise.then(
    () => {
      throw new Error("expected loader to throw");
    },
    (error: unknown) => error,
  );
}

function expectRedirect(response: unknown, location: string) {
  expect(response).toBeInstanceOf(Response);
  expect((response as Response).status).toBe(302);
  expect((response as Response).headers.get("Location")).toBe(location);
}

const pdfFile = new File(["%PDF-1.7"], "anlage.pdf", {
  type: "application/pdf",
});

describe("/verfahren/neu/dokumente", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.fetchGerichte.mockResolvedValue({ elemente: [gericht] });
  });

  describe("loader", () => {
    it("redirects to the court selection without params", async () => {
      expectRedirect(
        await catchThrown(callLoader("")),
        "/verfahren/neu/gericht-auswahl",
      );
    });

    it("redirects to the court selection for an unknown court", async () => {
      expectRedirect(
        await catchThrown(callLoader("?gericht=unknown")),
        "/verfahren/neu/gericht-auswahl",
      );
    });

    it("starts without Dokumente for a known court", async () => {
      expect(await callLoader(`?gericht=${gericht.id}`)).toEqual({
        verfahrenId: undefined,
        einreichungId: undefined,
        dokumente: [],
        uploadFailed: false,
      });
    });

    it("redirects to the court selection for an unknown Verfahren", async () => {
      mocks.loadVerfahrenEinreichungBundle.mockRejectedValue(
        new ApiError("not found", { status: 404 }),
      );

      expectRedirect(
        await catchThrown(callLoader("?verfahren=unknown")),
        "/verfahren/neu/gericht-auswahl",
      );
    });

    it("redirects to the Verfahren once it has been submitted", async () => {
      mocks.loadVerfahrenEinreichungBundle.mockResolvedValue({
        verfahren: makeVerfahren({ id: "verfahren-1" }),
        einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
        dokumente: [],
      });
      mocks.fetchLatestBelegForEinreichung.mockResolvedValue({ id: "beleg" });

      expectRedirect(
        await catchThrown(callLoader("?verfahren=verfahren-1")),
        "/verfahren/verfahren-1",
      );
    });

    it("returns the uploaded Dokumente without the XJustiz", async () => {
      const klageschrift = makeDokument({ id: "klage", typ: "SCHRIFTSTUECK" });
      const signatur = makeDokument({ id: "sig", typ: "SIGNATURDATEI" });
      mocks.loadVerfahrenEinreichungBundle.mockResolvedValue({
        verfahren: makeVerfahren({ id: "verfahren-1" }),
        einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
        dokumente: [
          klageschrift,
          makeDokument({ id: "xjustiz", typ: "XJUSTIZ" }),
          signatur,
        ],
      });
      mocks.fetchLatestBelegForEinreichung.mockResolvedValue(undefined);

      expect(await callLoader("?verfahren=verfahren-1")).toEqual({
        verfahrenId: "verfahren-1",
        einreichungId: "einreichung-1",
        dokumente: [klageschrift, signatur],
        uploadFailed: false,
      });
    });

    it("flags a failed first upload", async () => {
      mocks.loadVerfahrenEinreichungBundle.mockResolvedValue({
        verfahren: makeVerfahren({ id: "verfahren-1" }),
        einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
        dokumente: [],
      });
      mocks.fetchLatestBelegForEinreichung.mockResolvedValue(undefined);

      expect(
        await callLoader("?verfahren=verfahren-1&uploadFehlgeschlagen"),
      ).toMatchObject({ uploadFailed: true });
    });
  });

  describe("action", () => {
    it.each(["SCHRIFTSTUECK", "ANHANG", "SIGNATURDATEI"])(
      "creates Verfahren, Einreichung and Dokument on the first %s upload",
      async (typ) => {
        mocks.createVerfahren.mockResolvedValue({ id: "verfahren-1" });
        mocks.createEinreichung.mockResolvedValue({ id: "einreichung-1" });

        const response = await callAction(`?gericht=${gericht.id}`, {
          formType: "upload",
          typ,
          file: pdfFile,
        });

        expect(mocks.createVerfahren).toHaveBeenCalledWith(authSession, {
          verfahrensgegenstand: "Zahlungsklage",
          kurzrubrum: null,
          gericht_id: gericht.id,
          beteiligungen: null,
        });
        expect(mocks.createEinreichung).toHaveBeenCalledWith(
          authSession,
          "verfahren-1",
          "Klageeinreichung",
        );
        expect(mocks.uploadDokument).toHaveBeenCalledWith(
          authSession,
          "verfahren-1",
          "einreichung-1",
          expect.any(File),
          typ,
        );
        expectRedirect(
          response,
          "/verfahren/neu/dokumente?verfahren=verfahren-1",
        );
      },
    );

    it("only uploads the Dokument for an existing Verfahren", async () => {
      const response = await callAction("?verfahren=verfahren-1", {
        formType: "upload",
        typ: "ANHANG",
        einreichungId: "einreichung-1",
        file: pdfFile,
      });

      expect(mocks.createVerfahren).not.toHaveBeenCalled();
      expect(mocks.createEinreichung).not.toHaveBeenCalled();
      expect(mocks.uploadDokument).toHaveBeenCalledWith(
        authSession,
        "verfahren-1",
        "einreichung-1",
        expect.any(File),
        "ANHANG",
      );
      expectRedirect(
        response,
        "/verfahren/neu/dokumente?verfahren=verfahren-1",
      );
    });

    it("continues with the created Verfahren when the first upload fails", async () => {
      mocks.createVerfahren.mockResolvedValue({ id: "verfahren-1" });
      mocks.createEinreichung.mockResolvedValue({ id: "einreichung-1" });
      mocks.uploadDokument.mockRejectedValue(
        new ApiError("rejected", { status: 422 }),
      );

      const response = await callAction(`?gericht=${gericht.id}`, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expectRedirect(
        response,
        "/verfahren/neu/dokumente?verfahren=verfahren-1&uploadFehlgeschlagen",
      );
    });

    it("reports a failed upload for an existing Verfahren in place", async () => {
      mocks.uploadDokument.mockRejectedValue(
        new ApiError("rejected", { status: 422 }),
      );

      const result = await callAction("?verfahren=verfahren-1", {
        formType: "upload",
        typ: "ANHANG",
        einreichungId: "einreichung-1",
        file: pdfFile,
      });

      expect(result).toMatchObject({
        data: { status: "error" },
        init: { status: 422 },
      });
    });

    it("creates nothing more when creating the Verfahren fails", async () => {
      mocks.createVerfahren.mockRejectedValue(
        new ApiError("failed", { status: 500 }),
      );

      const result = await callAction(`?gericht=${gericht.id}`, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expect(result).toMatchObject({ data: { status: "error" } });
      expect(mocks.createEinreichung).not.toHaveBeenCalled();
      expect(mocks.uploadDokument).not.toHaveBeenCalled();
    });

    it("reports a missing file for the uploaded type", async () => {
      const result = await callAction(`?gericht=${gericht.id}`, {
        formType: "upload",
        typ: "SIGNATURDATEI",
        file: new File([], ""),
      });

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { file: [expect.any(String)] },
          data: { formType: "upload", typ: "SIGNATURDATEI" },
        },
      });
      expect(mocks.createVerfahren).not.toHaveBeenCalled();
    });

    it("rejects the XJustiz type", async () => {
      const result = await callAction(`?gericht=${gericht.id}`, {
        formType: "upload",
        typ: "XJUSTIZ",
        file: pdfFile,
      });

      expect(result).toMatchObject({ data: { status: "invalid" } });
      expect(mocks.createVerfahren).not.toHaveBeenCalled();
    });

    it("deletes a Dokument of the Verfahren", async () => {
      mocks.fetchDokument.mockResolvedValue({ eTag: "etag-1" });
      mocks.deleteDokument.mockResolvedValue({ success: true });

      const response = await callAction("?verfahren=verfahren-1", {
        formType: "delete",
        einreichungId: "einreichung-1",
        dokumentId: "dok-1",
      });

      expect(mocks.deleteDokument).toHaveBeenCalledWith(authSession, {
        verfahrenId: "verfahren-1",
        einreichungId: "einreichung-1",
        id: "dok-1",
        eTag: "etag-1",
      });
      expectRedirect(
        response,
        "/verfahren/neu/dokumente?verfahren=verfahren-1",
      );
    });

    it("rejects a deletion without a Verfahren", async () => {
      const result = await callAction(`?gericht=${gericht.id}`, {
        formType: "delete",
        einreichungId: "einreichung-1",
        dokumentId: "dok-1",
      });

      expect(result).toMatchObject({ init: { status: 400 } });
      expect(mocks.deleteDokument).not.toHaveBeenCalled();
    });
  });
});
