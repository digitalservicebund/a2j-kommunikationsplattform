import { beforeEach, describe, expect, it, vi } from "vitest";
import deleteDokument from "../deleteDokument.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("deleteDokument", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls DELETE endpoint", async () => {
    mocks.apiRequest.mockResolvedValueOnce(undefined);

    await deleteDokument(mockAuthData, "d-1", "v-1", "e-1");

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
      method: "DELETE",
      errorMessage: "Dokument konnte nicht gelöscht werden.",
    });
  });
});
