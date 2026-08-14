import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchStaaten from "~/domains/verfahren/fetchStaaten.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchStaaten", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the staaten codeliste endpoint with the bearer token", async () => {
    const mockStaaten = {
      list_version: "1",
      elemente: [{ id: "staat-1", wert: "Deutschland", code: "000" }],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({ ok: true, json: async () => mockStaaten });

    const result = await fetchStaaten(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/staaten",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockStaaten);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchStaaten(mockAuthData)).rejects.toThrow(
      "Staat data could not be fetched.",
    );
  });
});
