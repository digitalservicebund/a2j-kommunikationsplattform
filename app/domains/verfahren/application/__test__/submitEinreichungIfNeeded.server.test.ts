import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import submitEinreichungIfNeeded from "../submitEinreichungIfNeeded.server";

const mocks = vi.hoisted(() => ({
  fetchBelege: vi.fn(),
  fetchDokumente: vi.fn(),
  fetchEinreichungById: vi.fn(),
  submitEinreichungen: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/belegRepository.server",
  () => ({
    fetchBelege: mocks.fetchBelege,
  }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => ({
    fetchDokumente: mocks.fetchDokumente,
  }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({
    fetchEinreichungById: mocks.fetchEinreichungById,
    submitEinreichungen: mocks.submitEinreichungen,
  }),
);

const options = { verfahrenId: "v-1", einreichungId: "e-1" };

describe("submitEinreichungIfNeeded", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the Einreichung when it has a Schriftstück and no Beleg yet", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [] });
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [{ typ: "SCHRIFTSTUECK" }, { typ: "ANHANG" }],
    });
    mocks.fetchEinreichungById.mockResolvedValueOnce({ eTag: 'W/"1"' });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("submitted");
    expect(mocks.submitEinreichungen).toHaveBeenCalledWith(makeAuthSession(), {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"1"',
    });
  });

  it("skips submitting when a Beleg already exists", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [{ id: "b-1" }] });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("alreadySubmitted");
    expect(mocks.fetchEinreichungById).not.toHaveBeenCalled();
    expect(mocks.submitEinreichungen).not.toHaveBeenCalled();
  });

  it("refuses to submit an Einreichung without a Schriftstück", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [] });
    mocks.fetchDokumente.mockResolvedValueOnce({
      elemente: [{ typ: "XJUSTIZ" }, { typ: "ANHANG" }],
    });

    const result = await submitEinreichungIfNeeded(makeAuthSession(), options);

    expect(result).toBe("missingSchriftstueck");
    expect(mocks.submitEinreichungen).not.toHaveBeenCalled();
  });
});
