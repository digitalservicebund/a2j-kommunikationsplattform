import { beforeEach, describe, expect, test, vi } from "vitest";
import loadVerfahrenEinreichungenOverview from "../loadVerfahrenEinreichungenOverview.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  fetchVerfahrenById: vi.fn(),
  fetchEinreichungenById: vi.fn(),
  fetchEinreichungStatus: vi.fn(),
  fetchDokumente: vi.fn(),
}));

vi.mock("../fetchVerfahrenById.server", () => ({
  default: mocks.fetchVerfahrenById,
}));

vi.mock("../fetchEinreichungenById.server", () => ({
  default: mocks.fetchEinreichungenById,
}));

vi.mock("../fetchEinreichungStatus.server", () => ({
  default: mocks.fetchEinreichungStatus,
}));

vi.mock("../fetchDokumente", () => ({
  default: mocks.fetchDokumente,
}));

describe("loadVerfahrenEinreichungenOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads verfahren and all matching einreichungen with status and dokumente", async () => {
    const verfahren = { id: "v-1", status: "ERSTELLT" };
    const einreichungA = {
      id: "e-1",
      verfahren_id: "v-1",
      erstellt_am: "2026-07-23T10:00:00.000Z",
    };
    const einreichungB = {
      id: "e-2",
      verfahren_id: "v-1",
      erstellt_am: "2026-07-24T10:00:00.000Z",
    };
    const otherVerfahrenEinreichung = {
      id: "e-3",
      verfahren_id: "v-2",
      erstellt_am: "2026-07-25T10:00:00.000Z",
    };
    const statusA = { status: "GRUEN", validation_messages: [] };
    const statusB = { status: "GELB", validation_messages: [] };
    const dokumenteA = [{ id: "d-1", name: "klage.pdf", size_in_bytes: 1200 }];
    const dokumenteB = [{ id: "d-2", name: "anlage.pdf", size_in_bytes: 800 }];

    mocks.fetchVerfahrenById.mockResolvedValueOnce(verfahren);
    mocks.fetchEinreichungenById.mockResolvedValueOnce([
      einreichungA,
      otherVerfahrenEinreichung,
      einreichungB,
    ]);
    mocks.fetchEinreichungStatus
      .mockResolvedValueOnce(statusA)
      .mockResolvedValueOnce(statusB);
    mocks.fetchDokumente
      .mockResolvedValueOnce(dokumenteA)
      .mockResolvedValueOnce(dokumenteB);

    const result = await loadVerfahrenEinreichungenOverview(
      mockAuthData,
      "v-1",
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

  test("returns empty einreichungen when no matching einreichung exists", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce([
      { id: "e-3", verfahren_id: "v-2" },
    ]);

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
