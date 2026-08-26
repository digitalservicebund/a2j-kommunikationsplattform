import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchBelegById from "../fetchBelegById.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchBelegById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches a single Beleg by id", async () => {
    const beleg = {
      id: "b-1",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      status: "ERSTELLT",
      dateiname: "beleg.pdf",
      content_type: "application/pdf",
    };

    mocks.apiRequest.mockResolvedValueOnce(beleg);

    const result = await fetchBelegById(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-1",
    });

    expect(result).toEqual(beleg);
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/belege/b-1",
      }),
    );
  });
});
