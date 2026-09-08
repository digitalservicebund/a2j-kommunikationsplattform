import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import submitEinreichungIfNeeded from "../submitEinreichungIfNeeded.server";

const mocks = vi.hoisted(() => ({
  fetchBelege: vi.fn(),
  fetchEinreichungById: vi.fn(),
  submitEinreichungen: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/belegRepository.server",
  () => ({ fetchBelege: mocks.fetchBelege }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({
    fetchEinreichungById: mocks.fetchEinreichungById,
    submitEinreichungen: mocks.submitEinreichungen,
  }),
);

describe("submitEinreichungIfNeeded", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the Einreichung when no Beleg exists yet", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [] });
    mocks.fetchEinreichungById.mockResolvedValueOnce({ eTag: 'W/"1"' });

    await submitEinreichungIfNeeded(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.submitEinreichungen).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
      eTag: 'W/"1"',
    });
  });

  it("skips submitting when a Beleg already exists", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [{ id: "b-1" }] });

    await submitEinreichungIfNeeded(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.fetchEinreichungById).not.toHaveBeenCalled();
    expect(mocks.submitEinreichungen).not.toHaveBeenCalled();
  });
});
