import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchRechtsformen from "~/domains/verfahren/fetchRechtsformen.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchRechtsformen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the rechtsformen codeliste endpoint with the bearer token", async () => {
    const mockRechtsformen = {
      list_version: "3.4",
      elemente: [{ id: "rechtsform-1", wert: "GbR", code: "GbR" }],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockRechtsformen,
    });

    const result = await fetchRechtsformen(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/rechtsformen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockRechtsformen);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchRechtsformen(mockAuthData)).rejects.toThrow(
      "Rechtsform data could not be fetched.",
    );
  });
});
