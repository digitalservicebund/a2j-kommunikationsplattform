import { makeAuthSession } from "tests/utils/factories/authSession";
import { beforeEach, describe, expect, test, vi } from "vitest";
import loadVerfahrenEinreichungBundle from "../loadVerfahrenEinreichungBundle.server";

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

describe("loadVerfahrenEinreichungBundle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads and combines verfahren, einreichung, status and dokumente", async () => {
    const verfahren = { id: "v-1", status: "ERSTELLT" };
    const einreichungsStatus = { status: "GRUEN", validation_messages: [] };
    const dokumente = [{ id: "d-1", name: "klage.pdf", size_in_bytes: 1200 }];

    mocks.fetchVerfahrenById.mockResolvedValueOnce(verfahren);
    mocks.fetchEinreichungenById.mockResolvedValueOnce({
      elemente: [{ id: "e-1", name: "Klageeinreichung" }],
    });
    mocks.fetchEinreichungStatus.mockResolvedValueOnce(einreichungsStatus);
    mocks.fetchDokumente.mockResolvedValueOnce({ elemente: dokumente });

    const result = await loadVerfahrenEinreichungBundle(
      makeAuthSession(),
      "v-1",
    );

    expect(mocks.fetchVerfahrenById).toHaveBeenCalledWith(makeAuthSession(), {
      id: "v-1",
    });
    expect(mocks.fetchEinreichungenById).toHaveBeenCalledWith(
      makeAuthSession(),
      {
        id: "v-1",
      },
    );
    expect(mocks.fetchEinreichungStatus).toHaveBeenCalledWith(
      makeAuthSession(),
      {
        id: "e-1",
        verfahrenId: "v-1",
      },
    );
    expect(mocks.fetchDokumente).toHaveBeenCalledWith(makeAuthSession(), {
      einreichungId: "e-1",
      verfahrenId: "v-1",
    });

    expect(result).toEqual({
      verfahren,
      einreichung: {
        id: "e-1",
        name: "Klageeinreichung",
        einreichungsStatus,
      },
      dokumente,
      einreichungId: "e-1",
    });
  });

  test("picks the Klageeinreichung even when a Weitere Einreichung is listed first", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce({
      elemente: [
        { id: "e-2", name: "Schriftsatz" },
        { id: "e-1", name: "Klageeinreichung" },
      ],
    });
    mocks.fetchEinreichungStatus.mockResolvedValue({ status: "GRUEN" });
    mocks.fetchDokumente.mockResolvedValue({ elemente: [] });

    const result = await loadVerfahrenEinreichungBundle(
      makeAuthSession(),
      "v-1",
    );

    expect(result.einreichungId).toBe("e-1");
    expect(result.einreichung.name).toBe("Klageeinreichung");
  });

  test("throws when no Klageeinreichung exists", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce({
      elemente: [{ id: "e-2", name: "Schriftsatz" }],
    });
    mocks.fetchEinreichungStatus.mockResolvedValue({ status: "GRUEN" });
    mocks.fetchDokumente.mockResolvedValue({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungBundle(makeAuthSession(), "v-1"),
    ).rejects.toThrow("No Einreichung could be fetched");
  });

  test("throws when no einreichung exists", async () => {
    mocks.fetchVerfahrenById.mockResolvedValueOnce({ id: "v-1" });
    mocks.fetchEinreichungenById.mockResolvedValueOnce({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungBundle(makeAuthSession(), "v-1"),
    ).rejects.toThrow("No Einreichung could be fetched");
  });
});
