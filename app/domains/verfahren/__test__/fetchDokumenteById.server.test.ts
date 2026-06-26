import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchDokumenteById from "../fetchDokumenteById.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchDokumenteById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates path and message", async () => {
    const dokumente: unknown[] = [];
    mocks.apiRequest.mockResolvedValueOnce(dokumente);

    const result = await fetchDokumenteById(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
        errorMessage:
          "Die Dokumente für die Einreichung mit der ID e-1 konnten nicht abgerufen werden.",
      }),
    );
    expect(result).toEqual(dokumente);
  });
});
