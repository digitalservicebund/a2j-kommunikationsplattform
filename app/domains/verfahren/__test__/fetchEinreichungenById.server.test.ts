import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchEinreichungenById from "../fetchEinreichungenById.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchEinreichungenById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates path and message", async () => {
    const einreichungen: unknown[] = [];
    mocks.apiRequest.mockResolvedValueOnce(einreichungen);

    const result = await fetchEinreichungenById(mockAuthData, { id: "v-1" });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen",
        errorMessage:
          "Die Einreichungen für das Verfahren mit der ID v-1 konnten nicht abgerufen werden.",
      }),
    );
    expect(result).toEqual(einreichungen);
  });
});
