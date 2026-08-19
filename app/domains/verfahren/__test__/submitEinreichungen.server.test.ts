import { beforeEach, describe, expect, it, vi } from "vitest";
import submitEinreichungen from "../submitEinreichungen.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("submitEinreichungen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the einreichen endpoint with the given eTag and returns the beleg_id", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ beleg_id: "b-1" });

    const result = await submitEinreichungen(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ beleg_id: "b-1" });

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/einreichen",
      method: "POST",
      eTag: 'W/"0"',
      schema: expect.anything(),
      errorMessage: "Einreichung with id e-1 could not be submitted.",
    });
  });
});
