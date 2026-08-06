import { beforeEach, describe, expect, test, vi } from "vitest";
import deleteDokumentFromEinreichung from "../deleteDokumentFromEinreichung.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  fetchDokumente: vi.fn(),
  fetchDokument: vi.fn(),
  deleteDokument: vi.fn(),
}));

vi.mock("../fetchDokumente", () => ({
  default: mocks.fetchDokumente,
}));

vi.mock("../fetchDokument", () => ({
  default: mocks.fetchDokument,
}));

vi.mock("../deleteDokument.server", () => ({
  default: mocks.deleteDokument,
}));

describe("deleteDokumentFromEinreichung", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns invalid-form-data when form data is missing", async () => {
    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: null,
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "invalid-form-data" });
    expect(mocks.fetchDokumente).not.toHaveBeenCalled();
    expect(mocks.fetchDokument).not.toHaveBeenCalled();
    expect(mocks.deleteDokument).not.toHaveBeenCalled();
  });

  test("protects the initial dokument from deletion", async () => {
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [
        {
          id: "d-1",
          anzeigename: "Klageschrift.pdf",
          erstellt_am: "2026-07-01T08:00:00.000Z",
        },
        {
          id: "d-2",
          anzeigename: "Anlage.pdf",
          erstellt_am: "2026-07-02T08:00:00.000Z",
        },
      ],
    });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-1",
    });

    expect(result).toEqual({ status: "protected-initial-dokument" });
    expect(mocks.fetchDokument).not.toHaveBeenCalled();
    expect(mocks.deleteDokument).not.toHaveBeenCalled();
  });

  test("returns delete-failed when downstream delete call is unsuccessful", async () => {
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [
        {
          id: "d-1",
          anzeigename: "Klageschrift.pdf",
          erstellt_am: "2026-07-01T08:00:00.000Z",
        },
        {
          id: "d-2",
          anzeigename: "Anlage.pdf",
          erstellt_am: "2026-07-02T08:00:00.000Z",
        },
      ],
    });
    mocks.fetchDokument.mockResolvedValueOnce({ eTag: undefined });
    mocks.deleteDokument.mockResolvedValueOnce({ success: false });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "delete-failed" });
    expect(mocks.fetchDokument).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-2",
    });
    expect(mocks.deleteDokument).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-2",
      eTag: "",
    });
  });

  test("returns deleted when non-initial dokument deletion succeeds", async () => {
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [
        {
          id: "d-1",
          anzeigename: "Klageschrift.pdf",
          erstellt_am: "2026-07-01T08:00:00.000Z",
        },
        {
          id: "d-2",
          anzeigename: "Anlage.pdf",
          erstellt_am: "2026-07-02T08:00:00.000Z",
        },
      ],
    });
    mocks.fetchDokument.mockResolvedValueOnce({ eTag: 'W/"1"' });
    mocks.deleteDokument.mockResolvedValueOnce({ success: true });

    const result = await deleteDokumentFromEinreichung({
      authData: mockAuthData,
      verfahrenId: "v-1",
      einreichungId: "e-1",
      dokumentId: "d-2",
    });

    expect(result).toEqual({ status: "deleted" });
  });
});
