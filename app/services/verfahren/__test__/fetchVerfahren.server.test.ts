import { it, vi } from "vitest";
import fetchVerfahren from "../fetchVerfahren.server";

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

describe("fetchVerfahren", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("calls fetchFromApi with correct arguments", async () => {
    const mockVerfahren = [
      {
        id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
        aktenzeichen_gericht: "JBA-82746242",
        status: "Erstellt",
        status_changed: "2025-03-08T05:00:29.659Z",
        eingereicht_am: "2024-12-29T22:46:29.329Z",
        gericht: {
          id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
          wert: "Landgericht Frankfurt",
          code: "LG_FFM",
        },
        beteiligungen: [],
      },
    ];

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockVerfahren,
    });

    const mockRequest = new Request("http://localhost:3000");
    const result = await fetchVerfahren(mockRequest, {
      limit: 99,
      offset: 123,
    });

    const calledUrl = mocks.fetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("limit=99");
    expect(calledUrl).toContain("offset=123");
    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: {
          Authorization: "Bearer test-token",
        },
      }),
    );

    expect(result).toEqual(mockVerfahren);
  });

  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchVerfahren(mockRequest)).rejects.toThrow(
      "Die Verfahren konnten nicht abgerufen werden.",
    );
  });

  it("includes gericht parameter when provided", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const mockRequest = new Request("http://localhost:3000");
    await fetchVerfahren(mockRequest, {
      gericht: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    });

    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.stringContaining("gericht=b727131c-0c32-91ba-3eaa-f44405967b6d"),
      expect.any(Object),
    );
  });

  it("excludes gericht parameter when empty string", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const mockRequest = new Request("http://localhost:3000");
    await fetchVerfahren(mockRequest, { gericht: "" });

    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.not.stringContaining("gericht="),
      expect.any(Object),
    );
  });

  it("throws error when bearer token is not available", async () => {
    mocks.getBearerToken.mockResolvedValue(null);

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchVerfahren(mockRequest)).rejects.toThrow(
      "No bearer token available",
    );
  });

  it("throws error when API returns non-ok response", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const mockRequest = new Request("http://localhost:3000");

    await expect(fetchVerfahren(mockRequest)).rejects.toThrow(
      "Die Verfahren konnten nicht abgerufen werden.",
    );
  });

  it("rejects invalid UUID in gericht parameter", async () => {
    const mockRequest = new Request("http://localhost:3000");

    await expect(
      fetchVerfahren(mockRequest, { gericht: "invalid-uuid" }),
    ).rejects.toThrow();
  });

  it("accepts negative offset and converts to 0", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");

    const mockRequest = new Request("http://localhost:3000");

    await expect(
      fetchVerfahren(mockRequest, { offset: -10 }),
    ).rejects.toThrow();
  });
});
