import { makeAuthSession } from "tests/utils/factories/authSession";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
  fetch: vi.fn(),
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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockAnschriftstypen,
    });

    const result = await fetchAnschriftstypen(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/anschriftstypen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockAnschriftstypen);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchAnschriftstypen(makeAuthSession())).rejects.toThrow(
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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockGerichte,
    });

    const result = await fetchGerichte(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/gerichte",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );

    expect(result).toEqual(mockGerichte);
  });

  it("throws error when API returns non-ok response", async () => {
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

    await expect(fetchGerichte(makeAuthSession())).rejects.toThrow(
      "Gericht data could not be fetched.",
    );
  });

  it("throws error on invalid schema", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchGerichte(makeAuthSession())).rejects.toThrow(
      "Gericht data could not be fetched.",
    );
  });

  it("returns empty list when API returns no elemente", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ list_version: "1", elemente: [] }),
    });

    const result = await fetchGerichte(makeAuthSession());

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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockKanzleiformen,
    });

    const result = await fetchKanzleiformen(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/kanzleiformen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockKanzleiformen);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchKanzleiformen(makeAuthSession())).rejects.toThrow(
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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockRechtsformen,
    });

    const result = await fetchRechtsformen(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/rechtsformen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockRechtsformen);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchRechtsformen(makeAuthSession())).rejects.toThrow(
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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockRollenbezeichnungen,
    });

    const result = await fetchRollenbezeichnungen(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/rollenbezeichnungen",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockRollenbezeichnungen);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchRollenbezeichnungen(makeAuthSession())).rejects.toThrow(
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

    mocks.fetch.mockResolvedValue({ ok: true, json: async () => mockStaaten });

    const result = await fetchStaaten(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/staaten",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockStaaten);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(fetchStaaten(makeAuthSession())).rejects.toThrow(
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

    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockTelekommunikationsarten,
    });

    const result = await fetchTelekommunikationsarten(makeAuthSession());

    expect(mocks.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/codelisten/telekommunikationsarten",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${makeAuthSession().accessToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockTelekommunikationsarten);
  });

  it("throws when the schema does not match", async () => {
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ invalid: true }],
    });

    await expect(
      fetchTelekommunikationsarten(makeAuthSession()),
    ).rejects.toThrow("Telekommunikationsart data could not be fetched.");
  });
});
