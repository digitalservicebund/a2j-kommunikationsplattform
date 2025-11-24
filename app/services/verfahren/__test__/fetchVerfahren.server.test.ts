import { it, vi } from "vitest";
import { fetchFromApi } from "../../api/fetchFromApi.server";
import fetchVerfahren from "../fetchVerfahren.server";

const mocks = vi.hoisted(() => {
  return {
    fetchFromApi: vi.fn(),
  };
});

vi.mock("../../api/fetchFromApi.server", () => ({
  fetchFromApi: mocks.fetchFromApi,
}));

describe("fetchVerfahren", () => {
  it("calls fetchFromApi with correct arguments", async () => {
    const mockVerfahren = [
      {
        id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
        aktenzeichen_gericht: "JBA-82746242",
        status: "Erstellt",
        status_changed: "2025-03-08T05:00:29.659Z",
        eingereicht_am: "2024-12-29T22:46:29.329Z",
        gericht: {
          id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
          wert: "Landgericht Frankfurt",
          code: "LG_FFM",
        },
        beteiligungen: [],
      },
    ];

    mocks.fetchFromApi.mockReturnValue(mockVerfahren);
    const result = await fetchVerfahren({ limit: 99, offset: 123 });

    expect(fetchFromApi).toHaveBeenCalledWith({
      url: "/verfahren?limit=99&offset=123",
      errorMessage: "Die Verfahren konnten nicht abgerufen werden.",
    });

    expect(result).toEqual(mockVerfahren);
  });

  it("throws error on invalid schema", async () => {
    mocks.fetchFromApi.mockReturnValue([{ invalid: true }]);
    expect(fetchVerfahren).rejects.toThrowError(
      "Die Verfahren konnten nicht abgerufen werden.",
    );
  });
});
