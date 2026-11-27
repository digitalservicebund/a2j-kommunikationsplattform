import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchBelege } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { fetchDokumente } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungById,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeBeleg } from "~tests/utils/factories/beleg";
import { makeDokument } from "~tests/utils/factories/dokument";
import { makeEinreichung } from "~tests/utils/factories/einreichung";
import submitEinreichungIfNeeded from "../submitEinreichungIfNeeded.server";

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/belegRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/dokumentRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/einreichungRepository.server"),
);

const options = { verfahrenId: "v-1", einreichungId: "e-1" };

describe("submitEinreichungIfNeeded", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the Einreichung when it has a Schriftstück and no Beleg yet", async () => {
    vi.mocked(fetchBelege).mockResolvedValueOnce({ elemente: [] });
    vi.mocked(fetchDokumente).mockResolvedValueOnce({
      elemente: [
        makeDokument({ typ: "SCHRIFTSTUECK" }),
        makeDokument({ typ: "ANHANG" }),
      ],
    });
    vi.mocked(fetchEinreichungById).mockResolvedValueOnce({
      einreichung: makeEinreichung({ id: "e-1" }),
      eTag: 'W/"1"',
    });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("submitted");
    expect(submitEinreichungen).toHaveBeenCalledWith(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"1"',
    });
  });

  it("skips submitting when a Beleg already exists", async () => {
    vi.mocked(fetchBelege).mockResolvedValueOnce({ elemente: [makeBeleg()] });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("alreadySubmitted");
    expect(fetchEinreichungById).not.toHaveBeenCalled();
    expect(submitEinreichungen).not.toHaveBeenCalled();
  });

  it("refuses to submit an Einreichung without a Schriftstück", async () => {
    vi.mocked(fetchBelege).mockResolvedValueOnce({ elemente: [] });
    vi.mocked(fetchDokumente).mockResolvedValueOnce({
      elemente: [
        makeDokument({ typ: "XJUSTIZ" }),
        makeDokument({ typ: "ANHANG" }),
      ],
    });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("missingSchriftstueck");
    expect(submitEinreichungen).not.toHaveBeenCalled();
  });
});
