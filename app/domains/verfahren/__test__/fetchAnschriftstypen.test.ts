import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchAnschriftstypen from "~/domains/verfahren/fetchAnschriftstypen.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchAnschriftstypen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the anschriftstypen codeliste endpoint with the bearer token", async () => {
    const mockAnschriftstypen = {
      list_version: "1",
      elemente: [{ id: "typ-1", wert: "Privatanschrift", code: "017" }],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockAnschriftstypen,
    });

    const result = await fetchAnschriftstypen(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/anschriftstypen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockAnschriftstypen);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchAnschriftstypen(mockAuthData)).rejects.toThrow(
      "Anschriftstyp data could not be fetched.",
    );
  });
});
