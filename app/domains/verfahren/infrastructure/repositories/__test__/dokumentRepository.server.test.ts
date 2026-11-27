import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  createDokument,
  deleteDokument,
  deleteDokumentFromEinreichung,
  fetchDokument,
  fetchDokumentDatei,
  fetchDokumentDownloadLink,
  fetchDokumente,
  fetchDokumentValidierungsstatus,
  updateDokumentSichtbarkeit,
  uploadDokument,
  uploadDokumentDatei,
  uploadDokumentWithSignaturdatei,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { DokumentSchema } from "~/domains/verfahren/infrastructure/schemas/dokument.schema";
import { logger } from "~/utils/logger.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";

vi.mock(import("~/domains/verfahren/infrastructure/api/apiClient"));

vi.spyOn(logger, "error");

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

    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: dokument,
      eTag: 'W/"1"',
    });

    const result = await fetchDokument(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
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
    vi.mocked(apiRequest).mockResolvedValueOnce(dokumente);

    const result = await fetchDokumente(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
        errorMessage:
          "Dokumente for Einreichung with id e-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(dokumente);
  });
});

describe(fetchDokumentDownloadLink, () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("fetches the download link with the given disposition_type", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce(
      "https://s3.example.com/dokument",
    );

    const result = await fetchDokumentDownloadLink(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
      dispositionType: "INLINE",
    });

    expect(result).toBe("https://s3.example.com/dokument");
    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1/downloadlink",
        searchParams: { disposition_type: "INLINE" },
      }),
    );
  });

  it("only accepts http(s) URLs as download link", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce(
      "https://s3.example.com/dokument",
    );

    await fetchDokumentDownloadLink(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    const { schema } = vi.mocked(apiRequest).mock.calls[0][0];
    expect(schema?.safeParse("https://s3.example.com/dokument").success).toBe(
      true,
    );
    expect(schema?.safeParse("javascript:alert(1)").success).toBe(false);
  });
});

describe("fetchDokumentDatei", () => {
  const options = {
    verfahrenId: "v-1",
    einreichungId: "e-1",
    id: "d-1",
    dispositionType: "INLINE" as const,
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches the file from a fresh download link without reading its body", async () => {
    const storageResponse = new Response("%PDF-1.7");
    const fetchMock = vi.fn().mockResolvedValue(storageResponse);
    vi.stubGlobal("fetch", fetchMock);
    vi.mocked(apiRequest).mockResolvedValueOnce(
      "https://s3.example.com/dokument",
    );
    const signal = new AbortController().signal;

    const result = await fetchDokumentDatei(makeAuthSession(), {
      ...options,
      signal,
    });

    expect(fetchMock).toHaveBeenCalledWith("https://s3.example.com/dokument", {
      signal,
    });
    expect(result).toBe(storageResponse);
    expect(result.bodyUsed).toBe(false);
  });

  it("throws and logs without the signed link when the storage fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 403 })),
    );
    vi.mocked(apiRequest).mockResolvedValueOnce(
      "https://s3.example.com/dokument?X-Amz-Signature=secret",
    );

    await expect(
      fetchDokumentDatei(makeAuthSession(), options),
    ).rejects.toThrow("Datei for Dokument with id d-1 could not be fetched.");
    expect(JSON.stringify(vi.mocked(logger.error).mock.calls)).not.toContain(
      "X-Amz-Signature",
    );
  });

  it("throws an ApiError with the storage's status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );
    vi.mocked(apiRequest).mockResolvedValueOnce(
      "https://s3.example.com/dokument",
    );

    await expect(
      fetchDokumentDatei(makeAuthSession(), options),
    ).rejects.toMatchObject({ name: "ApiError", status: 404 });
  });
});

describe("fetchDokumentValidierungsstatus", () => {
  it("delegates path and message", async () => {
    const status = {
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    };
    vi.mocked(apiRequest).mockResolvedValueOnce(status);

    const result = await fetchDokumentValidierungsstatus(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1/validierungsstatus",
        errorMessage:
          "Validierungsstatus for Dokument with id d-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(status);
  });
});

describe("updateDokumentSichtbarkeit", () => {
  it("calls the PATCH endpoint with the Sichtbarkeit and eTag", async () => {
    const dokument = { id: "d-1", sichtbarkeitAlle: false };
    vi.mocked(apiRequest).mockResolvedValueOnce(dokument);

    const result = await updateDokumentSichtbarkeit(makeAuthSession(), {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      sichtbarkeitAlle: false,
      eTag: 'W/"0"',
    });

    expect(result).toBe(dokument);
    expect(apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
      method: "PATCH",
      body: { sichtbarkeit_alle: false },
      eTag: 'W/"0"',
      schema: DokumentSchema,
      errorMessage:
        "Sichtbarkeit of Dokument with id d-1 could not be updated.",
    });
  });
});

