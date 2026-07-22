import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchEinreichungStatus from "../fetchEinreichungStatus.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchEinreichungStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates path and message", async () => {
    const status = { status: "GRUEN", validation_messages: [] };
    mocks.apiRequest.mockResolvedValueOnce(status);

    const result = await fetchEinreichungStatus(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/validierungsstatus",
        errorMessage:
          "Validierungsstatus for Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(status);
  });
});
