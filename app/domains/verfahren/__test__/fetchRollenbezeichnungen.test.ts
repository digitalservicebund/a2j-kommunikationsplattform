import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchRollenbezeichnungen from "~/domains/verfahren/fetchRollenbezeichnungen.service";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

describe("fetchRollenbezeichnungen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  it("calls the rollenbezeichnungen codeliste endpoint with the bearer token", async () => {
    const mockRollenbezeichnungen = {
      list_version: "1",
      elemente: [{ id: "rolle-1", wert: "Kläger(in)", code: "101" }],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockRollenbezeichnungen,
    });

    const result = await fetchRollenbezeichnungen(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/rollenbezeichnungen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    expect(result).toEqual(mockRollenbezeichnungen);
  });

  it("throws when the schema does not match", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchRollenbezeichnungen(mockAuthData)).rejects.toThrow(
      "Rollenbezeichnung data could not be fetched.",
    );
  });
});
