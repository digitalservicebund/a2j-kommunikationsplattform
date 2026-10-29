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
  fetchDokumentValidierungsstatus: vi.fn(),
  loadVerfahrenEinreichungBundle: vi.fn(),
  fetchLatestBelegForEinreichung: vi.fn(),
  handleDokumentUpload: vi.fn(),
  handleDokumentDelete: vi.fn(),
  handleDokumentSichtbarkeit: vi.fn(),
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
    fetchDokumentValidierungsstatus: mocks.fetchDokumentValidierungsstatus,
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
// The Dokumente of an existing Einreichung are handled by the shared actions
// (tested on their own); only the delegation is tested here
vi.mock(
  "~/domains/verfahren/application/einreichungDokumentActions.server",
  async (importOriginal) => ({
    ...(await importOriginal<object>()),
    handleDokumentUpload: mocks.handleDokumentUpload,
    handleDokumentDelete: mocks.handleDokumentDelete,
    handleDokumentSichtbarkeit: mocks.handleDokumentSichtbarkeit,
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
const VERFAHREN_ID = "11111111-1111-1111-1111-111111111111";
const DOKUMENTE_PATH = `/verfahren/neu/dokumente?verfahren=${VERFAHREN_ID}`;

const validierungsstatus = {
  validierungslaufStatus: "ABGESCHLOSSEN",
  ergebnis: "GRUEN",
  fehler: [],
};

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

function mockDraft(dokumente: ReturnType<typeof makeDokument>[] = []) {
  mocks.loadVerfahrenEinreichungBundle.mockResolvedValue({
    verfahren: makeVerfahren({ id: VERFAHREN_ID }),
    einreichung: {
      id: "einreichung-1",
      name: "Klageeinreichung",
      status: "ERSTELLT",
    },
    dokumente,
  });
  mocks.fetchLatestBelegForEinreichung.mockResolvedValue(undefined);
}

const pdfFile = new File(["%PDF-1.7"], "anlage.pdf", {
  type: "application/pdf",
});

describe("/verfahren/neu/dokumente", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.fetchGerichte.mockResolvedValue({ elemente: [gericht] });
    mocks.fetchDokumentValidierungsstatus.mockResolvedValue(validierungsstatus);
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
        einreichung: undefined,
        dokumente: [],
        uploadFailed: false,
      });
    });

    it.each(["", "../codelisten/gerichte", "abc/einreichungen"])(
      "redirects to the court selection for the malformed Verfahren id %j",
      async (verfahrenId) => {
        expectRedirect(
          await catchThrown(
            callLoader(`?${new URLSearchParams({ verfahren: verfahrenId })}`),
          ),
          "/verfahren/neu/gericht-auswahl",
        );
        expect(mocks.loadVerfahrenEinreichungBundle).not.toHaveBeenCalled();
      },
    );

    it("redirects to the court selection for an unknown Verfahren", async () => {
      mocks.loadVerfahrenEinreichungBundle.mockRejectedValue(
        new ApiError("not found", { status: 404 }),
      );

      expectRedirect(
        await catchThrown(
          callLoader("?verfahren=99999999-9999-9999-9999-999999999999"),
        ),
        "/verfahren/neu/gericht-auswahl",
      );
    });

    it("redirects to the Verfahren once it has been submitted", async () => {
      mockDraft();
      mocks.fetchLatestBelegForEinreichung.mockResolvedValue({ id: "beleg" });

      expectRedirect(
        await catchThrown(callLoader(`?verfahren=${VERFAHREN_ID}`)),
        `/verfahren/${VERFAHREN_ID}`,
      );
    });

    it("returns the uploaded Dokumente with their Validierungsstatus, without the XJustiz", async () => {
      const klageschrift = makeDokument({ id: "klage", typ: "SCHRIFTSTUECK" });
      const signatur = makeDokument({ id: "sig", typ: "SIGNATURDATEI" });
      mockDraft([
        klageschrift,
        makeDokument({ id: "xjustiz", typ: "XJUSTIZ" }),
        signatur,
      ]);

      expect(await callLoader(`?verfahren=${VERFAHREN_ID}`)).toEqual({
        verfahrenId: VERFAHREN_ID,
        einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
        dokumente: [
          { ...klageschrift, validierungsstatus },
          { ...signatur, validierungsstatus },
        ],
        uploadFailed: false,
      });
      // Not fetched for the XJustiz-Dokument, which isn't shown
      expect(mocks.fetchDokumentValidierungsstatus).toHaveBeenCalledTimes(2);
    });

    it("flags a failed first upload", async () => {
      mockDraft();

      expect(
        await callLoader(`?verfahren=${VERFAHREN_ID}&uploadFehlgeschlagen`),
      ).toMatchObject({ uploadFailed: true });
    });
  });

  describe("action: first upload", () => {
    it.each(["SCHRIFTSTUECK", "ANHANG", "SIGNATURDATEI"])(
      "creates Verfahren, Einreichung and Dokument on the first %s upload",
      async (typ) => {
        mocks.createVerfahren.mockResolvedValue({ id: VERFAHREN_ID });
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
          VERFAHREN_ID,
          "Klageeinreichung",
        );
        expect(mocks.uploadDokument).toHaveBeenCalledWith(
          authSession,
          VERFAHREN_ID,
          "einreichung-1",
          expect.any(File),
          typ,
        );
        expectRedirect(response, DOKUMENTE_PATH);
      },
    );

    it("continues with the created Verfahren when the first upload fails", async () => {
      mocks.createVerfahren.mockResolvedValue({ id: VERFAHREN_ID });
      mocks.createEinreichung.mockResolvedValue({ id: "einreichung-1" });
      mocks.uploadDokument.mockRejectedValue(
        new ApiError("rejected", { status: 422 }),
      );

      const response = await callAction(`?gericht=${gericht.id}`, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expectRedirect(response, `${DOKUMENTE_PATH}&uploadFehlgeschlagen`);
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
  });

  describe("action: existing Verfahren", () => {
    const expectedContext = {
      authSession,
      verfahrenId: VERFAHREN_ID,
      redirectTo: DOKUMENTE_PATH,
      // This step is where the Klageschrift is replaced
      allowSchriftstueckDeletion: true,
    };

    it.each([
      ["upload", mocks.handleDokumentUpload],
      ["delete", mocks.handleDokumentDelete],
      ["sichtbarkeit", mocks.handleDokumentSichtbarkeit],
    ])("hands %s to the shared Dokument action", async (formType, handler) => {
      handler.mockResolvedValue("handled");

      const result = await callAction(`?verfahren=${VERFAHREN_ID}`, {
        formType,
      });

      expect(result).toBe("handled");
      expect(handler).toHaveBeenCalledWith(
        expect.any(FormData),
        expectedContext,
      );
      expect(mocks.createVerfahren).not.toHaveBeenCalled();
    });

    it("rejects a malformed Verfahren id before calling the API", async () => {
      const response = await catchThrown(
        callAction("?verfahren=..%2Fcodelisten", {
          formType: "upload",
          typ: "ANHANG",
          einreichungId: "einreichung-1",
          file: pdfFile,
        }),
      );

      expectRedirect(response, "/verfahren/neu/gericht-auswahl");
      expect(mocks.handleDokumentUpload).not.toHaveBeenCalled();
    });

    it.each(["delete", "sichtbarkeit"])(
      "rejects %s without a Verfahren",
      async (formType) => {
        const result = await callAction(`?gericht=${gericht.id}`, {
          formType,
        });

        expect(result).toMatchObject({ init: { status: 400 } });
        expect(mocks.handleDokumentDelete).not.toHaveBeenCalled();
        expect(mocks.handleDokumentSichtbarkeit).not.toHaveBeenCalled();
      },
    );
  });
});
