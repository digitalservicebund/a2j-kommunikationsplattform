import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  fetchBelegById,
  fetchBelegDownloadLink,
  fetchBelege,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchBelegById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches a single Beleg by id", async () => {
    const beleg = {
      id: "b-1",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      status: "ERSTELLT",
      dateiname: "beleg.pdf",
      contentType: "application/pdf",
    };

    mocks.apiRequest.mockResolvedValueOnce(beleg);

    const result = await fetchBelegById(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toEqual(beleg);
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/belege/b-1",
      }),
    );
  });
});

describe("fetchBelege", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("fetches all Belege of a Verfahren without a filter", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ elemente: [] });

    const result = await fetchBelege(mockAuthData, { verfahrenId: "v-1" });

    expect(result).toEqual({ elemente: [] });
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        fullUrl: "http://localhost:8080/api/v1/verfahren/v-1/belege",
      }),
    );
  });

  it("filters by einreichung_id when given", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ elemente: [] });

    await fetchBelege(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege?einreichung_id=e-1",
      }),
    );
  });
});

describe("fetchBelegDownloadLink", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("fetches the download link without optional params", async () => {
    mocks.apiRequest.mockResolvedValueOnce("https://s3.example.com/beleg");

    const result = await fetchBelegDownloadLink(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toBe("https://s3.example.com/beleg");
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege/b-1/downloadlink",
      }),
    );
  });

  it("includes ttl and disposition_type when given", async () => {
    mocks.apiRequest.mockResolvedValueOnce("https://s3.example.com/beleg");

    await fetchBelegDownloadLink(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
      ttl: 300,
      dispositionType: "ATTACHMENT",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege/b-1/downloadlink?ttl=300&disposition_type=ATTACHMENT",
      }),
    );
  });
});

describe("fetchLatestBelegForEinreichung", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("returns null when no Beleg exists yet", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ elemente: [] });

    const result = await fetchLatestBelegForEinreichung(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(result).toBeNull();
    expect(mocks.apiRequest).toHaveBeenCalledTimes(1);
  });

  it("fetches the latest Beleg by id when one or more exist", async () => {
    mocks.apiRequest
      .mockResolvedValueOnce({
        elemente: [{ id: "b-1" }, { id: "b-2" }],
      })
      .mockResolvedValueOnce({ id: "b-2", status: "ERSTELLT" });

    const result = await fetchLatestBelegForEinreichung(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege?einreichung_id=e-1",
      }),
    );
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege/b-2",
      }),
    );
    expect(result).toEqual({ id: "b-2", status: "ERSTELLT" });
  });
});
