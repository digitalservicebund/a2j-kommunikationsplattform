import { it, vi } from "vitest";
import fetchVerfahrenById from "../fetchVerfahrenById.server";

const mocks = vi.hoisted(() => {
  return {
    getBearerToken: vi.fn(),
    fetch: vi.fn(),
  };
});

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

global.fetch = mocks.fetch;

const mockVerfahren = {
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

describe("fetchVerfahrenById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls fetchFromApi with correct arguments", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockVerfahren,
    });

    const mockRequest = new Request("http://localhost:3000");
    const result = await fetchVerfahrenById(mockRequest, {
      id: mockVerfahren.id,
    });

    expect(mocks.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/verfahren/${mockVerfahren.id}`),
      expect.objectContaining({
        headers: {
          Authorization: "Bearer test-token",
        },
      }),
    );

    expect(result).toEqual(mockVerfahren);
  });
  it("throws error on invalid schema", async () => {
    mocks.getBearerToken.mockResolvedValue("test-token");
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ invalid: true }),
    });

    const mockRequest = new Request("http://localhost:3000");

    await expect(
      fetchVerfahrenById(mockRequest, { id: mockVerfahren.id }),
    ).rejects.toThrow();
  });
});
