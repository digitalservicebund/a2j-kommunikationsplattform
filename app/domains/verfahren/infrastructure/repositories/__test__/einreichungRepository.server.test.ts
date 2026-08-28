import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  createEinreichung,
  fetchEinreichungById,
  fetchEinreichungenById,
  fetchEinreichungStatus,
  fetchEinreichungXJustiz,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

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

    mocks.apiRequest.mockResolvedValueOnce({
      data: einreichung,
      eTag: 'W/"1"',
    });

    const result = await fetchEinreichungById(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
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
    mocks.apiRequest.mockResolvedValueOnce(einreichungen);

    const result = await fetchEinreichungenById(mockAuthData, { id: "v-1" });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
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
    mocks.apiRequest.mockResolvedValueOnce(status);

    const result = await fetchEinreichungStatus(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/validierungsstatus",
        errorMessage:
          "Validierungsstatus for Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(status);
  });
});

describe("fetchEinreichungXJustiz", () => {
  it("requests the xjustiz endpoint as text and returns the raw XML", async () => {
    const xml = "<xjustiz>...</xjustiz>";
    mocks.apiRequest.mockResolvedValueOnce(xml);

    const result = await fetchEinreichungXJustiz(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
    });

    expect(result).toBe(xml);
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/xjustiz",
        responseType: "text",
        errorMessage:
          "XJustiz-Nachricht for Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
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
    mocks.apiRequest.mockResolvedValueOnce(mockEinreichung);

    const result = await createEinreichung(mockAuthData, "v-1");

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen",
        method: "POST",
        body: { name: "Klageeinreichung" },
        errorMessage:
          "Einreichung for Verfahren with id v-1 could not be created.",
      }),
    );
    expect(result).toEqual(mockEinreichung);
  });
});

describe("submitEinreichungen", () => {
  it("calls the einreichen endpoint with the given eTag and returns the camelCase result", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ belegId: "b-1" });

    const result = await submitEinreichungen(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ belegId: "b-1" });

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/einreichen",
      method: "POST",
      eTag: 'W/"0"',
      schema: expect.anything(),
      errorMessage: "Einreichung with id e-1 could not be submitted.",
    });
  });
});
