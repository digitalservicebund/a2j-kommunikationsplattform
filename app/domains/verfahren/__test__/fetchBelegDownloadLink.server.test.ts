import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchBelegDownloadLink from "../fetchBelegDownloadLink.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

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
    mocks.apiRequest.mockResolvedValueOnce("https://s3.example.com/beleg");

    const result = await fetchBelegDownloadLink(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toBe("https://s3.example.com/beleg");
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege/b-1/downloadlink",
      }),
    );
  });

  it("includes ttl and disposition_type when given", async () => {
    mocks.apiRequest.mockResolvedValueOnce("https://s3.example.com/beleg");

    await fetchBelegDownloadLink(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
      ttl: 300,
      dispositionType: "ATTACHMENT",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege/b-1/downloadlink?ttl=300&disposition_type=ATTACHMENT",
      }),
    );
  });
});
