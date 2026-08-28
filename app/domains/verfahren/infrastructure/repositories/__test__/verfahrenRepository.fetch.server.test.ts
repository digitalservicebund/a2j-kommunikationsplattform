import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sortOptions } from "~/config/verfahren";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  fetchVerfahren,
  fetchVerfahrenById,
} from "../verfahrenRepository.server";

const mocks = vi.hoisted(() => {
  return {
    getBearerToken: vi.fn(),
    fetch: vi.fn(),
  };
});

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

const apiVerfahren = {
  id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
  aktenzeichen_gericht: "JBA-82746242",
  verfahrensgegenstand: null,
  kurzrubrum: null,
  status: "ERSTELLT",
  status_geaendert_am: "2025-03-08T05:00:29.659Z",
  erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
  erstellt_am: "2025-03-08T05:00:29.659Z",
  eingereicht_am: "2024-12-29T22:46:29.329Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [],
};

const domainVerfahren = {
  id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
  aktenzeichenGericht: "JBA-82746242",
  verfahrensgegenstand: null,
  kurzrubrum: null,
  status: "ERSTELLT",
  statusGeaendertAm: "2025-03-08T05:00:29.659Z",
  erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
  erstelltAm: "2025-03-08T05:00:29.659Z",
  eingereichtAm: "2024-12-29T22:46:29.329Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [],
};

describe("fetchVerfahren", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("calls fetchFromApi with correct arguments and returns camelCase Verfahren", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ elemente: [apiVerfahren] }),
    });

    const result = await fetchVerfahren(mockAuthData, {
      limit: 99,
      offset: 123,
      search_text: "test-search",
      sort: sortOptions[0].value,
    });

    const calledUrl = mocks.fetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("limit=99");
    expect(calledUrl).toContain("offset=123");
    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );

    expect(result).toEqual({ elemente: [domainVerfahren] });
  });

  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    const result = fetchVerfahren(mockAuthData, { sort: sortOptions[0].value });

    await expect(result).rejects.toThrow("Verfahren could not be fetched.");
  });

  it("throws error when bearer token is not available", async () => {
    mocks.getBearerToken.mockResolvedValue(null);

    const result = fetchVerfahren(mockAuthData);

    await expect(result).rejects.toThrow("No bearer token available");
  });

  it("throws error when API returns non-ok response", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      url: "http://localhost:8080/api/v1/verfahren",
      text: async () => "server failure",
      clone: () => ({
        text: async () => "server failure",
      }),
    });

    const result = fetchVerfahren(mockAuthData);

    await expect(result).rejects.toThrow("Verfahren could not be fetched.");
  });

  describe("gericht parameter handling", () => {
    it("includes gericht parameter when provided", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });

      await fetchVerfahren(mockAuthData, {
        gericht: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        limit: 99,
        offset: 123,
        search_text: "test-search",
        sort: sortOptions[0].value,
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.stringContaining("gericht=b727131c-0c32-91ba-3eaa-f44405967b6d"),
        expect.any(Object),
      );
    });

    it("excludes gericht parameter when null", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });
      await fetchVerfahren(mockAuthData, { gericht: null });
      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.not.stringContaining("gericht="),
        expect.any(Object),
      );
    });

    it("rejects invalid UUID in gericht parameter", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");

      const result = fetchVerfahren(mockAuthData, {
        gericht: "invalid-uuid",
      });

      await expect(result).rejects.toThrow();
    });

    it("includes sort parameter when provided", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });

      await fetchVerfahren(mockAuthData, {
        sort: sortOptions[1].value,
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `sort=${encodeURIComponent(sortOptions[1].value)}`,
        ),
        expect.any(Object),
      );
    });

    it("excludes sort parameter when empty string", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });
      await fetchVerfahren(mockAuthData, { sort: "" });
      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.not.stringContaining("sort="),
        expect.any(Object),
      );
    });

    it("rejects invalid sort parameter", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");

      const result = fetchVerfahren(mockAuthData, {
        sort: "invalid-sort-value",
      });

      await expect(result).rejects.toThrow();
    });

    it("includes suchbegriff parameter when search_text is provided", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });

      await fetchVerfahren(mockAuthData, {
        search_text: "legal case",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.stringContaining("suchbegriff=legal+case"),
        expect.any(Object),
      );
    });

    it("excludes suchbegriff parameter when search_text is null", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });
      await fetchVerfahren(mockAuthData, { search_text: null });
      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.not.stringContaining("suchbegriff="),
        expect.any(Object),
      );
    });

    it("trims whitespace from search_text before sending as suchbegriff", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ elemente: [] }),
      });

      await fetchVerfahren(mockAuthData, {
        search_text: "   trimmed search   ",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.stringContaining("suchbegriff=trimmed+search"),
        expect.any(Object),
      );
    });
  });
});

describe("fetchVerfahrenById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls fetchFromApi with correct arguments and returns camelCase Verfahren", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => apiVerfahren,
    });

    const result = await fetchVerfahrenById(mockAuthData, {
      id: apiVerfahren.id,
    });

    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/verfahren/${apiVerfahren.id}`),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );

    expect(result).toEqual(domainVerfahren);
  });

  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ invalid: true }),
    });

    await expect(
      fetchVerfahrenById(mockAuthData, { id: apiVerfahren.id }),
    ).rejects.toThrow();
  });
});
