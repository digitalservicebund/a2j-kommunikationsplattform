import { it, vi } from "vitest";
import { fetchFromApi } from "../api/fetchFromApi.server";
import fetchVerfahrenById from "../verfahren/fetchVerfahrenById.server";

const mocks = vi.hoisted(() => {
  return {
    fetchFromApi: vi.fn(),
  };
});

vi.mock("../api/fetchFromApi.server", () => ({
  fetchFromApi: mocks.fetchFromApi,
}));

describe("fetchVerfahrenById", () => {
  it("calls fetchFromApi with correct arguments", async () => {
    const response = {
      id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
      aktenzeichen: "JBA-82746242",
      status: "Erstellt",
      status_changed: "2025-03-08T05:00:29.659Z",
      eingereicht_am: "2024-12-29T22:46:29.329Z",
      gericht_name: "Landgericht Frankfurt",
    };
    mocks.fetchFromApi.mockReturnValue(response);
    const result = await fetchVerfahrenById({ id: response.id });

    expect(fetchFromApi).toHaveBeenCalledWith({
      url: `/verfahren/${response.id}`,
      errorMessage: "Das Verfahren konnte nicht abgerufen werden.",
    });

    expect(result).toEqual(response);
  });

  it("throws error on invalid schema", async () => {
    mocks.fetchFromApi.mockReturnValue({ invalid: true });
    expect(() => fetchVerfahrenById({ id: "123" })).rejects.toThrowError(
      "Das Verfahren konnte nicht abgerufen werden.",
    );
  });
});
