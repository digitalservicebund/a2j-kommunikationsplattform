import { beforeEach, describe, expect, it, vi } from "vitest";
import createEinreichung from "../createEinreichung.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("createEinreichung", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates to apiRequest with expected payload", async () => {
    const mockEinreichung = {
      id: "e-1",
      verfahren_id: "v-1",
      status: "ENTWURF",
      erstellt_am: "2026-01-01T12:00:00.000Z",
      erstellt_von: "",
    };
    mocks.apiRequest.mockResolvedValueOnce(mockEinreichung);

    const result = await createEinreichung(mockAuthData, "v-1");

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen",
      method: "POST",
      body: { name: "Klageeinreichung" },
      errorMessage: "Einreichung konnte nicht erstellt werden.",
    });
    expect(result).toEqual(mockEinreichung);
  });
});
