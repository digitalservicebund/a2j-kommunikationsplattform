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
      status: "ERSTELLT",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      beantragt_am: null,
      gesendet_am: null,
      eingereicht_am: null,
      validierungs_status: "AUSSTEHEND",
      name: "Klageschrift",
    };

    mocks.apiRequest.mockResolvedValueOnce({
      data: einreichung,
      eTag: 'W/"1"',
    });

    const result = await fetchEinreichungById(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1",
        includeResponseETag: true,
        errorMessage:
          "Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
    expect(result).toEqual({ einreichung, eTag: 'W/"1"' });
  });
});
