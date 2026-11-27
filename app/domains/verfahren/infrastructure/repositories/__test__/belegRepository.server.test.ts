import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  fetchBelegById,
  fetchBelegDownloadLink,
  fetchBelege,
  fetchLatestBelegForEinreichung,
} from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";

vi.mock(import("~/domains/verfahren/infrastructure/api/apiClient"));

describe("fetchBelegById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches a single Beleg by id", async () => {
    const beleg = {
      id: "b-1",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      status: "ERSTELLT",
      dateiname: "beleg.pdf",
      contentType: "application/pdf",
    };

    vi.mocked(apiRequest).mockResolvedValueOnce(beleg);

    const result = await fetchBelegById(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toEqual(beleg);
    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/belege/b-1",
      }),
    );
  });
});

describe("fetchBelege", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("fetches all Belege of a Verfahren without a filter", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ elemente: [] });

    const result = await fetchBelege(makeAuthSession(), { verfahrenId: "v-1" });

    expect(result).toEqual({ elemente: [] });
    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/verfahren/v-1/belege",
        searchParams: { einreichung_id: undefined },
      }),
    );
  });

  it("filters by einreichung_id when given", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ elemente: [] });

    await fetchBelege(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege",
        searchParams: { einreichung_id: "e-1" },
      }),
    );
  });
});

describe("fetchBelegDownloadLink", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("fetches the download link without optional params", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce("https://s3.example.com/beleg");

    const result = await fetchBelegDownloadLink(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toBe("https://s3.example.com/beleg");
    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege/b-1/downloadlink",
        searchParams: { ttl: undefined, disposition_type: undefined },
      }),
    );
  });

  it("includes ttl and disposition_type when given", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce("https://s3.example.com/beleg");

    await fetchBelegDownloadLink(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "b-1",
      ttl: 300,
      dispositionType: "ATTACHMENT",
    });

    expect(apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege/b-1/downloadlink",
        searchParams: { ttl: 300, disposition_type: "ATTACHMENT" },
      }),
    );
  });
});

describe("fetchLatestBelegForEinreichung", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  it("returns null when no Beleg exists yet", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ elemente: [] });

    const result = await fetchLatestBelegForEinreichung(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(result).toBeNull();
    expect(apiRequest).toHaveBeenCalledTimes(1);
  });

  it("fetches the latest Beleg by id when one or more exist", async () => {
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({
        elemente: [{ id: "b-1" }, { id: "b-2" }],
      })
      .mockResolvedValueOnce({ id: "b-2", status: "ERSTELLT" });

    const result = await fetchLatestBelegForEinreichung(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(apiRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege",
        searchParams: { einreichung_id: "e-1" },
      }),
    );
    expect(apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/api/v1/verfahren/v-1/belege/b-2",
      }),
    );
    expect(result).toEqual({ id: "b-2", status: "ERSTELLT" });
  });
});
