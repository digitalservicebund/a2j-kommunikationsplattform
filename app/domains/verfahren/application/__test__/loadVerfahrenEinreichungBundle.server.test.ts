import { beforeEach, describe, expect, test, vi } from "vitest";
import { fetchDokumente } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungenById,
  fetchEinreichungValidierungsstatus,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchVerfahrenById } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeDokument } from "~tests/utils/factories/dokument";
import { makeEinreichung } from "~tests/utils/factories/einreichung";
import { makeValidierungsstatus } from "~tests/utils/factories/validierungsstatus";
import { makeVerfahren } from "~tests/utils/factories/verfahren";
import loadVerfahrenEinreichungBundle from "../loadVerfahrenEinreichungBundle.server";

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server"),
);

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/einreichungRepository.server"),
);

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/dokumentRepository.server"),
);

describe("loadVerfahrenEinreichungBundle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads and combines verfahren, einreichung, status and dokumente", async () => {
    const verfahren = makeVerfahren({
      id: "v-1",
      status: "ERSTELLT",
    });
    const validierungsstatus = makeValidierungsstatus({
      ergebnis: "GRUEN",
    });
    const einreichung = makeEinreichung({
      id: "e-1",
      name: "Klageeinreichung",
    });
    const dokumente = [
      makeDokument({
        id: "d-1",
        dateiname: "klage.pdf",
      }),
    ];

    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(verfahren);
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({
      elemente: [einreichung],
    });
    vi.mocked(fetchEinreichungValidierungsstatus).mockResolvedValueOnce(
      validierungsstatus,
    );
    vi.mocked(fetchDokumente).mockResolvedValueOnce({ elemente: dokumente });

    const result = await loadVerfahrenEinreichungBundle(
      makeAuthSession(),
      "v-1",
    );

    expect(fetchVerfahrenById).toHaveBeenCalledWith(makeAuthSession(), {
      id: "v-1",
    });
    expect(fetchEinreichungenById).toHaveBeenCalledWith(makeAuthSession(), {
      id: "v-1",
    });
    expect(fetchEinreichungValidierungsstatus).toHaveBeenCalledWith(
      makeAuthSession(),
      {
        id: "e-1",
        verfahrenId: "v-1",
      },
    );
    expect(fetchDokumente).toHaveBeenCalledWith(makeAuthSession(), {
      einreichungId: "e-1",
      verfahrenId: "v-1",
    });

    expect(result).toEqual({
      verfahren,
      einreichung: {
        ...einreichung,
        validierungsstatusDetails: validierungsstatus,
      },
      dokumente,
      einreichungId: "e-1",
    });
  });

  test("picks the Klageeinreichung even when a Weitere Einreichung is listed first", async () => {
    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(
      makeVerfahren({ id: "v-1" }),
    );
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({
      elemente: [
        makeEinreichung({ id: "e-2", name: "Schriftsatz" }),
        makeEinreichung({ id: "e-1", name: "Klageeinreichung" }),
      ],
    });
    vi.mocked(fetchEinreichungValidierungsstatus).mockResolvedValue(
      makeValidierungsstatus(),
    );
    vi.mocked(fetchDokumente).mockResolvedValue({ elemente: [] });

    const result = await loadVerfahrenEinreichungBundle(
      makeAuthSession(),
      "v-1",
    );

    expect(result.einreichungId).toBe("e-1");
    expect(result.einreichung.name).toBe("Klageeinreichung");
  });

  test("throws when no Klageeinreichung exists", async () => {
    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(
      makeVerfahren({ id: "v-1" }),
    );
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({
      elemente: [makeEinreichung({ id: "e-2", name: "Schriftsatz" })],
    });
    vi.mocked(fetchEinreichungValidierungsstatus).mockResolvedValue(
      makeValidierungsstatus(),
    );
    vi.mocked(fetchDokumente).mockResolvedValue({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungBundle(makeAuthSession(), "v-1"),
    ).rejects.toThrow("No Einreichung could be fetched");
  });

  test("throws when no einreichung exists", async () => {
    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(
      makeVerfahren({ id: "v-1" }),
    );
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungBundle(makeAuthSession(), "v-1"),
    ).rejects.toThrow("No Einreichung could be fetched");
  });
});
