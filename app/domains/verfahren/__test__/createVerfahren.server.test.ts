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
      status: "ERSTELLT",
      status_changed: "2026-03-08T05:00:29.659Z",
      eingereicht_am: null,
      gericht: null,
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
