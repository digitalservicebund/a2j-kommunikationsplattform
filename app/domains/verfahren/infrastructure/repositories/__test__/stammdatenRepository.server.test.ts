import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import {
  fetchAnschriftstypen,
  fetchGerichte,
  fetchKanzleiformen,
  fetchRechtsformen,
  fetchRollenbezeichnungen,
  fetchStaaten,
  fetchTelekommunikationsarten,
} from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";

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
    const mockGerichte = {
      list_version: "1",
      elemente: [
        {
          id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
          wert: "Landgericht Frankfurt",
          code: "LG_FFM",
        },
      ],
    };

    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockGerichte,
    });

    const result = await fetchGerichte(mockAuthData);

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/gerichte",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );

    expect(result).toEqual(mockGerichte);
  });

  it("throws error when bearer token is not available", async () => {
    mocks.getBearerToken.mockResolvedValue(null);

    await expect(fetchGerichte(mockAuthData)).rejects.toThrow(
      "No bearer token available",
    );
  });

  it("throws error when API returns non-ok response", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      url: "http://localhost:8080/api/v1/codelisten/gerichte",
      text: async () => "Not Found",
      clone: () => ({
        text: async () => "Not Found",
      }),
    });

    await expect(fetchGerichte(mockAuthData)).rejects.toThrow(
      "Gericht data could not be fetched.",
    );
  });

  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchGerichte(mockAuthData)).rejects.toThrow(
      "Gericht data could not be fetched.",
    );
  });

  it("returns empty list when API returns no elemente", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ list_version: "1", elemente: [] }),
    });

    const result = await fetchGerichte(mockAuthData);

    expect(result).toEqual({ list_version: "1", elemente: [] });
  });
});

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
