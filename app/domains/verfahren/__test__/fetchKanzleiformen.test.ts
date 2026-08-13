import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchKanzleiformen from "~/domains/verfahren/fetchKanzleiformen.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchKanzleiformen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the kanzleiformen codeliste endpoint with the bearer token", async () => {
    const mockKanzleiformen = {
      list_version: "1",
      elemente: [{ id: "kanzleiform-1", wert: "Einzelanwalt", code: "001" }],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockKanzleiformen,
    });

    const result = await fetchKanzleiformen(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/kanzleiformen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockKanzleiformen);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchKanzleiformen(mockAuthData)).rejects.toThrow(
      "Kanzleiform data could not be fetched.",
    );
  });
});
