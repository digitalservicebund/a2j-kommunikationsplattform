import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  createEinreichung,
  deleteEinreichung,
  fetchEinreichungById,
  fetchEinreichungenById,
  fetchEinreichungValidierungsstatus,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";

vi.mock(import("~/domains/verfahren/infrastructure/api/apiClient"));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("fetchEinreichungById", () => {
  it("delegates path and schema, and returns the camelCase Einreichung with its eTag", async () => {
    const einreichung = {
      id: "e-1",
      status: "ERSTELLT",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      beantragtAm: null,
      gesendetAm: null,
      eingereichtAm: null,
      validierungsStatus: "AUSSTEHEND",
      name: "Klageschrift",
    };

    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: einreichung,
      eTag: 'W/"1"',
    });

    const result = await fetchEinreichungById(makeAuthSession(), {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen/e-1",
        includeResponseETag: true,
        errorMessage:
          "Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual({ einreichung, eTag: 'W/"1"' });
  });
});

describe("fetchEinreichungenById", () => {
  it("delegates path and message", async () => {
    const einreichungen = { elemente: [] };
    vi.mocked(apiRequest).mockResolvedValueOnce(einreichungen);

    const result = await fetchEinreichungenById(makeAuthSession(), {
      id: "v-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen",
        errorMessage:
          "Einreichungen of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(einreichungen);
  });
});

describe("fetchEinreichungStatus", () => {
  it("delegates path and message", async () => {
    const status = {
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    };
    vi.mocked(apiRequest).mockResolvedValueOnce(status);

    const result = await fetchEinreichungValidierungsstatus(makeAuthSession(), {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/validierungsstatus",
        errorMessage:
          "Validierungsstatus for Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(status);
  });
});

describe("createEinreichung", () => {
  it("delegates to apiRequest with expected payload and schema", async () => {
    const mockEinreichung = {
      id: "e-1",
      name: "Klageeinreichung",
      status: "ERSTELLT",
      erstelltAm: "2026-01-01T12:00:00.000Z",
      erstelltVon: "",
    };
    vi.mocked(apiRequest).mockResolvedValueOnce(mockEinreichung);

    const result = await createEinreichung(
      makeAuthSession(),
      "v-1",
      "Klageeinreichung",
    );

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/einreichungen",
        method: "POST",
        body: { name: "Klageeinreichung" },
        errorMessage:
          "Einreichung for Verfahren with id v-1 could not be created.",
      }),
    );
    expect(result).toEqual(mockEinreichung);
  });

  it("sends the given name as the request body (e.g. for a weitere Einreichung)", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({});

    await createEinreichung(makeAuthSession(), "v-1", "Schriftsatz");

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({ body: { name: "Schriftsatz" } }),
    );
  });
});

describe("submitEinreichungen", () => {
  it("calls the einreichen endpoint with the given eTag and returns the camelCase result", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ belegId: "b-1" });

    const result = await submitEinreichungen(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ belegId: "b-1" });

    expect(apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/einreichen",
      method: "POST",
      eTag: 'W/"0"',
      schema: expect.anything(),
      errorMessage: "Einreichung with id e-1 could not be submitted.",
    });
  });
});

describe("deleteEinreichung", () => {
  it("sends the DELETE with the given eTag as If-Match", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce(undefined);

    await deleteEinreichung(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"3"',
    });

    expect(apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1/einreichungen/e-1",
      method: "DELETE",
      eTag: 'W/"3"',
      errorMessage:
        "Einreichung with id e-1 of Verfahren with id v-1 could not be deleted.",
    });
  });
});
