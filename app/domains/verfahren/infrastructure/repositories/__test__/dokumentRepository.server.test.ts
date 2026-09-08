import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  deleteDokument,
  deleteDokumentFromEinreichung,
  fetchDokument,
  fetchDokumente,
  fetchDokumentValidierungsstatus,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("fetchDokument", () => {
  it("delegates path, schema and returns document with eTag", async () => {
    const dokument = {
      id: "d-1",
      anzeigename: "Klageschrift.pdf",
      sizeInBytes: 1234,
    };

    mocks.apiRequest.mockResolvedValueOnce({
      data: dokument,
      eTag: 'W/"1"',
    });

    const result = await fetchDokument(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
        includeResponseETag: true,
      }),
    );
    expect(result).toEqual({ dokument, eTag: 'W/"1"' });
  });
});

describe("fetchDokumente", () => {
  it("delegates path and message", async () => {
    const dokumente = { elemente: [] };
    mocks.apiRequest.mockResolvedValueOnce(dokumente);

    const result = await fetchDokumente(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
        errorMessage:
          "Dokumente for Einreichung with id e-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(dokumente);
  });
});

describe("fetchDokumentValidierungsstatus", () => {
  it("delegates path and message", async () => {
    const status = {
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    };
    mocks.apiRequest.mockResolvedValueOnce(status);

    const result = await fetchDokumentValidierungsstatus(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1/validierungsstatus",
        errorMessage:
          "Validierungsstatus for Dokument with id d-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(status);
  });
});

describe("deleteDokument", () => {
  it("calls DELETE endpoint and returns success result", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: true });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: true });

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
      method: "DELETE",
      eTag: 'W/"0"',
      throwOnError: false,
      errorMessage: "Dokument with id d-1 could not be deleted.",
    });
  });

  it("returns error on 412", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: false, status: 412 });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: false });
  });

  it("returns error for other non-success responses", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: false });
  });
});

describe("deleteDokumentFromEinreichung", () => {
  test("returns invalid-form-data when form data is missing", async () => {
    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: null,
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "invalid-form-data" });
    expect(mocks.apiRequest).not.toHaveBeenCalled();
  });

  test("protects a Schriftstück dokument from deletion", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      elemente: [
        { id: "d-1", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
        { id: "d-2", typ: "ANHANG", anzeigename: "Anlage.pdf" },
      ],
    });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-1",
    });

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(1);
  });

  test("protects a Schriftstück dokument even when it is not the first element", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      elemente: [
        { id: "d-1", typ: "ANHANG", anzeigename: "Anlage.pdf" },
        { id: "d-2", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
      ],
    });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(1);
  });

  test("protects the auto-managed XJustiz-Dokument from deletion", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      elemente: [
        { id: "d-1", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
        { id: "d-2", typ: "XJUSTIZ", anzeigename: "xjustiz.xml" },
      ],
    });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(1);
  });

  test("allows deleting the first element when it is not a Schriftstück", async () => {
    mocks.apiRequest
      .mockResolvedValueOnce({
        elemente: [
          { id: "d-1", typ: "ANHANG", anzeigename: "Anlage.pdf" },
          { id: "d-2", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
        ],
      })
      .mockResolvedValueOnce({ data: { id: "d-1" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-1",
    });

    expect(result).toEqual({ status: "deleted" });
  });

  test("returns delete-failed when downstream delete call is unsuccessful", async () => {
    mocks.apiRequest
      .mockResolvedValueOnce({
        elemente: [
          { id: "d-1", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
          { id: "d-2", typ: "ANHANG", anzeigename: "Anlage.pdf" },
        ],
      })
      .mockResolvedValueOnce({ data: { id: "d-2" }, eTag: undefined })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "delete-failed" });
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-2",
        includeResponseETag: true,
      }),
    );
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-2",
        method: "DELETE",
        eTag: "",
      }),
    );
  });

  test("returns deleted when a deletable dokument deletion succeeds", async () => {
    mocks.apiRequest
      .mockResolvedValueOnce({
        elemente: [
          { id: "d-1", typ: "SCHRIFTSTUECK", anzeigename: "Klageschrift.pdf" },
          { id: "d-2", typ: "ANHANG", anzeigename: "Anlage.pdf" },
        ],
      })
      .mockResolvedValueOnce({ data: { id: "d-2" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "deleted" });
  });
});

describe("uploadDokument", () => {
  it("posts FormData and parses array response first element", async () => {
    const rawDokument = {
      id: "d-1",
      status: "ERSTELLT",
      dateiname: "test.txt",
      anzeigename: "test.txt",
      size_in_bytes: 123,
      content_type: "text/plain",
      hash: "abc123",
      hash_algorithmus: "SHA3-384",
      typ: "ANHANG",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2026-03-08T05:00:29.659Z",
      sichtbarkeit_alle: true,
    };
    mocks.apiRequest.mockResolvedValueOnce([rawDokument]);
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    const result = await uploadDokument(
      mockAuthData,
      "v-1",
      "e-1",
      file,
      "ANHANG",
    );

    const firstCallArgs = mocks.apiRequest.mock.calls[0][0];
    expect(firstCallArgs.path).toBe(
      "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
    );
    expect(firstCallArgs.method).toBe("POST");
    expect(firstCallArgs.errorMessage).toBe(
      "Dokument upload for Einreichung with id e-1 of Verfahren with v-1 could not be uploaded.",
    );
    expect(firstCallArgs.body).toBeInstanceOf(FormData);
    const body = firstCallArgs.body as FormData;
    expect(body.get("datei")).toBe(file);
    expect([...body.keys()]).toEqual(["datei"]);
    expect(firstCallArgs.headers).toEqual({
      "Dokument-Typ": "ANHANG",
      "Dokument-Sichtbarkeit-Alle": "true",
      "Dokument-Anzeigename": "test.txt",
    });
    expect(result).toEqual({
      id: "d-1",
      status: "ERSTELLT",
      dateiname: "test.txt",
      anzeigename: "test.txt",
      sizeInBytes: 123,
      contentType: "text/plain",
      hash: "abc123",
      hashAlgorithmus: "SHA3-384",
      typ: "ANHANG",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      sichtbarkeitAlle: true,
    });
  });
});
