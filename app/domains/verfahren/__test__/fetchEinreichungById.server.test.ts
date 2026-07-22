import { beforeEach, describe, expect, test, vi } from "vitest";
import fetchEinreichungById from "../fetchEinreichungById.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchEinreichungById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("delegates path and schema", async () => {
    const einreichung = {
      id: "e-1",
      verfahren_id: "v-1",
      status: "ERSTELLT",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      erstellt_von: null,
      gesendet_am: null,
      eingereicht_am: null,
      name: "Klageschrift",
    };

    mocks.apiRequest.mockResolvedValueOnce(einreichung);

    const result = await fetchEinreichungById(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1",
        errorMessage:
          "Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual(einreichung);
  });
});
