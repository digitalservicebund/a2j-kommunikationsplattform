import { beforeEach, describe, expect, it, vi } from "vitest";
import submitEinreichungIfNeeded from "../submitEinreichungIfNeeded.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  fetchBelege: vi.fn(),
  fetchEinreichungById: vi.fn(),
  submitEinreichungen: vi.fn(),
}));

vi.mock("../fetchBelege.server", () => ({ default: mocks.fetchBelege }));
vi.mock("../fetchEinreichungById.server", () => ({
  default: mocks.fetchEinreichungById,
}));
vi.mock("../submitEinreichungen.server", () => ({
  default: mocks.submitEinreichungen,
}));

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
