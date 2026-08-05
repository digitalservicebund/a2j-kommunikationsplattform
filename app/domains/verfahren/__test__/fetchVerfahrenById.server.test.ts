import { it, vi } from "vitest";
import fetchVerfahrenById from "../fetchVerfahrenById.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => {
  return {
    getBearerToken: vi.fn(),
    fetch: vi.fn(),
  };
});

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

globalThis.fetch = mocks.fetch;

const mockVerfahren = {
  id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
  aktenzeichen_gericht: "JBA-82746242",
  verfahrensgegenstand: null,
  kurzrubrum: null,
  status: "ERSTELLT",
  status_geaendert_am: "2025-03-08T05:00:29.659Z",
  erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
  erstellt_am: "2025-03-08T05:00:29.659Z",
  eingereicht_am: "2024-12-29T22:46:29.329Z",
  gericht: {
    id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [
    {
      beteiligtenart: "natuerlichePerson",
      id: "019aa757-2b36-71fd-b76c-f65031658bba",
      nachname: "Test Beklagte",
      vorname: null,
      titel: null,
      namensvorsatz: null,
      rollen: [
        {
          id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
          rollennummer: null,
          rollenbezeichnung: {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
          geschaeftszeichen: null,
          referenz: null,
        },
      ],
      anschriften: null,
      telekommunikation: null,
    },
    {
      beteiligtenart: "natuerlichePerson",
      id: "019aa757-2b36-7512-b77e-f3865302c272",
      nachname: "Test Klägerin",
      vorname: null,
      titel: null,
      namensvorsatz: null,
      rollen: [
        {
          id: "c53dd226-7bd9-4da5-19da-5302595a9469",
          rollennummer: null,
          rollenbezeichnung: {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
          geschaeftszeichen: null,
          referenz: null,
        },
      ],
      anschriften: null,
      telekommunikation: null,
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

    const mockRequest = mockAuthData;
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

    const mockRequest = mockAuthData;

    await expect(
      fetchVerfahrenById(mockRequest, { id: mockVerfahren.id }),
    ).rejects.toThrow();
  });
});
