import { beforeEach, describe, expect, test, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeDokument } from "~tests/utils/factories/dokument";
import { makeEinreichung } from "~tests/utils/factories/einreichung";
import { makeValidierungsstatus } from "~tests/utils/factories/validierungsstatus";
import { makeVerfahren } from "~tests/utils/factories/verfahren";
import { fetchDokumente } from "../../infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungenById,
  fetchEinreichungValidierungsstatus,
} from "../../infrastructure/repositories/einreichungRepository.server";
import { fetchVerfahrenById } from "../../infrastructure/repositories/verfahrenRepository.server";
import loadVerfahrenEinreichungenOverview from "../loadVerfahrenEinreichungenOverview.server";

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/einreichungRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/dokumentRepository.server"),
);

describe("loadVerfahrenEinreichungenOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("loads verfahren and all einreichungen with status and dokumente", async () => {
    const verfahren = makeVerfahren({
      id: "v-1",
      status: "ERSTELLT",
    });
    const einreichungA = makeEinreichung({
      id: "e-1",
      erstelltAm: "2026-07-23T10:00:00.000Z",
    });
    const einreichungB = makeEinreichung({
      id: "e-2",
      erstelltAm: "2026-07-24T10:00:00.000Z",
    });
    const statusA = makeValidierungsstatus({ ergebnis: "GRUEN" });
    const statusB = makeValidierungsstatus({ ergebnis: "GELB" });
    const dokumenteA = [
      makeDokument({
        id: "d-1",
        dateiname: "klage.pdf",
        sizeInBytes: 1200,
      }),
    ];
    const dokumenteB = [
      makeDokument({
        id: "d-2",
        dateiname: "anlage.pdf",
        sizeInBytes: 800,
      }),
    ];

    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(verfahren);
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({
      elemente: [einreichungA, einreichungB],
    });
    vi.mocked(fetchEinreichungValidierungsstatus)
      .mockResolvedValueOnce(statusA)
      .mockResolvedValueOnce(statusB);
    vi.mocked(fetchDokumente)
      .mockResolvedValueOnce({ elemente: dokumenteA })
      .mockResolvedValueOnce({ elemente: dokumenteB });

    const result = await loadVerfahrenEinreichungenOverview(
      makeAuthSession(),
      "v-1",
    );

    expect(
      vi.mocked(fetchEinreichungValidierungsstatus),
    ).toHaveBeenNthCalledWith(1, makeAuthSession(), {
      id: "e-1",
      verfahrenId: "v-1",
    });
    expect(
      vi.mocked(fetchEinreichungValidierungsstatus),
    ).toHaveBeenNthCalledWith(2, makeAuthSession(), {
      id: "e-2",
      verfahrenId: "v-1",
    });

    expect(result).toEqual({
      verfahren,
      einreichungen: [
        {
          einreichung: {
            ...einreichungA,
            validierungsstatusDetails: statusA,
          },
          dokumente: dokumenteA,
        },
        {
          einreichung: {
            ...einreichungB,
            validierungsstatusDetails: statusB,
          },
          dokumente: dokumenteB,
        },
      ],
    });
  });

  test("returns empty einreichungen when the API returns none", async () => {
    const verfahren = makeVerfahren({ id: "v-1" });
    vi.mocked(fetchVerfahrenById).mockResolvedValueOnce(verfahren);
    vi.mocked(fetchEinreichungenById).mockResolvedValueOnce({ elemente: [] });

    await expect(
      loadVerfahrenEinreichungenOverview(makeAuthSession(), "v-1"),
    ).resolves.toEqual({
      verfahren,
      einreichungen: [],
    });

    expect(
      vi.mocked(fetchEinreichungValidierungsstatus),
    ).not.toHaveBeenCalled();
    expect(vi.mocked(fetchDokumente)).not.toHaveBeenCalled();
  });
});
