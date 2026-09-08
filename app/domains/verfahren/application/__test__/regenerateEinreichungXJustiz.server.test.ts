import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import regenerateEinreichungXJustiz from "../regenerateEinreichungXJustiz.server";

const mocks = vi.hoisted(() => ({
  fetchDokumente: vi.fn(),
  fetchDokument: vi.fn(),
  deleteDokument: vi.fn(),
  fetchEinreichungXJustiz: vi.fn(),
  uploadDokument: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => ({
    fetchDokumente: mocks.fetchDokumente,
    fetchDokument: mocks.fetchDokument,
    deleteDokument: mocks.deleteDokument,
    uploadDokument: mocks.uploadDokument,
  }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({
    fetchEinreichungXJustiz: mocks.fetchEinreichungXJustiz,
  }),
);

describe("regenerateEinreichungXJustiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.fetchEinreichungXJustiz.mockResolvedValue("<xjustiz>...</xjustiz>");
    mocks.uploadDokument.mockResolvedValue({ id: "new-xjustiz-dokument" });
  });

  it("uploads a freshly generated XJustiz-Dokument when none exists yet", async () => {
    mocks.fetchDokumente.mockResolvedValueOnce({ elemente: [] });

    await regenerateEinreichungXJustiz(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.deleteDokument).not.toHaveBeenCalled();
    expect(mocks.fetchEinreichungXJustiz).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
    });
    expect(mocks.uploadDokument).toHaveBeenCalledWith(
      mockAuthData,
      "v-1",
      "e-1",
      expect.any(File),
      "XJUSTIZ",
    );
  });

  it("deletes existing XJustiz-Dokumente before uploading the new one", async () => {
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [
        { id: "d-1", typ: "SCHRIFTSTUECK" },
        { id: "d-2", typ: "XJUSTIZ" },
      ],
    });
    mocks.fetchDokument.mockResolvedValueOnce({
      dokument: { id: "d-2", typ: "XJUSTIZ" },
      eTag: 'W/"1"',
    });

    await regenerateEinreichungXJustiz(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.fetchDokument).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-2",
    });
    expect(mocks.deleteDokument).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-2",
      eTag: 'W/"1"',
    });
    expect(mocks.uploadDokument).toHaveBeenCalled();
  });
});
