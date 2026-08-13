import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchTelekommunikationsarten from "~/domains/verfahren/fetchTelekommunikationsarten.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchTelekommunikationsarten", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the telekommunikationsarten codeliste endpoint with the bearer token", async () => {
    const mockTelekommunikationsarten = {
      list_version: "1",
      elemente: [
        { id: "tka-1", wert: "E-Mail", code: "001", beschreibung: "" },
      ],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockTelekommunikationsarten,
    });

    const result = await fetchTelekommunikationsarten(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/telekommunikationsarten",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockTelekommunikationsarten);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchTelekommunikationsarten(mockAuthData)).rejects.toThrow(
      "Telekommunikationsart data could not be fetched.",
    );
  });
});
