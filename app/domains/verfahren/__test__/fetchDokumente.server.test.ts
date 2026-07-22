import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchDokumente from "../fetchDokumente";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchDokumente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates path and message", async () => {
    const dokumente: unknown[] = [];
    mocks.apiRequest.mockResolvedValueOnce(dokumente);

    const result = await fetchDokumente(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
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
