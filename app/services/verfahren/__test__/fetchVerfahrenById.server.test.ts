import { it, vi } from "vitest";
import { fetchFromApi } from "../../api/fetchFromApi.server";
import fetchVerfahrenById from "../fetchVerfahrenById.server";

const mocks = vi.hoisted(() => {
  return {
    fetchFromApi: vi.fn(),
  };
});

vi.mock("../../api/fetchFromApi.server", () => ({
  fetchFromApi: mocks.fetchFromApi,
}));

describe("fetchVerfahrenById", () => {
  it("calls fetchFromApi with correct arguments", async () => {
    const response = {
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
      beteiligungen: [
        {
          id: "019aa757-2b36-71fd-b76c-f65031658bba",
          name: "Test Beklagte",
          rollen: [
            {
              id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
              wert: "Beklagte(r)",
              code: "028",
            },
          ],
          prozessbevollmaechtigte: [],
        },
        {
          id: "019aa757-2b36-7512-b77e-f3865302c272",
          name: "Test Klägerin",
          rollen: [
            {
              id: "c53dd226-7bd9-4da5-19da-5302595a9469",
              wert: "Kläger(in)",
              code: "101",
            },
          ],
          prozessbevollmaechtigte: [],
        },
      ],
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
