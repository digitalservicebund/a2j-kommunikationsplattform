import { beforeEach, describe, expect, test, vi } from "vitest";
import loadVerfahrenEinreichungBundle from "../loadVerfahrenEinreichungBundle.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  fetchVerfahrenById: vi.fn(),
  fetchEinreichungenById: vi.fn(),
  fetchEinreichungById: vi.fn(),
  fetchEinreichungStatus: vi.fn(),
  fetchDokumente: vi.fn(),
}));

vi.mock("../fetchVerfahrenById.server", () => ({
  default: mocks.fetchVerfahrenById,
}));

vi.mock("../fetchEinreichungenById.server", () => ({
  default: mocks.fetchEinreichungenById,
}));

vi.mock("../fetchEinreichungById.server", () => ({
  default: mocks.fetchEinreichungById,
}));

vi.mock("../fetchEinreichungStatus.server", () => ({
  default: mocks.fetchEinreichungStatus,
}));

vi.mock("../fetchDokumente", () => ({
  default: mocks.fetchDokumente,
}));

describe("loadVerfahrenEinreichungBundle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads and combines verfahren, einreichung, status and dokumente", async () => {
    const verfahren = { id: "v-1", status: "ERSTELLT" };
    const einreichung = {
      id: "e-1",
      verfahren_id: "v-1",
      erstellt_am: "2026-07-23T10:00:00.000Z",
    };
    const einreichungsStatus = { status: "GRUEN", validation_messages: [] };
    const dokumente = [{ id: "d-1", name: "klage.pdf", size_in_bytes: 1200 }];

    mocks.fetchVerfahrenById.mockResolvedValueOnce(verfahren);
    mocks.fetchEinreichungenById.mockResolvedValueOnce([{ id: "e-1" }]);
    mocks.fetchEinreichungById.mockResolvedValueOnce(einreichung);
    mocks.fetchEinreichungStatus.mockResolvedValueOnce(einreichungsStatus);
    mocks.fetchDokumente.mockResolvedValueOnce(dokumente);

    const result = await loadVerfahrenEinreichungBundle(mockAuthData, "v-1");

    expect(mocks.fetchVerfahrenById).toHaveBeenCalledWith(mockAuthData, {
      id: "v-1",
    });
    expect(mocks.fetchEinreichungenById).toHaveBeenCalledWith(mockAuthData, {
      id: "v-1",
    });
    expect(mocks.fetchEinreichungById).toHaveBeenCalledWith(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });
    expect(mocks.fetchEinreichungStatus).toHaveBeenCalledWith(mockAuthData, {
      id: "e-1",
      verfahrenId: "v-1",
    });
    expect(mocks.fetchDokumente).toHaveBeenCalledWith(mockAuthData, {
      einreichungId: "e-1",
      verfahrenId: "v-1",
    });

    expect(result).toEqual({
      verfahren,
      einreichung: {
        ...einreichung,
        einreichungsStatus,
      },
      dokumente,
      einreichungId: "e-1",
    });
  });

  test("throws when no einreichung exists", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce([]);

    await expect(
      loadVerfahrenEinreichungBundle(mockAuthData, "v-1"),
    ).rejects.toThrow("No Einreichung could be fetched");
  });
});