describe("deleteDokument", () => {
  it("calls DELETE endpoint and returns success result", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: true });

    const result = await deleteDokument(makeAuthSession(), {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: true });

    expect(apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
      method: "DELETE",
      eTag: 'W/"0"',
      throwOnError: false,
      errorMessage: "Dokument with id d-1 could not be deleted.",
    });
  });

  it("returns error on 412", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: false, status: 412 });

    const result = await deleteDokument(makeAuthSession(), {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: false });
  });

  it("returns error for other non-success responses", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokument(makeAuthSession(), {
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
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({ elemente })
      .mockResolvedValueOnce({
        data: { id: "e-1", name: einreichungName },
        eTag: null,
      });
  }

  function deleteDokumentWithId(dokumentId: string) {
    return deleteDokumentFromEinreichung({
      authSession: makeAuthSession(),
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId,
    });
  }

  test("returns invalid-form-data when form data is missing", async () => {
    const result = await deleteDokumentFromEinreichung({
      authSession: makeAuthSession(),
      verfahrenId: "v-1",
      einreichungId: null,
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "invalid-form-data" });
    expect(apiRequest).not.toHaveBeenCalled();
  });

  test("looks up the Einreichung the Dokument belongs to", async () => {
    mockLookups([klageschrift, anlage]);

    await deleteDokumentWithId("d-1");

    expect(apiRequest).toHaveBeenNthCalledWith(
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
    expect(apiRequest).toHaveBeenCalledTimes(2);
  });

  test("protects a Schriftstück of the Klageeinreichung even when it is not the first element", async () => {
    mockLookups([anlage, { ...klageschrift, id: "d-4" }]);

    const result = await deleteDokumentWithId("d-4");

    expect(result).toEqual({ status: "protected-dokument" });
    expect(apiRequest).toHaveBeenCalledTimes(2);
  });

  test("protects the auto-managed XJustiz-Dokument from deletion", async () => {
    mockLookups([klageschrift, xjustiz]);

    const result = await deleteDokumentWithId("d-3");

    expect(result).toEqual({ status: "protected-dokument" });
    expect(apiRequest).toHaveBeenCalledTimes(2);
  });

  test("allows deleting a Schriftstück of the Klageeinreichung where it's replaceable", async () => {
    mockLookups([klageschrift, anlage]);
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({ data: { id: "d-1" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentFromEinreichung({
      authSession: makeAuthSession(),
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-1",
      allowSchriftstueckDeletion: true,
    });

    expect(result).toEqual({ status: "deleted" });
  });

  test("allows deleting a Schriftstück of a Weitere Einreichung", async () => {
    mockLookups([klageschrift], "Schriftsatz");
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({ data: { id: "d-1" }, eTag: 'W/"1"' })
      .mockResolvedValueOnce({ ok: true });

    const result = await deleteDokumentWithId("d-1");

    expect(result).toEqual({ status: "deleted" });
  });

  test("returns delete-failed when downstream delete call is unsuccessful", async () => {
    mockLookups([klageschrift, anlage]);
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({ data: { id: "d-2" }, eTag: undefined })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokumentWithId("d-2");

    expect(result).toEqual({ status: "delete-failed" });
    expect(apiRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-2",
        includeResponseETag: true,
      }),
    );
    expect(apiRequest).toHaveBeenNthCalledWith(
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
    vi.mocked(apiRequest)
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: dokument,
      eTag: 'W/"0"',
    });

    const result = await createDokument(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      typ: "ANHANG",
      anzeigename: "test.txt",
      sichtbarkeitAlle: true,
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
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
    vi.mocked(apiRequest).mockResolvedValueOnce(dokument);
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    const result = await uploadDokumentDatei(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
      file,
      eTag: 'W/"0"',
    });

    const callArgs = vi.mocked(apiRequest).mock.calls[0][0];
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
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
      makeAuthSession(),
      "v-1",
      "e-1",
      file,
      "ANHANG",
    );

    expect(apiRequest).toHaveBeenNthCalledWith(
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
    expect(apiRequest).toHaveBeenNthCalledWith(
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: { id: "d-1" },
      eTag: 'W/"0"',
    });
    vi.mocked(apiRequest).mockResolvedValueOnce({});
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await uploadDokument(
      makeAuthSession(),
      "v-1",
      "e-1",
      file,
      "SCHRIFTSTUECK",
      false,
    );

    expect(apiRequest).toHaveBeenNthCalledWith(
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
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
    vi.mocked(apiRequest).mockRejectedValueOnce(uploadError);
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: true });
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(makeAuthSession(), "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);

    expect(logger.error).not.toHaveBeenCalled();
    expect(apiRequest).toHaveBeenCalledTimes(3);
    expect(apiRequest).toHaveBeenNthCalledWith(
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
    vi.mocked(apiRequest).mockResolvedValueOnce({
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
    vi.mocked(apiRequest).mockRejectedValueOnce(uploadError);
    vi.mocked(apiRequest).mockRejectedValueOnce(
      new Error("Delete also failed"),
    );
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(makeAuthSession(), "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);
    expect(logger.error).toHaveBeenCalledWith(
      { verfahrenId: "v-1", einreichungId: "e-1", dokumentId: "d-1" },
      "Failed to delete orphaned Dokument after Datei upload failed",
    );
  });

  it("logs and rethrows the original upload error when the cleanup delete responds unsuccessfully", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
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
    vi.mocked(apiRequest).mockRejectedValueOnce(uploadError);
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: false, status: 412 });
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    await expect(
      uploadDokument(makeAuthSession(), "v-1", "e-1", file, "ANHANG"),
    ).rejects.toBe(uploadError);
    expect(logger.error).toHaveBeenCalledWith(
      { verfahrenId: "v-1", einreichungId: "e-1", dokumentId: "d-1" },
      "Failed to delete orphaned Dokument after Datei upload failed",
    );
  });
});

describe("uploadDokumentWithSignaturdatei", () => {
  const options = {
    verfahrenId: "v-1",
    einreichungId: "e-1",
    file: new File(["%PDF"], "Klageschrift.pdf", { type: "application/pdf" }),
    typ: "SCHRIFTSTUECK",
  } as const;
  const signaturdatei = new File(["signature"], "signatur.P7S", {
    type: "application/pkcs7-signature",
  });

  function mockUploadedDokument() {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: { id: "d-1" },
      eTag: 'W/"0"',
    });
    vi.mocked(apiRequest).mockResolvedValueOnce({ id: "d-1" });
  }

  it("uploads only the Dokument without a Signaturdatei", async () => {
    mockUploadedDokument();

    await uploadDokumentWithSignaturdatei(makeAuthSession(), options);

    expect(apiRequest).toHaveBeenCalledTimes(2);
  });

  it("uploads the Signaturdatei named after the Dokument", async () => {
    mockUploadedDokument();
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: { id: "s-1" },
      eTag: 'W/"0"',
    });
    vi.mocked(apiRequest).mockResolvedValueOnce({ id: "s-1" });

    await uploadDokumentWithSignaturdatei(makeAuthSession(), {
      ...options,
      signaturdatei,
    });

    expect(apiRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        method: "POST",
        body: {
          typ: "SIGNATURDATEI",
          anzeigename: "Klageschrift.pdf.p7s",
          sichtbarkeit_alle: true,
        },
      }),
    );
    const { body } = vi.mocked(apiRequest).mock.calls[3][0];
    expect((body as FormData).get("datei")).toMatchObject({
      name: "Klageschrift.pdf.p7s",
      type: "application/pkcs7-signature",
    });
  });

  it("deletes the Dokument again and rethrows when the Signaturdatei fails", async () => {
    mockUploadedDokument();
    const signaturdateiError = new Error("Signaturdatei upload failed");
    vi.mocked(apiRequest).mockRejectedValueOnce(signaturdateiError);
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: { id: "d-1" },
      eTag: 'W/"1"',
    });
    vi.mocked(apiRequest).mockResolvedValueOnce({ ok: true });

    await expect(
      uploadDokumentWithSignaturdatei(makeAuthSession(), {
        ...options,
        signaturdatei,
      }),
    ).rejects.toBe(signaturdateiError);

    expect(apiRequest).toHaveBeenLastCalledWith(
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
        method: "DELETE",
        eTag: 'W/"1"',
      }),
    );
    expect(logger.error).not.toHaveBeenCalled();
  });

  it("logs and rethrows the Signaturdatei error when deleting the Dokument fails", async () => {
    mockUploadedDokument();
    const signaturdateiError = new Error("Signaturdatei upload failed");
    vi.mocked(apiRequest).mockRejectedValueOnce(signaturdateiError);
    vi.mocked(apiRequest).mockRejectedValueOnce(new Error("Fetch failed"));

    await expect(
      uploadDokumentWithSignaturdatei(makeAuthSession(), {
        ...options,
        signaturdatei,
      }),
    ).rejects.toBe(signaturdateiError);

    expect(logger.error).toHaveBeenCalledWith(
      { verfahrenId: "v-1", einreichungId: "e-1", dokumentId: "d-1" },
      "Failed to delete Dokument after its Signaturdatei upload failed",
    );
  });
});
