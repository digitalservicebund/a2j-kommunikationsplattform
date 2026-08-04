import { beforeEach, describe, expect, it, vi } from "vitest";
import createVerfahren from "../createVerfahren.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("createVerfahren", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when safeId is missing", async () => {
    const authWithoutSafeId = {
      ...mockAuthData,
      authenticationTokens: {
        ...mockAuthData.authenticationTokens,
        idToken: undefined,
      },
    };

    await expect(createVerfahren(authWithoutSafeId)).rejects.toThrow(
      "No safeId is available",
    );
    expect(mocks.apiRequest).not.toHaveBeenCalled();
  });

  it("extracts first item from array response", async () => {
    const verfahren = {
      id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
      aktenzeichen_gericht: null,
      verfahrensgegenstand: null,
      kurzrubrum: null,
      status: "ERSTELLT",
      status_geaendert_am: "2026-03-08T05:00:29.659Z",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2026-03-08T05:00:29.659Z",
      eingereicht_am: null,
      gericht: {
        id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        wert: "Landgericht Frankfurt",
        code: "LG_FFM",
      },
      beteiligungen: null,
    };
    mocks.apiRequest.mockResolvedValueOnce([verfahren]);

    const result = await createVerfahren(mockAuthData);

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren",
      method: "POST",
      body: { safe_id: mockAuthData.authenticationTokens.idToken },
      errorMessage: "Verfahren could not be created.",
    });
    expect(result).toEqual(verfahren);
  });
});
