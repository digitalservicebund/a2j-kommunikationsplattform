import { beforeEach, describe, expect, it, vi } from "vitest";
import updateVerfahren from "../updateVerfahren.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

const verfahrenPayload = {
  verfahrensgegenstand: "Zahlungsklage",
  kurzrubrum: null,
  gericht_id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
  beteiligungen: null,
};

describe("updateVerfahren", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the current eTag before sending the PUT with If-Match", async () => {
    const updatedVerfahren = { id: "v-1", ...verfahrenPayload };
    mocks.apiRequest
      .mockResolvedValueOnce({ data: updatedVerfahren, eTag: 'W/"1"' })
      .mockResolvedValueOnce(updatedVerfahren);

    const result = await updateVerfahren(mockAuthData, "v-1", verfahrenPayload);

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(1, {
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1",
      schema: expect.anything(),
      includeResponseETag: true,
      errorMessage: "Fehler beim Bearbeiten des Verfahrens.",
    });
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(2, {
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1",
      method: "PUT",
      body: verfahrenPayload,
      eTag: 'W/"1"',
      errorMessage: "Fehler beim Bearbeiten des Verfahrens.",
    });
    expect(result).toEqual(updatedVerfahren);
  });

  it("sends undefined eTag when none is returned", async () => {
    const updatedVerfahren = { id: "v-1", ...verfahrenPayload };
    mocks.apiRequest
      .mockResolvedValueOnce({ data: updatedVerfahren, eTag: null })
      .mockResolvedValueOnce(updatedVerfahren);

    await updateVerfahren(mockAuthData, "v-1", verfahrenPayload);

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ eTag: undefined }),
    );
  });
});
