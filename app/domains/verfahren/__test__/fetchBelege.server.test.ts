import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchBelege from "../fetchBelege.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

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
    mocks.apiRequest.mockResolvedValueOnce({ elemente: [] });

    const result = await fetchBelege(mockAuthData, { verfahrenId: "v-1" });

    expect(result).toEqual({ elemente: [] });
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        fullUrl: "http://localhost:8080/api/v1/verfahren/v-1/belege",
      }),
    );
  });

  it("filters by einreichung_id when given", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ elemente: [] });

    await fetchBelege(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        fullUrl:
          "http://localhost:8080/api/v1/verfahren/v-1/belege?einreichung_id=e-1",
      }),
    );
  });
});
