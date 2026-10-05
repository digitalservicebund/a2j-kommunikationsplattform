import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  createDokument,
  deleteDokument,
  deleteDokumentFromEinreichung,
  fetchDokument,
  fetchDokumente,
  fetchDokumentValidierungsstatus,
  uploadDokument,
  uploadDokumentDatei,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
  loggerError: vi.fn(),
}));

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

vi.mock("~/utils/logger.server", () => ({
  logger: { error: mocks.loggerError },
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
  const klageschrift = {
    id: "d-1",
    typ: "SCHRIFTSTUECK",
    anzeigename: "Klageschrift.pdf",
  };
  const anlage = { id: "d-2", typ: "ANHANG", anzeigename: "Anlage.pdf" };
  const xjustiz = { id: "d-3", typ: "XJUSTIZ", anzeigename: "xjustiz.xml" };

  // The Dokumente list and the Einreichung are fetched in parallel, in this
  // order.
  function mockLookups(
    elemente: object[],
    einreichungName = "Klageeinreichung",
  ) {
    mocks.apiRequest.mockResolvedValueOnce({ elemente }).mockResolvedValueOnce({
      data: { id: "e-1", name: einreichungName },
      eTag: null,
    });
  }

  function deleteDokumentWithId(dokumentId: string) {
    return deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId,
    });
  }

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

  test("looks up the Einreichung the Dokument belongs to", async () => {
    mockLookups([klageschrift, anlage]);

    await deleteDokumentWithId("d-1");

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1",
      }),
    );
  });

  test("protects a Schriftstück of the Klageeinreichung from deletion", async () => {
    mockLookups([klageschrift, anlage]);

    const result = await deleteDokumentWithId("d-1");

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(2);
  });

  test("protects a Schriftstück of the Klageeinreichung even when it is not the first element", async () => {
    mockLookups([anlage, { ...klageschrift, id: "d-4" }]);

    const result = await deleteDokumentWithId("d-4");

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(2);
  });

  test("protects the auto-managed XJustiz-Dokument from deletion", async () => {
    mockLookups([klageschrift, xjustiz]);

    const result = await deleteDokumentWithId("d-3");

    expect(result).toEqual({ status: "protected-dokument" });
    expect(mocks.apiRequest).toHaveBeenCalledTimes(2);
  });

  test("allows deleting a Schriftstück of a Weitere Einreichung", async () => {
    mockLookups([klageschrift], "Schriftsatz");
    mocks.apiRequest
      .mockResolvedValueOnce({ data: { id: "d-1" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentWithId("d-1");

    expect(result).toEqual({ status: "deleted" });
  });

  test("returns delete-failed when downstream delete call is unsuccessful", async () => {
    mockLookups([klageschrift, anlage]);
    mocks.apiRequest
      .mockResolvedValueOnce({ data: { id: "d-2" }, eTag: undefined })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokumentWithId("d-2");

    expect(result).toEqual({ status: "delete-failed" });
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-2",
        includeResponseETag: true,
      }),
    );
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-2",
        method: "DELETE",
        eTag: "",
      }),
    );
  });

  test("returns deleted when a deletable dokument deletion succeeds", async () => {
    mockLookups([klageschrift, anlage]);
    mocks.apiRequest
      .mockResolvedValueOnce({ data: { id: "d-2" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentWithId("d-2");

    expect(result).toEqual({ status: "deleted" });
  });
});

describe("createDokument", () => {
  it("posts the Dokument metadata as JSON and returns it with its eTag", async () => {
    const dokument = {
      id: "d-1",
      status: "ANGELEGT",
      anzeigename: "test.txt",
      typ: "ANHANG",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      sichtbarkeitAlle: true,
    };
    mocks.apiRequest.mockResolvedValueOnce({
      data: dokument,
      eTag: 'W/"0"',
    });

    const result = await createDokument(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      typ: "ANHANG",
      anzeigename: "test.txt",
      sichtbarkeitAlle: true,
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
        method: "POST",
        body: {
          typ: "ANHANG",
          anzeigename: "test.txt",
          sichtbarkeit_alle: true,
        },
        includeResponseETag: true,
        errorMessage:
          "Dokument for Einreichung with id e-1 of Verfahren with id v-1 could not be created.",
      }),
    );
    expect(result).toEqual({ dokument, eTag: 'W/"0"' });
  });
});

describe("uploadDokumentDatei", () => {
  it("puts the file as FormData with the If-Match eTag and returns the full Dokument", async () => {
    const dokument = {
      id: "d-1",
      status: "ERSTELLT",
      validierungslaufStatus: "AUSSTEHEND",
      dateiname: "test.txt",
      anzeigename: "test.txt",
      sizeInBytes: 3,
      contentType: "text/plain",
      hash: "abc123",
      hashAlgorithmus: "SHA3-384",
      typ: "ANHANG",
      gesendetAm: null,
      eingereichtAm: null,
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      sichtbarkeitAlle: true,
    };
    mocks.apiRequest.mockResolvedValueOnce(dokument);
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    const result = await uploadDokumentDatei(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
      file,
      eTag: 'W/"0"',
    });

    const callArgs = mocks.apiRequest.mock.calls[0][0];
    expect(callArgs.path).toBe(
      "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei",
    );
    expect(callArgs.method).toBe("PUT");
    expect(callArgs.eTag).toBe('W/"0"');
    expect(callArgs.body).toBeInstanceOf(FormData);
    const body = callArgs.body as FormData;
    expect(body.get("datei")).toBe(file);
    expect([...body.keys()]).toEqual(["datei"]);
    expect(result.dateiname).toBe("test.txt");
    expect(result.status).toBe("ERSTELLT");
  });
});

