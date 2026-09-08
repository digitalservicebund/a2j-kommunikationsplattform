import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import loadVerfahrenEinreichungenOverview from "../loadVerfahrenEinreichungenOverview.server";

const mocks = vi.hoisted(() => ({
  fetchVerfahrenById: vi.fn(),
  fetchEinreichungenById: vi.fn(),
  fetchEinreichungStatus: vi.fn(),
  fetchDokumente: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server",
  () => ({
    fetchVerfahrenById: mocks.fetchVerfahrenById,
  }),
);

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({
    fetchEinreichungenById: mocks.fetchEinreichungenById,
    fetchEinreichungStatus: mocks.fetchEinreichungStatus,
  }),
);

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => ({
    fetchDokumente: mocks.fetchDokumente,
  }),
);

describe("loadVerfahrenEinreichungenOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads verfahren and all einreichungen with status and dokumente", async () => {
    const verfahren = { id: "v-1", status: "ERSTELLT" };
    const einreichungA = {
      id: "e-1",
      erstellt_am: "2026-07-23T10:00:00.000Z",
    };
    const einreichungB = {
      id: "e-2",
      erstellt_am: "2026-07-24T10:00:00.000Z",
    };
    const statusA = { status: "GRUEN", validation_messages: [] };
    const statusB = { status: "GELB", validation_messages: [] };
    const dokumenteA = [{ id: "d-1", name: "klage.pdf", size_in_bytes: 1200 }];
    const dokumenteB = [{ id: "d-2", name: "anlage.pdf", size_in_bytes: 800 }];

    mocks.fetchVerfahrenById.mockResolvedValueOnce(verfahren);
    mocks.fetchEinreichungenById.mockResolvedValueOnce({
      elemente: [einreichungA, einreichungB],
    });
    mocks.fetchEinreichungStatus
      .mockResolvedValueOnce(statusA)
      .mockResolvedValueOnce(statusB);
    mocks.fetchDokumente
      .mockResolvedValueOnce({ elemente: dokumenteA })
      .mockResolvedValueOnce({ elemente: dokumenteB });

    const result = await loadVerfahrenEinreichungenOverview(
      mockAuthData,
      "v-1",
    );

    expect(mocks.fetchEinreichungStatus).toHaveBeenNthCalledWith(
      1,
      mockAuthData,
      {
        id: "e-1",
        verfahrenId: "v-1",
      },
    );
    expect(mocks.fetchEinreichungStatus).toHaveBeenNthCalledWith(
      2,
      mockAuthData,
      {
        id: "e-2",
        verfahrenId: "v-1",
      },
    );

    expect(result).toEqual({
      verfahren,
      einreichungen: [
        {
          einreichung: {
            ...einreichungA,
            einreichungsStatus: statusA,
          },
          dokumente: dokumenteA,
        },
        {
          einreichung: {
            ...einreichungB,
            einreichungsStatus: statusB,
          },
          dokumente: dokumenteB,
        },
      ],
    });
  });

  test("returns empty einreichungen when the API returns none", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungenOverview(mockAuthData, "v-1"),
    ).resolves.toEqual({
      verfahren: { id: "v-1" },
      einreichungen: [],
    });

    expect(mocks.fetchEinreichungStatus).not.toHaveBeenCalled();
    expect(mocks.fetchDokumente).not.toHaveBeenCalled();
  });
});
