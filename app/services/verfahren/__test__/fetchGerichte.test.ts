import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fetchGerichte from "~/services/verfahren/fetchGerichte.service";

const mocks = vi.hoisted(() => {
  return {
    getBearerToken: vi.fn(),
    fetch: vi.fn(),
  };
});

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

global.fetch = mocks.fetch;

describe("fetchGerichte", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("calls API with correct URL and bearer token", async () => {
    const mockGerichte = [
      {
        id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        wert: "Landgericht Frankfurt",
        code: "LG_FFM",
      },
    ];

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockGerichte,
    });

    const mockRequest = new Request("http://localhost:3000");
    const result = await fetchGerichte(mockRequest);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/gerichte",
      expect.objectContaining({
        headers: {
          Authorization: "Bearer test-token",
        },
      }),
    );

    expect(result).toEqual(mockGerichte);
  });

  it("throws error when bearer token is not available", async () => {
    mocks.getBearerToken.mockResolvedValue(null);

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchGerichte(mockRequest)).rejects.toThrow(
      "No bearer token available",
    );
  });

  it("throws error when API returns non-ok response", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchGerichte(mockRequest)).rejects.toThrow(
      "Die Daten für das ausgewählte Gericht konnten nicht abgerufen werden",
    );
  });

  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchGerichte(mockRequest)).rejects.toThrow(
      "Die Daten für das ausgewählte Gericht konnten nicht abgerufen werden",
    );
  });

  it("returns empty array when API returns no data", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const mockRequest = new Request("http://localhost:3000");
    const result = await fetchGerichte(mockRequest);

    expect(result).toEqual([]);
  });
});