describe("uploadDokument", () => {
  it("composes createDokument + uploadDokumentDatei", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      data: {
        id: "d-1",
        status: "ANGELEGT",
        anzeigename: "test.txt",
        typ: "ANHANG",
        erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
        erstelltAm: "2026-03-08T05:00:29.659Z",
        sichtbarkeitAlle: true,
      },
      eTag: 'W/"0"',
    });
    mocks.apiRequest.mockResolvedValueOnce({
      id: "d-1",
      status: "ERSTELLT",
      validierungslaufStatus: "AUSSTEHEND",
      dateiname: "test.txt",
      anzeigename: "test.txt",
      sizeInBytes: 3,
      contentType: "text/plain",
      hash: "abc123",
      hashAlgorithmus: "SHA3-384",
      typ: "ANHANG",
      gesendetAm: null,
      eingereichtAm: null,
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      sichtbarkeitAlle: true,
    });
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    const result = await uploadDokument(
      mockAuthData,
      "v-1",
      "e-1",
      file,
      "ANHANG",
    );

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
        method: "POST",
        body: {
          typ: "ANHANG",
          anzeigename: "test.txt",
          sichtbarkeit_alle: true,
        },
      }),
    );
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei",
        method: "PUT",
        eTag: 'W/"0"',
      }),
    );
    expect(result.status).toBe("ERSTELLT");
    expect(result.dateiname).toBe("test.txt");
  });

  it("creates the Dokument with the given Sichtbarkeit", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      data: { id: "d-1" },
      eTag: 'W/"0"',
    });
    mocks.apiRequest.mockResolvedValueOnce({});
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await uploadDokument(
      mockAuthData,
      "v-1",
      "e-1",
      file,
      "SCHRIFTSTUECK",
      false,
    );

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        body: {
          typ: "SCHRIFTSTUECK",
          anzeigename: "test.txt",
          sichtbarkeit_alle: false,
        },
      }),
    );
  });

  it("deletes the orphaned metadata-only Dokument and rethrows when the file upload fails", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      data: {
        id: "d-1",
        status: "ANGELEGT",
        anzeigename: "test.txt",
        typ: "ANHANG",
        erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
        erstelltAm: "2026-03-08T05:00:29.659Z",
        sichtbarkeitAlle: true,
      },
      eTag: 'W/"0"',
    });
    const uploadError = new Error("Datei upload failed");
    mocks.apiRequest.mockRejectedValueOnce(uploadError);
    mocks.apiRequest.mockResolvedValueOnce({ ok: true });
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(mockAuthData, "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);

    expect(mocks.loggerError).not.toHaveBeenCalled();
    expect(mocks.apiRequest).toHaveBeenCalledTimes(3);
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
        method: "DELETE",
        eTag: 'W/"0"',
        throwOnError: false,
      }),
    );
  });

  it("still rethrows the original upload error even if the cleanup delete also fails", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      data: {
        id: "d-1",
        status: "ANGELEGT",
        anzeigename: "test.txt",
        typ: "ANHANG",
        erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
        erstelltAm: "2026-03-08T05:00:29.659Z",
        sichtbarkeitAlle: true,
      },
      eTag: 'W/"0"',
    });
    const uploadError = new Error("Datei upload failed");
    mocks.apiRequest.mockRejectedValueOnce(uploadError);
    mocks.apiRequest.mockRejectedValueOnce(new Error("Delete also failed"));
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(mockAuthData, "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);
    expect(mocks.loggerError).toHaveBeenCalledWith(
      { verfahrenId: "v-1", einreichungId: "e-1", dokumentId: "d-1" },
      "Failed to delete orphaned Dokument after Datei upload failed",
    );
  });

  it("logs and rethrows the original upload error when the cleanup delete responds unsuccessfully", async () => {
    mocks.apiRequest.mockResolvedValueOnce({
      data: {
        id: "d-1",
        status: "ANGELEGT",
        anzeigename: "test.txt",
        typ: "ANHANG",
        erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
        erstelltAm: "2026-03-08T05:00:29.659Z",
        sichtbarkeitAlle: true,
      },
      eTag: 'W/"0"',
    });
    const uploadError = new Error("Datei upload failed");
    mocks.apiRequest.mockRejectedValueOnce(uploadError);
    mocks.apiRequest.mockResolvedValueOnce({ ok: false, status: 412 });
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(mockAuthData, "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);
    expect(mocks.loggerError).toHaveBeenCalledWith(
      { verfahrenId: "v-1", einreichungId: "e-1", dokumentId: "d-1" },
      "Failed to delete orphaned Dokument after Datei upload failed",
    );
  });
});
